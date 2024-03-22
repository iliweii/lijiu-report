<template>
  <van-dialog
    v-model="innerValue"
    :title="title"
    show-cancel-button
    confirm-button-text="保存"
    confirm-button-color="#247bbf"
    cancel-button-color="#ccc"
    :before-close="handleBeforeClose"
    :show-confirm-button="!readonly"
    @close="handleClose"
  >
    <van-field
      center
      readonly
      clickable
      label="费用类型"
      name="expenseType"
      :value="model.expenseType"
      placeholder="点击选择费用类型"
      @click="showPicker = true"
    >
      <template #right-icon>
        <van-icon name="arrow-down" />
      </template>
    </van-field>

    <van-field
      v-model="model.expenseAmount"
      type="number"
      label="费用金额"
      :readonly="readonly"
    >
      <template #right-icon>
        <span>元</span>
      </template>
    </van-field>

    <van-field
      v-model="model.remark"
      rows="5"
      autosize
      label="费用备注"
      type="textarea"
      :readonly="readonly"
      :placeholder="model.expenseDesc || '请输入费用备注'"
    />

    <van-popup
      v-model="showPicker"
      round
      position="bottom"
      get-container="#app"
    >
      <van-picker
        :show-toolbar="!readonly"
        title="选择项目"
        value-key="expenseType"
        :columns="typeList"
        :readonly="readonly"
        @cancel="showPicker = false"
        @confirm="handlePickerConfirm"
      >
      </van-picker>
    </van-popup>
  </van-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    typeList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "标题",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    asyncOperation: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showPicker: false,
      // 在组件内部维护一个内部值 innerValue
      innerValue: this.value,
      model: {
        expenseAmount: 0,
        expenseType: "",
        expenseDesc: "",
        generateDate: "",
        flag: "1",
        id: "",
        projectCode: "",
        remark: "",
        username: "",
      },
    };
  },
  watch: {
    // 监听外部传入的 value 属性的变化
    value(newValue) {
      this.innerValue = newValue;
      this.model = this.data;
    },
    // 深度监听data属性的变化，赋值给model
    data: {
      handler(newValue) {
        this.model = newValue;
      },
      deep: true,
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
          // 如果点击的是取消按钮
          if (!this.readonly) this.$emit("undo");
          done();
          break;
        case "confirm":
          // 校验数据
          if (!this.model.expenseAmount) {
            this.$toast("请输入费用金额");
            done(false);
            return;
          }
          if (!this.model.expenseType) {
            this.$toast("请选择费用类型");
            done(false);
            return;
          }
          // 如果点击的是确认按钮
          this.asyncOperation(this.model)
            .then(() => {
              // 异步操作完成后关闭弹窗
              this.$notify({
                type: "success",
                message: "保存成功",
              });
              done();
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
    /**
     * 处理选择类型的事件
     * @param {object} values 选择的类型
     */
    handlePickerConfirm(values) {
      this.model.expenseType = values.expenseType;
      this.model.expenseDesc = values.expenseDesc;
      this.showPicker = false;
    },
  },
};
</script>

<style>
</style>