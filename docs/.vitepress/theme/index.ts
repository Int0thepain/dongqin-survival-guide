import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, ref } from 'vue'
import { useData } from 'vitepress'
import './custom.css'

const zoomableImageSelector = '.zoomable-map, a[href*="campus-map-official"], a[href*="campus-map-landscape"]'

function focusLocalSearchInput() {
  const input = document.querySelector<HTMLInputElement>('#localsearch-input, .search-input')
  input?.focus()
}

// 滚动动画观察器
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  // 观察所有需要动画的元素
  const elements = document.querySelectorAll('.vp-doc h2, .vp-doc h3, .vp-doc p, .vp-doc ul, .vp-doc ol, .vp-doc table, .vp-doc img, .vp-doc .notice-danger')
  elements.forEach((el) => {
    el.classList.remove('animate-fade-in-up')
    observer.observe(el)
  })
}

// 平滑滚动到锚点
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
      const href = this.getAttribute('href')
      if (href && href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          // 更新 URL
          history.pushState(null, '', href)
        }
      }
    })
  })
}

// 阅读进度条
function setupReadingProgress() {
  const progress = document.createElement('div')
  progress.className = 'reading-progress'
  progress.innerHTML = '<div class="reading-progress-bar"></div>'
  document.body.appendChild(progress)

  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progressWidth = (scrollTop / docHeight) * 100
    const bar = progress.querySelector('.reading-progress-bar') as HTMLElement
    if (bar) {
      bar.style.width = `${progressWidth}%`
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
}

function setupZoomableImages() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null
    const link = target?.closest<HTMLAnchorElement>(zoomableImageSelector)
    const heroImage = target?.closest<HTMLImageElement>('.VPHero .image-src')

    if (!link && !heroImage) return

    event.preventDefault()

    const image = link?.querySelector<HTMLImageElement>('img') ?? heroImage
    const src = link?.href || heroImage?.src || image?.src
    if (!src) return

    const overlay = document.createElement('div')
    overlay.className = 'image-lightbox'
    overlay.innerHTML = `
      <div class="image-lightbox-toolbar" role="toolbar" aria-label="图片缩放工具">
        <button class="image-lightbox-zoom-out" type="button" aria-label="缩小">−</button>
        <span class="image-lightbox-zoom-value">100%</span>
        <button class="image-lightbox-zoom-in" type="button" aria-label="放大">＋</button>
        <button class="image-lightbox-reset" type="button">重置</button>
        <button class="image-lightbox-close" type="button" aria-label="关闭大图">×</button>
      </div>
      <div class="image-lightbox-stage">
        <img src="${src}" alt="${image?.alt ?? '放大图片'}" />
      </div>
    `

    const lightboxImage = overlay.querySelector<HTMLImageElement>('.image-lightbox-stage img')
    const zoomValue = overlay.querySelector<HTMLElement>('.image-lightbox-zoom-value')
    let scale = 1

    const updateScale = () => {
      if (!lightboxImage || !zoomValue) return
      lightboxImage.style.transform = `scale(${scale})`
      zoomValue.textContent = `${Math.round(scale * 100)}%`
    }

    const zoom = (delta: number) => {
      scale = Math.min(5, Math.max(0.25, Number((scale + delta).toFixed(2))))
      updateScale()
    }

    const resetZoom = () => {
      scale = 1
      updateScale()
    }

    const close = () => {
      overlay.remove()
      document.body.classList.remove('image-lightbox-open')
      document.removeEventListener('keydown', onKeydown)
    }

    const onKeydown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') close()
      if ((keyboardEvent.key === '+' || keyboardEvent.key === '=') && !keyboardEvent.ctrlKey) zoom(0.25)
      if (keyboardEvent.key === '-' && !keyboardEvent.ctrlKey) zoom(-0.25)
      if (keyboardEvent.key === '0') resetZoom()
    }

    overlay.addEventListener('click', (clickEvent) => {
      const clicked = clickEvent.target as HTMLElement
      if (clicked.closest('.image-lightbox-zoom-in')) {
        zoom(0.25)
        return
      }
      if (clicked.closest('.image-lightbox-zoom-out')) {
        zoom(-0.25)
        return
      }
      if (clicked.closest('.image-lightbox-reset')) {
        resetZoom()
        return
      }
      if (clicked === overlay || clicked.closest('.image-lightbox-close')) {
        close()
      }
    })

    overlay.addEventListener(
      'wheel',
      (wheelEvent) => {
        wheelEvent.preventDefault()
        zoom(wheelEvent.deltaY < 0 ? 0.15 : -0.15)
      },
      { passive: false }
    )

    document.body.appendChild(overlay)
    document.body.classList.add('image-lightbox-open')
    document.addEventListener('keydown', onKeydown)
    updateScale()
  })
}

export default {
  extends: DefaultTheme,
  setup() {
    const { page } = useData()

    onMounted(() => {
      const focusSoon = () => {
        window.setTimeout(focusLocalSearchInput, 30)
        window.setTimeout(focusLocalSearchInput, 160)
      }

      document.addEventListener(
        'click',
        (event) => {
          const target = event.target as HTMLElement | null
          if (target?.closest('.DocSearch-Button')) {
            focusSoon()
          }
        },
        true
      )

      document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          focusSoon()
        }
      })

      // 初始化动画和进度条
      setupScrollAnimations()
      setupSmoothScroll()
      setupReadingProgress()
      setupZoomableImages()
    })

    // 页面切换时重新初始化动画
    watch(
      () => page.value.relativePath,
      () => {
        setTimeout(() => {
          setupScrollAnimations()
        }, 100)
      }
    )
  }
}
