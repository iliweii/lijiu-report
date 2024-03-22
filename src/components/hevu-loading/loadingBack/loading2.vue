<template>
  <div class="section">
    <div
      class="sk-double-bounce"
      :style="{ width: size + 'rpx', height: size + 'rpx' }"
    >
      <div
        class="sk-child sk-double-bounce-1"
        :style="{ backgroundColor: bacgColor }"
      ></div>
      <div
        class="sk-child sk-double-bounce-2"
        :style="{ backgroundColor: bacgColor }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack2",
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
  data() {
    return {};
  },
};
</script>

<style scoped>
.sk-double-bounce {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
}
.sk-double-bounce .sk-child {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-double-bounce 2s infinite ease-in-out;
  animation: sk-double-bounce 2s infinite ease-in-out;
}
.sk-double-bounce .sk-double-bounce-2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-double-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-double-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
