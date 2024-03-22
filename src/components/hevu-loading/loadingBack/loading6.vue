<template>
  <div class="section">
    <div class="sk-chasing-dots" :style="bodyStyle">
      <div class="sk-child sk-dot-1" :style="backStyle"></div>
      <div class="sk-child sk-dot-2" :style="backStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack6",
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
        width: this.size / 2 + "rpx",
        height: this.size / 2 + "rpx",
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
.sk-chasing-dots {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
  text-align: center;
  -webkit-animation: sk-chasing-dots-rotate 2s infinite linear;
  animation: sk-chasing-dots-rotate 2s infinite linear;
}
.sk-chasing-dots .sk-child {
  width: 2em;
  height: 2em;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #337ab7;
  border-radius: 100%;
  -webkit-animation: sk-chasing-dots-bounce 2s infinite ease-in-out;
  animation: sk-chasing-dots-bounce 2s infinite ease-in-out;
}
.sk-chasing-dots .sk-dot-2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-chasing-dots-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes sk-chasing-dots-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes sk-chasing-dots-bounce {
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
@keyframes sk-chasing-dots-bounce {
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
