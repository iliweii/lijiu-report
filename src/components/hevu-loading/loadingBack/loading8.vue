<template>
  <div class="section">
    <div class="sk-circle-bounce" :style="bodyStyle">
      <div class="sk-child sk-circle-1" :style="backStyle"></div>
      <div class="sk-child sk-circle-2" :style="backStyle"></div>
      <div class="sk-child sk-circle-3" :style="backStyle"></div>
      <div class="sk-child sk-circle-4" :style="backStyle"></div>
      <div class="sk-child sk-circle-5" :style="backStyle"></div>
      <div class="sk-child sk-circle-6" :style="backStyle"></div>
      <div class="sk-child sk-circle-7" :style="backStyle"></div>
      <div class="sk-child sk-circle-8" :style="backStyle"></div>
      <div class="sk-child sk-circle-9" :style="backStyle"></div>
      <div class="sk-child sk-circle-10" :style="backStyle"></div>
      <div class="sk-child sk-circle-11" :style="backStyle"></div>
      <div class="sk-child sk-circle-12" :style="backStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack8",
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
        "--backgroundColor": this.bacgColor,
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
.sk-circle-bounce {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
}
.sk-circle-bounce .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle-bounce .sk-child:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: var(--backgroundColor);
  border-radius: 100%;
  -webkit-animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
  animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
}
.sk-circle-bounce .sk-circle-2 {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk-circle-bounce .sk-circle-3 {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk-circle-bounce .sk-circle-4 {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk-circle-bounce .sk-circle-5 {
  -webkit-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk-circle-bounce .sk-circle-6 {
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk-circle-bounce .sk-circle-7 {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk-circle-bounce .sk-circle-8 {
  -webkit-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk-circle-bounce .sk-circle-9 {
  -webkit-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk-circle-bounce .sk-circle-10 {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk-circle-bounce .sk-circle-11 {
  -webkit-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk-circle-bounce .sk-circle-12 {
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk-circle-bounce .sk-circle-2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-circle-bounce .sk-circle-3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-circle-bounce .sk-circle-4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-circle-bounce .sk-circle-5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk-circle-bounce .sk-circle-6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk-circle-bounce .sk-circle-7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk-circle-bounce .sk-circle-8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk-circle-bounce .sk-circle-9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk-circle-bounce .sk-circle-10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk-circle-bounce .sk-circle-11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk-circle-bounce .sk-circle-12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes sk-circle-bounce-delay {
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

@keyframes sk-circle-bounce-delay {
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
