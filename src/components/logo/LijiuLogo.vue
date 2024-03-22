<template>
  <div :class="{ logo: true, white: white, background: background }" :style="{ '--尺寸': size + 'px' }">
    <div class="logo-layer logo-layer5"></div>
    <div class="logo-layer logo-layer4"></div>
    <div class="logo-layer logo-layer3"></div>
    <div class="logo-layer logo-layer2"></div>
    <div class="logo-layer logo-layer1"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 尺寸，数值，默认值50
    size: {
      type: Number,
      default: 50,
    },
    // 是否白色
    white: {
      type: Boolean,
      default: false,
    },
    // 是否包含背景
    background: {  
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.logo {
  display: inline-block;
  position: relative;
  width: var(--尺寸);
  height: var(--尺寸);
  overflow: hidden;
  --主色: #247bbf;
  --反色: #ffffff;
  --辅助色一: #468dcb;
  --辅助色二: #60afe1;
  --尺寸: 36px;
  --间隔: calc(var(--尺寸) * 0.1);
  --浮动: calc(var(--尺寸) * 0.02);

  &.white {
    --主色: #ffffff;
    --反色: #247bbf;
  }
  &.background {
    background-color: var(--反色);
  }

  &-layer {
    position: absolute;
    width: var(--尺寸);
    height: var(--尺寸);
  }

  &-layer::before,
  &-layer::after {
    content: "";
    position: absolute;
    background-color: var(--主色);
  }
  &-layer::before {
    width: calc(var(--尺寸) * 0.6);
    height: calc(var(--尺寸) * 0.2);
    bottom: calc(var(--尺寸) * 0.1);
    left: calc(var(--尺寸) * 0.2);
  }
  &-layer::after {
    width: calc(var(--尺寸) * 0.17);
    height: calc(var(--尺寸) * 0.8);
    top: calc(var(--尺寸) * 0.1);
    left: calc(var(--尺寸) * 0.2);
    clip-path: polygon(0% 0%, 100% 5%, 100% 100%, 0% 100%);
  }

  &-layer1 {
    transform: rotateY(34deg) skewY(7deg) translateY(calc(var(--浮动) * 2))
      translateZ(calc(var(--间隔) * -2));
  }
  &-layer2 {
    transform: rotateY(34deg) skewY(7deg) translateY(calc(var(--浮动) * 1))
      translateZ(calc(var(--间隔) * -1.5));
    --主色: transparent;
  }

  &-layer3 {
    transform: rotateY(34deg) skewY(7deg) translateY(0px) translateZ(0px);
    --主色: var(--辅助色一);
  }
  &-layer4 {
    transform: rotateY(34deg) skewY(7deg) translateY(calc(var(--浮动) * -1))
      translateZ(calc(var(--间隔) * 0.5));
    --主色: transparent;
  }
  &-layer5 {
    transform: rotateY(34deg) skewY(7deg) translateY(calc(var(--浮动) * -2))
      translateZ(calc(var(--间隔) * 2));
    --主色: var(--辅助色二);
  }

  &.background &-layer2,
  &.background &-layer4 {
    --主色: var(--反色);
  }
}
</style>