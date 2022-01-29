<template>
  <div class="test">{{message}}</div>
</template>

<script>
  export default {
    name: 'TestComponent1',
    setup () {
      const message = 'hello world! 1'

      return {
        message
      }
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
