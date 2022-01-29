<template>
  <div class="test">{{message}}</div>
</template>

<script>
  export default {
    name: 'TestComponent3',
    setup () {
      const message = 'hello world! 3'

      return {
        message
      }
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: green;
}
</style>
