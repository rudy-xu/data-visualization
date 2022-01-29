<template>
  <div>
    <button @click="increment">{{state.count}}</button>
    double count: {{doubleCount}}
    <button @click="goToAbout">goToAbout</button>
  </div>
</template>

<script>
import useTest from './useTest'
// import { reactive } from 'vue'

export default {
  setup () {
    // const state = reactive({
    //   count: 1
    // })

    // const increment = () => {
    //   ++state.count
    // }

    // return {
    //   state,
    //   increment
    // }

    const { state, doubleCount, increment, goToAbout } = useTest()

    return {
      state,
      doubleCount,
      increment,
      goToAbout
    }
  }
}

// import { reactive, watchEffect } from 'vue'

// export default {

// }

// // 类似于 React hooks 中得 useState
// const state = reactive({
//   count: 1
// })

// const increment = () => {
//   ++state.count
// }

// /**
//  * reduce to operate dom as soon as possible
//  *
//  * TODO: Use setup
//  */
// // 类似于 React hooks 中的 useEffect
// watchEffect(() => {
//   document.body.innerHTML = `count: ${state.count}`
//   document.body.addEventListener('click', increment)
// })
</script>
