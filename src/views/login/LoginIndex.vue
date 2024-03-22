<template>
  <div class="login">
    <div class="login-logo">
      <lijiu-logo :size="100" :white="true" />
      <h2 class="login-title">北京力久科技有限公司项目月报</h2>
    </div>

    <van-form
      scroll-to-error
      submit-on-enter
      class="login-form"
      validate-trigger="onSubmit"
      :disabled="disabled || loading"
      @submit="handleLogin"
    >
      <van-field
        autofocus
        class="login-input"
        v-model="model.username"
        name="username"
        left-icon="user-circle-o"
        placeholder="Username"
        autocomplete="username"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        clearable
        class="login-input"
        v-model="model.userPwd"
        type="password"
        name="userPwd"
        left-icon="closed-eye"
        placeholder="Password"
        autocomplete="current-password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button
        round
        block
        type="primary"
        size="large"
        native-type="submit"
        :disabled="disabled"
        :loading="loading"
        loading-type="spinner"
        color="linear-gradient(to right, #247bbf 0%, #60afe1 100%)"
        >Sign in</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { postAction } from "@/api/manage.js";
import { setCookie } from "@/utils/cookie.js";
import LijiuLogo from "@/components/logo/LijiuLogo";
export default {
  components: {
    LijiuLogo,
  },
  data() {
    return {
      disabled: false,
      loading: false,
      model: {
        username: "",
        userPwd: "",
      },
    };
  },
  methods: {
    handleLogin(values) {
      const that = this;
      this.loading = true;
      // 将values对象中的属性复制到model对象中
      Object.assign(this.model, values);
      // 调用登录接口
      postAction("/user/login", this.model)
        .then((e) => {
          if (e.code == 200) {
            that.$toast.success(e.msg);
            that.$notify({ type: "primary", message: e.msg });
            that.$ls.set("username", e.username);
            that.$ls.set("ms_username", e.name);
            setCookie("X-Token", e.token);

            // that.model = e.result;
            // that.userinfo = that.$ls.get("SIGN");
            // that.signined = true;

            // 触发刷新
            this.$store.commit("setRefreshReport", true);
            this.$router.push({ name: "report" });
          } else {
            if (e.code == 300 && e.msg == "??????")
              that.$toast.fail("用户名或密码错误！");
            else that.$toast.fail(e.msg);
          }
        })
        .catch((e) => {
          that.$toast.fail(e.msg);
        })
        .finally(() => {
          that.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .van-field__control {
    color: #f1f2f3;
  }
  .van-cell {
    overflow: unset;
    &::after {
      content: unset;
    }
  }
  .van-field__error-message {
    position: absolute;
    bottom: -30px;
  }
  .van-field__left-icon {
    margin-right: 12px;
    .van-icon {
      font-size: 22px;
    }
  }
}
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(@/assets/wallhaven-zy2x7v.png);
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &-logo {
    width: 100%;
    height: auto;
    text-align: center;
    padding-top: 16vh;
  }

  &-title {
    color: #f1f2f3;
    opacity: 0.25;
    font-weight: 100;
    font-family: 等线;
    position: relative;

    &::after {
      content: "";
      display: inline-block;
      width: 15%;
      height: 2px;
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);
      background-color: #f1f2f3;
    }
  }

  &-form {
    padding: 16px 16px 10vh 16px;
    width: calc(100% - 32px);
  }

  &-form > * {
    margin-top: 16px;
  }

  &-input {
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 44px;
  }

  &::before {
    content: "";
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    pointer-events: none;
    z-index: 0;
  }
}
</style>