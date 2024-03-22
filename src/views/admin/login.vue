<template>
  <div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :length="4"
      :gutter="10"
      :error-info="errorInfo"
      :focused="showKeyboard"
      style="margin-top: 20vh"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>
  
  <script>
// import { mapState } from "vuex";
//   import { postAction } from "@/api/manage.js";

export default {
  name: "AdminLogin",
  data() {
    return {
      password: "8123",
      value: "",
      showKeyboard: true,
      errorInfo: "",
    };
  },
  watch: {
    value(value) {
      if (value.length >= 4 && value !== this.password) {
        this.errorInfo = "密码错误，请重新输入";
      } else if (value.length === 4 && value == this.password) {
        this.login();
      } else {
        this.errorInfo = "";
      }
    },
  },
  mounted() {
    if (this.$ls.get("ADMIN")) {
      this.$router.replace({ name: "adminIndex" });
    }

    const that = this;
    document.addEventListener("keydown", function (event) {
      // 判断按下的按键是否为数字0-9或退格键
      if ((event.key >= "0" && event.key <= "9") || event.key === "Backspace") {
        // 如果是数字0-9，将数字添加到输入框的末尾
        if (event.key !== "Backspace") {
          that.value += event.key;
        }
        // 如果是退格键，则删除输入框的最后一个字符
        else {
          if (that.value.length > 0) {
            that.value = that.value.slice(0, -1);
          }
        }
      }
    });
  },
  methods: {
    login() {
      this.$ls.set("ADMIN", true);
      this.$router.push({ name: "adminIndex" });
    },
  },
};
</script>
  
  <style scoped lang="scss">
</style>
    