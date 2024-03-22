<template>
  <div class="section">
    <div class="sk-cube-grid" :style="bodyStyle">
      <div class="sk-cube sk-cube-1" :style="backStyle"></div>
      <div class="sk-cube sk-cube-2" :style="backStyle"></div>
      <div class="sk-cube sk-cube-3" :style="backStyle"></div>
      <div class="sk-cube sk-cube-4" :style="backStyle"></div>
      <div class="sk-cube sk-cube-5" :style="backStyle"></div>
      <div class="sk-cube sk-cube-6" :style="backStyle"></div>
      <div class="sk-cube sk-cube-7" :style="backStyle"></div>
      <div class="sk-cube sk-cube-8" :style="backStyle"></div>
      <div class="sk-cube sk-cube-9" :style="backStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack9",
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
.sk-cube-grid {
  width: 4em;
  height: 4em;
  margin: auto;
  /*
     * Spinner positions
     * 1 2 3
     * 4 5 6
     * 7 8 9
     */
}
.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #337ab7;
  float: left;
  -webkit-animation: sk-cube-grid-scale-delay 1.3s infinite ease-in-out;
  animation: sk-cube-grid-scale-delay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube-1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube-2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube-3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube-4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube-5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube-6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube-7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube-8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube-9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cube-grid-scale-delay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cube-grid-scale-delay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
