<template>
  <div class="loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        stroke-dasharray="34"
        stroke-linecap="round"
        :stroke="outsideColor"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${+duration}`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideAnimationColor"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        stroke-dasharray="19"
        stroke-linecap="round"
        :stroke="insideColor"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25; 0 25 25"
          :dur="`${+duration}`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideAnimationColor"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    <div class="loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'Loading',
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outsideColor: {
      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    }
  },
  setup(ctx) {
    const outsideAnimationColor = computed(() =>
    `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`
    );
    const insideAnimationColor = computed(() =>
    `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`
    );

    return {
      outsideAnimationColor,
      insideAnimationColor
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
