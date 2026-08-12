import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './custom.css'

function focusLocalSearchInput() {
  const input = document.querySelector<HTMLInputElement>('#localsearch-input, .search-input')
  input?.focus()
}

export default {
  extends: DefaultTheme,
  setup() {
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
    })
  }
}
