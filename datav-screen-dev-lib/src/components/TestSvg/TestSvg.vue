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
  <div>
    <!-- <div style="display: flex; justify-content: center; align-item: center;"> -->
      <!-- <div id="startPoint" style="width: 100px; height: 500px; background: pink"/> -->
      <!-- <div>
        <canvas id="canvas" :width="connectBoxWidth" height="800"></canvas>
      </div> -->

      <!-- <div>
        <svg style="width: 600px; height: 500px;" viewBox="0 0 800 800" viewstyle="background: pink">
          <path
            d="M0 700 L400 700 L400 100 L800 100"
            stroke="black"
            fill="none"
          />
          <path
            d="M780 90 L800 100 L780 110 Z"
            stroke="black"
          />
        </svg>
      </div> -->

      <!-- <div>
        <svg style="width: 600px; height: 500px;" viewBox="0 0 800 800" viewstyle="background: pink">
          <line x1="0" y1="90" x2="50" y2="90" stroke-width="8" stroke-linecap="round" stroke="currentColor"></line>
          <line x1="50" y1="90" x2="50" y2="10" stroke-width="8" stroke-linecap="round" stroke="currentColor"></line>
          <line x1="50" y1="10" x2="100" y2="10" stroke-width="8" stroke-linecap="round" stroke="currentColor"></line>
          <line x1="90" y1="5" x2="100" y2="10" stroke-width="8" stroke-linecap="round" stroke="currentColor"></line>
          <line x1="90" y1="15" x2="100" y2="10" stroke-width="8" stroke-linecap="round" stroke="currentColor"></line>
        </svg>
      </div> -->

      <!-- <div id="endPoint" style="width: 100px; height: 500px; background: green"/> -->
    <!-- </div> -->

    <svg width="0" height="0">
      <defs>
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
      </defs>
    </svg>
  </div>
</template>

<script>
import { onMounted } from 'vue';
  export default {
    name: 'TestSvg',
    setup () {
      // const message = 'hello world! 2'
    //   const boxHeight = 50;
    //   const connectBoxWidth = 800;

    //   const intiConnectLine = (y) => {
    //     console.log(startPoint, endPoint)
    //     const startY = y - boxHeight;
    //     const endY = boxHeight;
    //     const middleX = connectBoxWidth / 2;

    //     const canvas = document.getElementById('canvas');
    //     const canvasInstance = canvas.getContext('2d');

    //     canvasInstance.beginPath();
    //     canvasInstance.lineWidth = 1;
    //     canvasInstance.strokeStyle = 'blue';
    //     canvasInstance.moveTo(0, startY);
    //     canvasInstance.lineTo(middleX, startY);
    //     canvasInstance.lineTo(middleX, endY);
    //     canvasInstance.lineTo(connectBoxWidth, endY);
    //     canvasInstance.stroke();

    //     canvasInstance.beginPath();
    //     canvasInstance.moveTo(connectBoxWidth - 10, endY - 10);
    //     canvasInstance.lineTo(connectBoxWidth, endY);
    //     canvasInstance.lineTo(connectBoxWidth - 10, endY + 10);
    //     canvasInstance.lineTo(connectBoxWidth - 10, endY - 10);
    //     canvasInstance.stroke();
    //     canvasInstance.fillStyle = 'red';
    //     canvasInstance.fill();
    //   }

    // onMounted(() => {
    //   const y = document.getElementById('startPoint').clientHeight;
    //   intiConnectLine(y);
    // })

      return {
        // message
        // connectBoxWidth
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
