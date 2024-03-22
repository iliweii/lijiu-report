<template>
  <div class="section">
    <div class="sk-three-bounce" :style="bodyStyle">
      <div class="sk-bounce-1 sk-child" :style="backStyle" t></div>
      <div class="sk-bounce-2 sk-child" :style="backStyle"></div>
      <div class="sk-bounce-3 sk-child" :style="backStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack7",
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
    bodyStyle: function () {
      return {
        width: this.size + "rpx",
      };
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.sk-three-bounce {
  width: 8em;
  margin: auto;
  text-align: center;
}
.sk-three-bounce .sk-child {
  width: 2em;
  height: 2em;
  background-color: #337ab7;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
  animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
}
.sk-three-bounce .sk-bounce-1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.sk-three-bounce .sk-bounce-2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-three-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-three-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
