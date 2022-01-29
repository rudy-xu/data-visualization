import { reactive, computed, watch, onMounted, getCurrentInstance } from 'vue'

export default function useTest () {
  // get router
  const { proxy } = getCurrentInstance()

  console.log(proxy.$router.currentRoute.value.query)

  const state = reactive({
    count: 1
  })

  const increment = () => {
    ++state.count
  }

  const goToAbout = () => {
    proxy.$router.push('/about')
  }

  const doubleCount = computed(() => state.count * 2)

  watch(() => state.count, () => {
    console.log('state.count change:' + state.count)
  })

  onMounted(() => {
    console.log('onMounted...')
  })

  return {
    state,
    doubleCount,
    increment,
    goToAbout
  }
}
