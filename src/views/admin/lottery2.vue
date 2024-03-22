<template>
  <div class="lottery">
    <van-image
      v-if="
        processList.length > 0 &&
        !loading &&
        countdown == 0 &&
        getAvatarUrl(processList[processList.length - 1].peopleId)
      "
      round
      width="8vh"
      height="8vh"
      fit="cover"
      class="avatar-image"
      :src="getAvatar(processList[processList.length - 1].peopleId)"
    >
    </van-image>
    <div class="names">{{ randomPeople }}</div>
    <van-row class="winners">
      <van-col v-for="item in processList" :key="item.peopleId" span="4">
        {{ getName(item.peopleId) }}
      </van-col>
    </van-row>
    <van-button
      type="info"
      :class="{ btns: true, active: countdown > 0 }"
      @click="handleLottery"
      :disabled="loading"
    ></van-button>
    <div class="countdown" v-if="countdown > 0">
      <span>{{ countdown }}</span>
    </div>

    <div class="result" v-if="showResult"><li-hua /></div>
    <div class="result" v-if="showResult"><zhi-xie /></div>
    <transition name="van-fade">
      <div v-show="showResult" class="result-text">
        <span>恭喜</span>🎉<br />
        <!-- <span>{{ randomPeople }}</span> -->
      </div>
    </transition>
  </div>
</template>
    
<script>
import { getAction } from "@/api/manage.js";
import LiHua from "@/components/lihua.vue";
import ZhiXie from "@/components/zhixie.vue";

export default {
  name: "AdminLottery2",
  components: { LiHua, ZhiXie },
  data() {
    return {
      loading: false,
      finished: false,
      showResult: false,
      peopleList: [],
      processList: [],
      randomPeople: "开始",
      countdown: 0,
    };
  },
  mounted() {
    let admin = this.$ls.get("ADMIN");
    if (!admin) {
      this.$router.push({ name: "adminLogin" });
    }
    this.onLoad();
  },
  computed: {
    partList() {
      const ids = this.processList.map((e) => e.peopleId);
      return this.peopleList.filter((e) => !ids.includes(e.id));
    },
    winnerList() {
      const ids = this.processList.map((e) => e.peopleId);
      return this.peopleList.filter((e) => ids.includes(e.id));
    },
  },
  methods: {
    onLoad() {
      this.loading = true;
      const that = this;
      getAction("/system/people/list", { pageSize: 999 }).then((res) => {
        if (res.success) {
          that.peopleList = res.result.records;
        } else {
          that.$toast.fail("加载失败，请重试");
        }
        this.loading = false;
      });
      getAction("/system/process/list", { pageSize: 999 }).then((res) => {
        if (res.success) {
          that.processList = res.result.records;

          setTimeout(() => {
            if (that.processList.length > 0 && that.randomPeople === "开始") {
              that.randomPeople = that.getName(
                that.processList[that.processList.length - 1].peopleId
              );
            }
          }, 200);
        } else {
          that.$toast.fail("加载失败，请重试");
        }
        this.loading = false;
      });
    },
    handleLottery() {
      this.loading = true;
      const that = this;
      this.$toast.loading({
        duration: 0,
        forbidClick: false,
        message: "抽奖加载中...",
      });
      getAction("/system/process/draw", {})
        .then((res) => {
          if (res.success) {
            this.$toast.clear();
            that.handleDraw(res.result);
          } else {
            that.$toast.fail(res.message);
          }
        })
        .catch(() => {
          that.$toast.fail("抽奖失败了，再试一次吧！");
        })
        .finally(() => {
          that.loading = false;
        });
    },
    handleDraw(result) {
      const that = this;
      let timer = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * this.partList.length);
        that.randomPeople = this.partList[randomNumber].peopleName;
      }, 50);
      that.countdown = 5;
      let timer2 = setInterval(() => {
        that.countdown--;
        if (that.countdown <= 0) {
          clearInterval(timer);
          that.randomPeople = that.getName(result.peopleId);
          clearInterval(timer2);
          that.processList.push(result);

          that.showResult = true;
          setTimeout(() => {
            that.showResult = false;
          }, 5 * 1000);
        }
      }, 1000);
    },
    getName(id) {
      let peopleFilter = this.peopleList.filter((e) => e.id === id);
      if (peopleFilter.length > 0) return peopleFilter[0].peopleName;
      else return "";
    },
    getAvatarUrl(id) {
      let peopleFilter = this.peopleList.filter((e) => e.id === id);
      if (peopleFilter.length > 0) return peopleFilter[0].peopleAvatar;
      else return "";
    },
    getAvatar(id) {
      let url = this.getAvatarUrl(id);
      return window._CONFIG["domianURL"] + "/common/static/" + url;
    },
  },
};
</script>
    


<style scoped lang="scss">
.lottery {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(https://imgcdn.lucki.top/2024/01/26/65b37b4336df9.jpg);
  background-position: center;
  background-size: cover;

  .avatar-image {
    position: absolute;
    left: 12px;
    // bottom: calc(3% + 10px);
    top: calc(10vh + 5px);
    z-index: 0;
    border: rgb(200, 40, 28) solid 2px;
    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 1px;
  }

  .names {
    position: absolute;
    width: 80%;
    height: 72px;
    // bottom: 3%;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    font-weight: 100;
    border: solid 3px;
    border-image: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    border-image-slice: 1;
    text-align: center;
    line-height: 72px;
    letter-spacing: 24px;
    text-indent: 24px;
    color: #fff;
  }

  .winners {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    min-height: 100px;
    text-align: center;
    color: #fff;
    background-image: linear-gradient(to top, #a82224, #D42419);

    div {
      padding: 2px;
      // background-color: #D42419;
    }
  }

  .btns {
    position: fixed;
    bottom: 17vh;
    transition: 0.2s;
    background-image: url(https://imgcdn.lucki.top/2024/01/24/65b107563b5da.png);
    // width: 35%;
    height: 45px;
    width: 131px;
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
    left: 50%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    box-shadow: inset rgba(146, 26, 17, 0.3) 0 -3px 2px,
      inset rgba(252, 255, 255, 0.4) 0 3px 2px,
      rgba(146, 26, 17, 0.5) 0 3px 2px -3px, rgba(0, 0, 0, 0.1) 1px 1px 20px 1px;

    &.active {
      box-shadow: inset rgba(146, 26, 17, 0.3) 0 6px 2px,
        inset rgba(252, 255, 255, 0.4) 0 -3px 2px;
      border-color: rgba(0, 0, 0, 0.6);
    }
  }

  .countdown {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 10;
    text-align: center;
    box-sizing: border-box;
    padding-top: 10vh;
    span {
      display: inline-block;
      font-size: 288px;
      color: rgba(255, 255, 255, 0.85);
      font-family: sans-serif;
      animation: scaleUp 1s ease-in infinite;
    }
    @keyframes scaleUp {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(2.5);
        opacity: 0.3;
      }
    }
  }

  .result {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
  }

  .result-text {
    position: absolute;
    right: 10%;
    top: 20vh;
    font-size: 3rem;
    z-index: 1;
    text-align: right;

    span {
      background: linear-gradient(
          45deg,
          yellow,
          lime,
          aqua,
          dodgerblue,
          fuchsia,
          darkorange
        )
        0 / 50%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hue 6s infinite;
      text-shadow: rgba(255, 255, 255, 0.5) 0 0 1px;
      letter-spacing: 6px;
      line-height: 1.5;
      text-indent: 6px;
      // padding-left: 38px;
    }
  }
}

@keyframes hue {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}

@media (min-width: 850px) {
  /* 在此添加你想要应用的样式 */
  .lottery {
    /* 在此处添加样式b的样式 */
    background-size: contain;
    .result {
      width: 30%;
      left: 20%;
    }
  }
}
</style>