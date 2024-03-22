<template>
  <van-dialog
    v-model="innerValue"
    title="修改密码"
    show-cancel-button
    show-confirm-button
    confirm-button-text="确定"
    confirm-button-color="#247bbf"
    cancel-button-color="#ccc"
    :before-close="handleBeforeClose"
    @close="handleClose"
  >
    <van-field v-model="model.oldPassword" type="password" label="原密码" />
    <van-field v-model="model.newPassword" type="password" label="新密码" />
    <van-field
      v-model="model.confirmPassword"
      type="password"
      label="确认新密码"
    />
  </van-dialog>
</template>
  
<script>
import { postAction } from "@/api/manage.js";

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 在组件内部维护一个内部值 innerValue
      innerValue: this.value,
      model: {
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
      },
      url: "/user/editPwd",
    };
  },
  watch: {
    // 监听外部传入的 value 属性的变化
    value(newValue) {
      this.innerValue = newValue;
    },
  },
  methods: {
    /**
     * 处理弹窗关闭前的操作
     * @param {string} action 关闭弹窗的动作，可以是 cancel 或者 confirm
     * @param {function} done 关闭弹窗的回调函数，传入布尔值，表示是否关闭弹窗
     * @returns {void}
     */
    handleBeforeClose(action, done) {
      switch (action) {
        case "cancel":
          done();
          break;
        case "confirm":
          // 校验数据
          if (this.model.newPassword !== this.model.confirmPassword) {
            this.$toast("两次输入的密码不一致，请重新输入");
            done(false);
            return;
          }
          if (this.model.newPassword.length < 6) {
            this.$toast("密码长度不能少于6位，请重新输入");
            done(false);
            return;
          }

          // 校验通过，执行异步操作
          postAction(this.url, this.model)
            .then((res) => {
              if (res.status === "200") {
                // 异步操作完成后关闭弹窗
                this.$notify({
                  type: "success",
                  message: "密码修改成功",
                });
                done();
              } else {
                this.$notify({
                  type: "danger",
                  message: res.message || "操作失败",
                });
                this.$toast({
                  position: "top",
                  message: res.message || "操作失败",
                });
                done(false);
              }
            })
            .catch((msg) => {
              // 处理异步操作失败的情况
              this.$toast("操作失败，" + msg);
              done(false);
            });
          break;
      }
    },
    /**
     * 处理弹窗关闭的事件
     */
    handleClose() {
      this.$emit("close");
      this.$emit("input", false);
    },
  },
};
</script>
  
<style>
</style>