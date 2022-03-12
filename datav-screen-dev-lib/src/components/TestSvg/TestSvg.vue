<template>
  <!-- <div>
    <svg width="20px" height="20px" viewBox="0 0 100 100">
      <line x1="0" y1="50" x2="100" y2="50" stroke-width="8" stroke="currentColor"></line>
      <line x1="50" y1="0" x2="50" y2="100" stroke-width="8" stroke="currentColor"></line>
    </svg>
    <svg
      width="500px"
      height="200px"
      viewBox="0 0 200 200"
      style="border: 1px solid #000000"
      preserveAspectRatio="xMinYMid meet"
    >
      <rect
        x="100"
        y="100"
        width="100"
        height="50"
        stroke-width="5"
        style="stroke: #000000; fill: none;"
      />
    </svg>
  </div> -->
  <svg width="0" height="0">
    <defs>
      <!-- <g> -->
        <symbol id="more" viewBox="0 0 100 100">
          <circle r="5" cx="20" cy="25" fill="currentColor" />
          <circle r="5" cx="20" cy="50" fill="currentColor" />
          <circle r="5" cx="20" cy="75" fill="currentColor" />
          <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor" />
          <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor" />
        </symbol>
        <symbol id="filledArrowRight" viewBox="0 0 100 100">
          <polyline points="20 10, 80 50, 20 90" fill="currentColor" />
        </symbol>
        <symbol id="arrowRight" viewBox="0 0 100 100">
          <polyline points="30 20, 70 50, 30 80" fill="transparent" stroke-width="3" stroke="currentColor" />
        </symbol>
      <!-- </g> -->
    </defs>
  </svg>
</template>

<script>
  export default {
    name: 'TestSvg',
    setup () {
      // const message = 'hello world! 2'

      // return {
      //   message
      // }
    }
  }
</script>

<style lang="scss" scoped>

</style>
