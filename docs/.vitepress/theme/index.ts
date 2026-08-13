import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, ref } from 'vue'
import { useData } from 'vitepress'
import './custom.css'

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
