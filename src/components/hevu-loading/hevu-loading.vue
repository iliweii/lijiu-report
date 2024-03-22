<template>
  <div style="position: relative">
    <div
      class="hevu-loading"
      v-if="loadingning"
      :class="{ fixed: fixed }"
      :style="{ zIndex: zIndex, position: soltDom ? 'absolute' : 'relative' }"
    >
      <div
        class="hevu-loading-bag"
        :style="{ opacity: opacity, backgroundColor: backgroundColor }"
      ></div>
      <div class="hevu-loading-body">
        <div>
          <div class="loafding">
            <LoadingBack1
              v-if="type == 'loading1'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack2
              v-else-if="type == 'loading2'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack3
              v-else-if="type == 'loading3'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack4
              v-else-if="type == 'loading4'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack5
              v-else-if="type == 'loading5'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack6
              v-else-if="type == 'loading6'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack7
              v-else-if="type == 'loading7'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack8
              v-else-if="type == 'loading8'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack9
              v-else-if="type == 'loading9'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack10
              v-else-if="type == 'loading10'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack11
              v-else-if="type == 'loading11'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack12
              v-else-if="type == 'loading12'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
            <LoadingBack13
              v-else-if="type == 'loading13'"
              :bacgColor="loadingIconColor"
              :size="size"
            />
          </div>
          <div
            class="loafdingText"
            :style="{ fontSize: textSize + 'rpx', color: textColor }"
          >
            <div v-if="!textFlicker">{{ loadingText }}</div>
            <div v-else class="textFlicker">
              <span
                v-for="(text, i) in loadingText"
                :key="i"
                class="letter"
                :style="{ animationDelay: 0.48 + i * 0.12 + 's' }"
                >{{ text }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hevu-loadingSole">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*
    @property  {Boolean} loadingning      加载状态     true，
    @property  {Boolean} fixed            固定定位     false，
    @property  {Number} zIndex            层级        false，
    
    @property  {Number} opacity          背景透明度     1
    @property  {String} backgroundColor  背景颜色       #fff
  
    @property  {String} loadingText      加载文字提示   加载中....
    @property  {String} textColor        加载文字颜色   #3375f6
    @property  {Number} textSize         加载文字大小   30
    @property  {Boolean} textFlicker     加载文字闪动   true
    
    @property  {String} loadingIconColor 加载图颜色     #3375f6
    @property  {String} type             加载图类型     loading1
    @property  {Number} size             加载图大小     120
    
  */
import LoadingBack1 from "./loadingBack/loading1.vue";
import LoadingBack2 from "./loadingBack/loading2.vue";
import LoadingBack3 from "./loadingBack/loading3.vue";
import LoadingBack4 from "./loadingBack/loading4.vue";
import LoadingBack5 from "./loadingBack/loading5.vue";
import LoadingBack6 from "./loadingBack/loading6.vue";
import LoadingBack7 from "./loadingBack/loading7.vue";
import LoadingBack8 from "./loadingBack/loading8.vue";
import LoadingBack9 from "./loadingBack/loading9.vue";
import LoadingBack10 from "./loadingBack/loading10.vue";
import LoadingBack11 from "./loadingBack/loading11.vue";
import LoadingBack12 from "./loadingBack/loading12.vue";
import LoadingBack13 from "./loadingBack/loading13.vue";
export default {
  name: "HevuLoading",
  props: {
    loadingning: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 10000,
    },

    loadingText: {
      type: String,
      default: "加载中....",
    },
    textColor: {
      type: String,
      default: "#3375f6",
    },
    textSize: {
      type: Number,
      default: 30,
    },
    textFlicker: {
      type: Boolean,
      default: true,
    },
    loadingIconColor: {
      type: String,
      default: "#3375f6",
    },
    type: {
      type: String,
      default: "loading1",
    },
    opacity: {
      type: Number,
      default: 1,
    },
    backgroundColor: {
      type: String,
      default: "#FFF",
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      soltDom: false,
    };
  },
  components: {
    LoadingBack1,
    LoadingBack2,
    LoadingBack3,
    LoadingBack4,
    LoadingBack5,
    LoadingBack6,
    LoadingBack7,
    LoadingBack8,
    LoadingBack9,
    LoadingBack10,
    LoadingBack11,
    LoadingBack12,
    LoadingBack13,
  },
  mounted() {
    this.soltDom = this.$slots?.default?.length;
  },
};
</script>

<style lang="scss" scoped>
.hevu-loading {
  &.fixed {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .hevu-loading-bag {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #fff;
  }
  .hevu-loading-body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loafding {
      padding: 20rpx;
    }
    .loafdingText {
      font-size: 30rpx;
      line-height: 60rpx;
      text-align: center;
      .textFlicker {
        .letter {
          animation-name: loadingF;
          animation-duration: 1.6s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      }
    }
  }
}
.hevu-loadingSole {
}

@keyframes loadingF {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
