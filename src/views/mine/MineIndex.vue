<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="isLoading = false">
      <van-sticky>
        <van-nav-bar fixed placeholder safe-area-inset-top> </van-nav-bar>
        <div class="mine-header">
          <lijiu-logo class="mine-header-logo" :size="64" background />
          <div class="mine-header-user">
            <h2 class="mine-header-user-name">{{ ms_username }}</h2>
          </div>
        </div>
      </van-sticky>

      <van-cell-group style="margin-top: 20px">
        <van-cell
          title="修改密码"
          size="large"
          is-link
          center
          @click="changePassword"
        >
          <template #icon>
            <svg
              t="1711009902087"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4391"
              width="28"
              height="28"
            >
              <path
                d="M0 0m256 0l512 0q256 0 256 256l0 512q0 256-256 256l-512 0q-256 0-256-256l0-512q0-256 256-256Z"
                fill="#DD2747"
                opacity=".1"
                p-id="4392"
                class="custom-cursor-on-hover"
              ></path>
              <path
                d="M697.408 432.768A84.608 84.608 0 0 1 768 515.84v231.872C768 794.24 729.824 832 682.72 832h-341.44C294.176 832 256 794.24 256 747.712V515.84c0-44.48 34.848-80.96 79.04-84.096V371.2C335.04 272.224 416.128 192 516.224 192s181.184 80.224 181.184 179.168v61.6zM640 431.52v-49.376c0-67.744-55.552-122.688-124.032-122.688-68.544 0-124.064 54.944-124.064 122.688v49.376h248.096z m-85.92 217.28a65.92 65.92 0 0 0 33.696-57.408c0-36.48-29.92-66.08-66.88-66.08a66.464 66.464 0 0 0-66.816 66.08c0 25.536 14.624 47.68 36.032 58.688v76.8h63.968v-78.08z"
                fill="#DD2747"
                p-id="4393"
                class="custom-cursor-on-hover"
              ></path>
            </svg>
          </template>
        </van-cell>
        <van-cell
          title="退出登录"
          size="large"
          is-link
          center
          @click="handleLogout"
        >
          <template #icon>
            <svg
              t="1711009973733"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8758"
              width="28"
              height="28"
            >
              <path
                d="M198.752 217.504a72.32 72.32 0 0 1 77.6-65.44h543.296a108.448 108.448 0 0 1 116.416 98.144v523.52a108.48 108.48 0 0 1-116.416 98.144H276.352a72.32 72.32 0 0 1-77.6-65.44z"
                fill="#4988FD"
                p-id="8759"
              ></path>
              <path
                d="M85.312 202.016a65.44 65.44 0 0 1 48.224-63.104l270.368-73.6a32.736 32.736 0 0 1 40.192 22.976 32 32 0 0 1 1.152 8.64v830.368a32.736 32.736 0 0 1-32.736 32.736 32.192 32.192 0 0 1-8.576-1.152l-270.368-73.6a65.472 65.472 0 0 1-48.224-63.2z"
                fill="#6399FF"
                opacity=".8"
                p-id="8760"
              ></path>
              <path
                d="M641.568 327.2a16.352 16.352 0 0 1 28.8-10.656l158.4 184.832a16.352 16.352 0 0 1 0 21.28l-158.4 184.832a16.352 16.352 0 0 1-28.8-10.656v-119.36h-81.792a16.352 16.352 0 0 1-16.352-16.352v-98.208a16.352 16.352 0 0 1 16.352-16.352h81.824z m-294.4 119.36a32.704 32.704 0 0 0-32.704 32.704v65.44a32.704 32.704 0 0 0 65.44 0v-65.44a32.704 32.704 0 0 0-32.832-32.832"
                fill="#FFFFFF"
                p-id="8761"
              ></path>
            </svg>
          </template>
        </van-cell>
      </van-cell-group>

      <template #normal><span></span></template>
      <template #pulling><span></span></template>
      <template #loosing><span></span></template>
      <template #loading><span></span></template>
    </van-pull-refresh>

    <!-- 修改密码弹窗 -->
    <change-password v-model="changePasswordVisible" />
  </div>
</template>

<script>
import LijiuLogo from "@/components/logo/LijiuLogo.vue";
import ChangePassword from "@/components/password/ChangePassword.vue";
import Vue from "vue";

export default {
  components: { LijiuLogo, ChangePassword },
  data() {
    return {
      ms_username: Vue.ls.get("ms_username"), // 用户名
      isLoading: false, // 下拉刷新状态
      changePasswordVisible: false, // 修改密码弹窗状态
    };
  },
  methods: {
    /**
     * 修改密码
     */
    changePassword() {
      this.changePasswordVisible = true;
    },
    /**
     * 退出登录
     */
    handleLogout() {
      this.$dialog
        .confirm({
          message: "确定退出登录吗？",
        })
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .van-nav-bar::after {
    content: unset;
  }

  .van-pull-refresh {
    min-height: calc(100vh - 100px);
  }
}

.mine-header {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: -1px;
  padding: 6px 12px 32px;

  &-logo {
    margin: 0 12px;
    border: solid 1px rgba(36, 123, 191, 0.3);
    border-radius: 12px;
    box-shadow: 2px 2px 12px 0px rgba(36, 123, 191, 0.12);
    padding: 4px;
  }

  &-user {
    padding: 6px;

    &-name {
      font-size: 25px;
      margin: 0;
      letter-spacing: 2px;
      font-family: 等线;
    }
  }
}

.icon {
  margin-right: 12px;
}
</style>