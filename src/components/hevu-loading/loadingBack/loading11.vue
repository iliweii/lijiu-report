<template>
  <div class="loader">
    <div class="inner one" :style="backStyle"></div>
    <div class="inner two" :style="backStyle"></div>
    <div class="inner three" :style="backStyle"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack11",
  props: {
    bacgColor: {
      type: String,
      default: "#3375f6",
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    backStyle: function () {
      return {
        borderColor: this.bacgColor,
      };
    },
    bodyStyle: function () {
      return {
        width: this.size + "rpx",
        height: this.size + "rpx",
      };
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
// html {
//   height: 100%;
// }

// body {
//   background-image: radial-gradient(circle farthest-corner at center, #3C4B57 0%, #1C262B 100%);
// }

.loader {
  position: relative;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #efeffa;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #efeffa;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #efeffa;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
