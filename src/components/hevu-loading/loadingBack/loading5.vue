<template>
  <div class="section">
    <div class="sk-spinner sk-spinner-pulse" :style="backStyle"> </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack5",
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
.sk-spinner-pulse {
  margin: auto;
  border-radius: 100%;
  -webkit-animation: sk-spinner-pulse 1s infinite ease-in-out;
  animation: sk-spinner-pulse 1s infinite ease-in-out;
}

@-webkit-keyframes sk-spinner-pulse {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-spinner-pulse {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
