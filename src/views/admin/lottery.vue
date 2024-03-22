<template>
  <div class="lottery">
    <div class="names">{{ randomPeople }}</div>
    <div class="winners">
      <van-cell
        v-for="item in processList"
        :key="item.peopleId"
        :title="getName(item.peopleId)"
      />
    </div>
    <van-button
      type="info"
      :class="{ btns: true, active: countdown > 0 }"
      @click="handleLottery"
      :disabled="loading"
      >点击抽奖</van-button
    >
    <div class="countdown" v-if="countdown > 0">
      <span>{{ countdown }}</span>
    </div>
    <div class="result" v-if="showResult">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1200 800"
        style="enable-background: new 0 0 1200 800"
        xml:space="preserve"
      >
        <g class="confetti-cone">
          <path
            class="conf0"
            d="M131.5,172.6L196,343c2.3,6.1,11,6.1,13.4,0l65.5-170.7L131.5,172.6z"
          />
          <path
            class="conf1"
            d="M131.5,172.6L196,343c2.3,6.1,11,6.1,13.4,0l6.7-17.5l-53.6-152.9L131.5,172.6z"
          />

          <path
            class="conf2"
            d="M274.2,184.2c-1.8,1.8-4.2,2.9-7,2.9l-129.5,0.4c-5.4,0-9.8-4.4-9.8-9.8c0-5.4,4.4-9.8,9.9-9.9l129.5-0.4
                c5.4,0,9.8,4.4,9.8,9.8C277,180,275.9,182.5,274.2,184.2z"
          />
          <polygon
            class="conf3"
            points="231.5,285.4 174.2,285.5 143.8,205.1 262.7,204.7"
          />
          <path
            class="conf4"
            d="M166.3,187.4l-28.6,0.1c-5.4,0-9.8-4.4-9.8-9.8c0-5.4,4.4-9.8,9.9-9.9l24.1-0.1c0,0-2.6,5-1.3,10.6
                C161.8,183.7,166.3,187.4,166.3,187.4z"
          />
          <ellipse
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -89.8523 231.0278)"
            class="conf2"
            cx="233.9"
            cy="224"
            rx="5.6"
            ry="5.6"
          />
          <path
            class="conf5"
            d="M143.8,205.1l5.4,14.3c6.8-2.1,14.4-0.5,19.7,4.8c7.7,7.7,7.6,20.1-0.1,27.8c-1.7,1.7-3.7,3-5.8,4l11.1,29.4
                l27.7,0l-28-80.5L143.8,205.1z"
          />
          <path
            class="conf2"
            d="M169,224.2c-5.3-5.3-13-6.9-19.7-4.8l13.9,36.7c2.1-1,4.1-2.3,5.8-4C176.6,244.4,176.6,231.9,169,224.2z"
          />
          <ellipse
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -119.0946 221.1253)"
            class="conf6"
            cx="207.4"
            cy="254.3"
            rx="11.3"
            ry="11.2"
          />
        </g>

        <rect
          x="113.7"
          y="135.7"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -99.5348 209.1582)"
          class="conf7"
          width="178"
          height="178"
        />
        <line class="conf7" x1="76.8" y1="224.7" x2="328.6" y2="224.7" />
        <polyline class="conf7" points="202.7,350.6 202.7,167.5 202.7,98.9 	" />
        <!-- here comes the confettis-->

        <circle class="conf2" id="conf-b" cx="195.2" cy="232.6" r="5.1" />
        <circle class="conf0" id="conf-b" cx="230.8" cy="219.8" r="5.4" />
        <circle class="conf0" id="conf-c" cx="178.9" cy="160.4" r="4.2" />
        <circle class="conf6" id="conf-d" cx="132.8" cy="123.6" r="5.4" />
        <circle class="conf0" id="conf-d" cx="151.9" cy="105.1" r="5.4" />

        <path
          class="conf0"
          id="conf-d"
          d="M129.9,176.1l-5.7,1.3c-1.6,0.4-2.2,2.3-1.1,3.5l3.8,4.2c1.1,1.2,3.1,0.8,3.6-0.7l1.9-5.5
            C132.9,177.3,131.5,175.7,129.9,176.1z"
        />
        <path
          class="conf6"
          id="conf-b"
          d="M284.5,170.7l-5.4,1.2c-1.5,0.3-2.1,2.2-1,3.3l3.6,3.9c1,1.1,2.9,0.8,3.4-0.7l1.8-5.2
            C287.4,171.9,286.1,170.4,284.5,170.7z"
        />
        <circle class="conf6" id="conf-c" cx="206.7" cy="144.4" r="4.5" />
        <path
          class="conf2"
          id="conf-c"
          d="M176.4,192.3h-3.2c-1.6,0-2.9-1.3-2.9-2.9v-3.2c0-1.6,1.3-2.9,2.9-2.9h3.2c1.6,0,2.9,1.3,2.9,2.9v3.2
            C179.3,191,178,192.3,176.4,192.3z"
        />
        <path
          class="conf2"
          id="conf-b"
          d="M263.7,197.4h-3.2c-1.6,0-2.9-1.3-2.9-2.9v-3.2c0-1.6,1.3-2.9,2.9-2.9h3.2c1.6,0,2.9,1.3,2.9,2.9v3.2
            C266.5,196.1,265.2,197.4,263.7,197.4z"
        />
        <!-- yellow-strip-1-->
        <path
          id="yellow-strip"
          d="M179.7,102.4c0,0,6.6,15.3-2.3,25c-8.9,9.7-24.5,9.7-29.7,15.6c-5.2,5.9-0.7,18.6,3.7,28.2
            c4.5,9.7,2.2,23-10.4,28.2"
        />
        <path
          class="conf8"
          id="yellow-strip"
          d="M252.2,156.1c0,0-16.9-3.5-28.8,2.4c-11.9,5.9-14.9,17.8-16.4,29c-1.5,11.1-4.3,28.8-31.5,33.4"
        />
        <path
          class="conf0"
          id="conf-a"
          d="M277.5,254.8h-3.2c-1.6,0-2.9-1.3-2.9-2.9v-3.2c0-1.6,1.3-2.9,2.9-2.9h3.2c1.6,0,2.9,1.3,2.9,2.9v3.2
            C280.4,253.5,279.1,254.8,277.5,254.8z"
        />
        <path
          class="conf3"
          id="conf-c"
          d="M215.2,121.3L215.2,121.3c0.3,0.6,0.8,1,1.5,1.1l0,0c1.6,0.2,2.2,2.2,1.1,3.3l0,0c-0.5,0.4-0.7,1.1-0.6,1.7v0
            c0.3,1.6-1.4,2.8-2.8,2l0,0c-0.6-0.3-1.2-0.3-1.8,0h0c-1.4,0.7-3.1-0.5-2.8-2v0c0.1-0.6-0.1-1.3-0.6-1.7l0,0
            c-1.1-1.1-0.5-3.1,1.1-3.3l0,0c0.6-0.1,1.2-0.5,1.5-1.1v0C212.5,119.8,214.5,119.8,215.2,121.3z"
        />
        <path
          class="conf3"
          id="conf-b"
          d="M224.5,191.7L224.5,191.7c0.3,0.6,0.8,1,1.5,1.1l0,0c1.6,0.2,2.2,2.2,1.1,3.3v0c-0.5,0.4-0.7,1.1-0.6,1.7l0,0
            c0.3,1.6-1.4,2.8-2.8,2h0c-0.6-0.3-1.2-0.3-1.8,0l0,0c-1.4,0.7-3.1-0.5-2.8-2l0,0c0.1-0.6-0.1-1.3-0.6-1.7v0
            c-1.1-1.1-0.5-3.1,1.1-3.3l0,0c0.6-0.1,1.2-0.5,1.5-1.1l0,0C221.7,190.2,223.8,190.2,224.5,191.7z"
        />
        <path
          class="conf3"
          id="conf-a"
          d="M312.6,242.1L312.6,242.1c0.3,0.6,0.8,1,1.5,1.1l0,0c1.6,0.2,2.2,2.2,1.1,3.3l0,0c-0.5,0.4-0.7,1.1-0.6,1.7v0
            c0.3,1.6-1.4,2.8-2.8,2l0,0c-0.6-0.3-1.2-0.3-1.8,0h0c-1.4,0.7-3.1-0.5-2.8-2v0c0.1-0.6-0.1-1.3-0.6-1.7l0,0
            c-1.1-1.1-0.5-3.1,1.1-3.3l0,0c0.6-0.1,1.2-0.5,1.5-1.1v0C309.9,240.6,311.9,240.6,312.6,242.1z"
        />
        <path
          class="conf8"
          id="yellow-strip"
          d="M290.7,215.4c0,0-14.4-3.4-22.6,2.7c-8.2,6.2-8.2,23.3-17.1,29.4c-8.9,6.2-19.8-2.7-32.2-4.1
            c-12.3-1.4-19.2,5.5-20.5,10.9"
        />
        <!-- </g> -->
      </svg>
    </div>
  </div>
</template>
    
<script>
import { getAction } from "@/api/manage.js";

export default {
  name: "AdminLottery",
  data() {
    return {
      loading: false,
      finished: false,
      showResult: false,
      peopleList: [],
      processList: [],
      randomPeople: "无",
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
            if (that.processList.length > 0 && that.randomPeople === "无") {
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
          }, 3000);
        }
      }, 1000);
    },
    getName(id) {
      let peopleFilter = this.peopleList.filter((e) => e.id === id);
      if (peopleFilter.length > 0) return peopleFilter[0].peopleName;
      else return "";
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

  .names {
    position: absolute;
    width: 80%;
    height: 72px;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    font-weight: 100;
    border: solid 3px;
    border-image: linear-gradient(
      to right,
      transparent,
      rgba(0, 0, 0, 0.5),
      transparent
    );
    border-image-slice: 1;
    text-align: center;
    line-height: 72px;
    letter-spacing: 24px;
  }

  .winners {
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
    min-width: 50px;
    height: auto;
    min-height: 50px;
  }

  .btns {
    position: fixed;
    bottom: 5vh;
    width: 200px;
    height: 200px;
    left: 50%;
    transform: translateX(-50%);
    border: solid 1px dodgerblue;
    border-radius: 200px;
    font-size: 48px;
    letter-spacing: 20px;
    text-align: center;
    padding-left: 40px;
    line-height: 65px;
    box-shadow: inset rgba(0, 0, 0, 0.6) 0 -6px 8px,
      inset rgba(252, 255, 255, 0.7) 0 6px 8px,
      rgba(0, 0, 0, 0.8) 0 6px 8px -6px;
    transition: 0.2s;

    &.active {
      box-shadow: inset rgba(0, 0, 0, 0.6) 0 12px 8px,
        inset rgba(252, 255, 255, 0.7) 0 -3px 8px;
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
      color: rgba(0, 0, 0, 0.35);
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
        opacity: 0.1;
      }
    }
  }

  .result {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;

    svg {
      background: transparent;
      margin-top: 40vh;
      transform: scale(2.5);
      transform-origin: left;
      //   padding-left: 250px;
      //   padding-top: 80px;
    }

    .conf0 {
      fill: #fc6394;
    }

    .conf1 {
      fill: #ef3c8a;
    }

    .conf2 {
      fill: #5adaea;
    }

    .conf3 {
      fill: #974cbe;
    }

    .conf4 {
      fill: #3cbecd;
    }

    .conf5 {
      fill: #813bbe;
    }

    .conf6 {
      fill: #f9b732;
    }

    .conf7 {
      display: none;
      fill: none;
      stroke: #000000;
      stroke-miterlimit: 10;
    }

    .conf8 {
      fill: none;
      stroke: #f9b732;
      stroke-width: 9;
      stroke-linecap: round;
      stroke-miterlimit: 10;
    }

    .confetti-cone {
      transform-origin: 200px 50px;
      animation: confetti-cone1 1.2s ease infinite;
    }

    @keyframes confetti-cone1 {
      0% {
        transform: translate(40px, 95px) rotate(45deg) scale(1, 1);
      }

      15% {
        transform: translate(10px, 145px) rotate(45deg) scale(1.1, 0.85);
      }

      100% {
        transform: translate(40px, 105px) rotate(45deg) scale(1, 1);
      }
    }

    #yellow-strip {
      fill: none;
      stroke: #f9b732;
      stroke-width: 9;
      stroke-linecap: round;
      stroke-miterlimit: 10;
      animation: confdash 1.2s ease infinite;
    }

    @keyframes confdash {
      0% {
        stroke-dasharray: 1000;
        stroke-dashoffset: 500;
        transform: translate(-30px, 30px);
        opacity: 0;
      }

      2% {
        stroke-dasharray: 1000;
        stroke-dashoffset: 500;
        transform: translate(-30px, 30px);
        opacity: 0;
      }

      35% {
        stroke-dasharray: 1000;
        stroke-dashoffset: 900;
        transform: translate(-2px, 0px);
        opacity: 1;
      }

      85% {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        transform: translate(1px, -5px);
        opacity: 1;
      }

      90% {
        stroke-dashoffset: 1000;
        stroke-dashoffset: 1000;
        transform: translate(2px, -8px);
        opacity: 0;
      }

      100% {
        stroke-dashoffset: 1000;
        stroke-dashoffset: 500;
        transform: translate(2px, -8px);
        opacity: 0;
      }
    }

    #conf-a {
      transform-origin: center center;
      animation: confa 1.2s ease-out infinite;
    }

    @keyframes confa {
      0% {
        opacity: 0;
        transform: translate(-30px, 20px) rotate(0);
      }

      15% {
        opacity: 1;
        transform: translate(25px, -10px) rotate(60deg);
      }

      80% {
        opacity: 1;
        transform: translate(33px, -18px) rotate(180deg);
      }

      100% {
        opacity: 0;
        transform: translate(37px, -23px) scale(0.5) rotate(230deg);
      }
    }

    #conf-b {
      transform-origin: center center;
      animation: confb 1.2s ease-out infinite;
    }

    @keyframes confb {
      0% {
        opacity: 0;
        transform: translate(-30px, 20px) rotate(0);
      }

      12% {
        opacity: 1;
        transform: translate(25px, -10px) rotate(60deg);
      }

      76% {
        opacity: 1;
        transform: translate(33px, -18px) rotate(180deg);
      }

      100% {
        opacity: 0;
        transform: translate(37px, -23px) scale(0.5) rotate(240deg);
      }
    }

    #conf-c {
      transform-origin: center center;
      animation: confc 1.2s ease-out infinite;
    }

    @keyframes confc {
      0% {
        opacity: 0.7;
        transform: translate(-30px, 20px) rotate(0);
      }

      18% {
        opacity: 1;
        transform: translate(5px, -10px) rotate(60deg);
      }

      76% {
        opacity: 1;
        transform: translate(13px, -18px) rotate(180deg);
      }

      100% {
        opacity: 0;
        transform: translate(17px, -23px) scale(0.5) rotate(230deg);
      }
    }

    #conf-d {
      transform-origin: center center;
      animation: confd 1.2s ease-out infinite;
    }

    @keyframes confd {
      0% {
        opacity: 0.7;
        transform: translate(-20px, 20px) rotate(0);
      }

      18% {
        opacity: 1;
        transform: translate(-5px, -10px) rotate(60deg);
      }

      76% {
        opacity: 1;
        transform: translate(-8px, -18px) rotate(180deg);
      }

      100% {
        opacity: 0;
        transform: translate(-10px, -23px) scale(0.5) rotate(230deg);
      }
    }
  }
}
</style>