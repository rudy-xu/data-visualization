<template>
  <div id="my-container" :ref="containerRef" :style="style">
    <!-- <button style="font-size: 100px" @click="changeStyle">Change Style</button> -->
    <template v-if="ready">
      <slot></slot>
    </template>

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, getCurrentInstance, nextTick } from 'vue';
import { debounce } from '../../utils/index';

export default {
  name: 'Container',
  props: {
    options: Object
  },
  setup(ctx) {
    const containerRef = 'myContainer';
    const width = ref(0);
    const height =  ref(0);
    const originalViewWidth = ref(0);
    const originalViewHeight = ref(0);
    const ready = ref(false);
    let context, dom, observer;

    /**
     * test MutationObserver
     */
    const style = ref({});
    const changeStyle = () => {
      style.value = {
        ...style.value,
        height: '1000px'
      }
    }

    // get real size
    const initSize = () => {
      return new Promise((resolve) => {
        nextTick(() => {
          dom = context.$refs[containerRef];

          /**
           * Parent componet size
           * Need
           *  real-time
           *  dynamic compute
           */
          if(ctx.options && ctx.options.width && ctx.options.height) {
            // Parent component pass size
            width.value = ctx.options.width;
            height.value = ctx.options.height;
          } else {
            // Parent component did not pass size
            // Get current element dom size (containerRef element)
            width.value = dom.clientWidth;
            height.value = dom .clientHeight;
          }

          /**
           * Current view size (Exclude the browser's toolbar size)
           * Not need
           *  real-time
           *  dynamic comoute
           */
          if(!originalViewWidth.value || !originalViewHeight.value) {
            /**
             * whole screen size
             */
            // originalViewWidth.value = window.screen.width;
            // originalViewHeight.value = window.screen.height;

            // browser view size
            originalViewWidth.value = window.innerWidth;
            originalViewHeight.value = window.innerHeight;
          }

          resolve();
        });
      });
    };

    // update the dom size
    const updateSize = () => {
      if(width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalViewWidth.value}px`;
        dom.style.height = `${originalViewHeight.value}px`;
      }
    };

    // scale
    const updateScale = () => {
      // Current view size
      const currentViewWidth = document.body.clientWidth;
      const currentViewHeight = document.body.clientHeight;
      // final size
      const realWidth = width.value || originalViewWidth.value;
      const realHeight = height.value || originalViewHeight.value;

      // scale
      const widthScale = currentViewWidth / realWidth;
      const heightScale = currentViewHeight / realHeight;

      console.log(realWidth, realHeight);
      console.log(currentViewWidth, currentViewHeight);
      dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`);
    };

    const onResize = async (e) => {
      console.log('onResize', e);
      await initSize();
      updateScale();
    }

    // const initMutationObserver = () => {
    //   // create instance
    //   const MutationObserver = window.MutationObserver;
    //   observer = new MutationObserver(onResize);

    //   // listen
    //   observer.observe(dom, {
    //     attributes: true,
    //     attributeFilter: ['style'],
    //     attributeOldValue: true
    //   })
    // }

    // const removeMutationObserver = () => {
    //   if(observer) {
    //     observer.disconnect();
    //     observer.takeRecords();
    //     observer = null;
    //   }
    // }

    onMounted(async () => {
      ready.value = false;
      context = getCurrentInstance().ctx;
      await initSize();
      updateSize();
      updateScale();

      // window.addEventListener('resize', onResize);
      window.addEventListener('resize', debounce(100, onResize));
      // initMutationObserver();
      ready.value = true;
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
      // removeMutationObserver();
    });

    return {
      containerRef,
      ready
      // style,
      // changeStyle
    }
  }
}
</script>

<style lang="scss" scoped>
#my-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
