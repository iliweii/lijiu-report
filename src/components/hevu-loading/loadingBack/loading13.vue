<template>
  <div style="display: flex; justify-content: center">
    <div>
      <div class="multi-spinner-container" :style="bodyStyle">
        <div class="multi-spinner" :style="backStyle">
          <div class="multi-spinner" :style="backStyle">
            <div class="multi-spinner" :style="backStyle">
              <div class="multi-spinner" :style="backStyle">
                <div class="multi-spinner" :style="backStyle">
                  <div class="multi-spinner" :style="backStyle"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBack12",
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
        // border: `${this.size * .05}rpx solid transparent`,
        // borderTopColor: this.bacgColor,

        borderWidth: this.size * 0.05 + "rpx",
        borderStyle: "solid",
        borderColor: this.bacgColor + " transparent transparent",
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
.multi-spinner-container {
  // width: 150px;
  // height: 150px;
  position: relative;
  margin: 5% auto;
  overflow: hidden;
}

.multi-spinner {
  position: absolute;
  width: calc(100% - 9.9px);
  height: calc(100% - 9.9px);
  // border: 5px solid transparent;
  // border-top-color: red;
  border-radius: 50%;
  -webkit-animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
  animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
