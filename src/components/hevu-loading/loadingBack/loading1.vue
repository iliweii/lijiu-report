<template>
  <div class="section">
    <div
      class="sk-rotating-plane"
      :style="{
        backgroundColor: bacgColor,
        '--width': size * 0.8 + 'rpx',
        width: size * 0.8 + 'rpx',
        height: size * 0.8 + 'rpx',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack1",
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
.section {
  flex: 1 1 25%;
}

.sk-rotating-plane {
  width: 120rpx;
  height: 120rpx;
  margin: auto;
  background-color: #337ab7;
  -webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
  animation: sk-rotating-plane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotating-plane {
  0% {
    -webkit-transform: perspective(var("--width")) rotateX(0deg) rotateY(0deg);
    transform: perspective(var("--width")) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(var("--width")) rotateX(-180.1deg)
      rotateY(0deg);
    transform: perspective(var("--width")) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(var("--width")) rotateX(-180deg)
      rotateY(-179.9deg);
    transform: perspective(var("--width")) rotateX(-180deg) rotateY(-179.9deg);
  }
}

@keyframes sk-rotating-plane {
  0% {
    -webkit-transform: perspective(120rpx) rotateX(0deg) rotateY(0deg);
    transform: perspective(120rpx) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(120rpx) rotateX(-180.1deg) rotateY(0deg);
    transform: perspective(120rpx) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(120rpx) rotateX(-180deg) rotateY(-179.9deg);
    transform: perspective(120rpx) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
