<template>
  <div class="section">
    <div
      class="sk-wandering-cubes"
      :style="{ width: size + 'rpx', height: size + 'rpx' }"
    >
      <div class="sk-cube sk-cube-1" :style="backStyle"></div>
      <div class="sk-cube sk-cube-2" :style="backStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack4",
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
        backgroundColor: this.bacgColor,
        width: this.size / 4 + "rpx",
        height: this.size / 4 + "rpx",
      };
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.sk-wandering-cubes {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
}
.sk-wandering-cubes .sk-cube {
  background-color: #337ab7;
  width: 1em;
  height: 1em;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-wandering-cubes 1.8s ease-in-out -1.8s infinite both;
  animation: sk-wandering-cubes 1.8s ease-in-out -1.8s infinite both;
}
.sk-wandering-cubes .sk-cube-2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-wandering-cubes {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: translateX(230%) rotate(-90deg) scale(0.5);
    transform: translateX(230%) rotate(-90deg) scale(0.5);
  }
  50% {
    /* Hack to make FF rotate in the right direction */
    -webkit-transform: translateX(230%) translateY(230%) rotate(-179deg);
    transform: translateX(230%) translateY(230%) rotate(-179deg);
  }
  50.1% {
    -webkit-transform: translateX(230%) translateY(230%) rotate(-180deg);
    transform: translateX(230%) translateY(230%) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(230%) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(230%) rotate(-270deg) scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes sk-wandering-cubes {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: translateX(230%) rotate(-90deg) scale(0.5);
    transform: translateX(230%) rotate(-90deg) scale(0.5);
  }
  50% {
    /* Hack to make FF rotate in the right direction */
    -webkit-transform: translateX(230%) translateY(230%) rotate(-179deg);
    transform: translateX(230%) translateY(230%) rotate(-179deg);
  }
  50.1% {
    -webkit-transform: translateX(230%) translateY(230%) rotate(-180deg);
    transform: translateX(230%) translateY(230%) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(230%) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(230%) rotate(-270deg) scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
