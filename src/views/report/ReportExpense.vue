<template>
  <div>
    <van-sticky>
      <van-nav-bar
        fixed
        placeholder
        safe-area-inset-top
        :title="`${dateDay}-费用明细`"
        left-text="返回"
        left-arrow
        @click-left="() => $router.go(-1)"
      />
      <van-cell :value="'项目名称：' + projectName" />
      <van-cell>
        <template #default>
          <span>报销费用：</span>
          <span style="color: #333"
            >{{
              total.toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
            元</span
          >
        </template>
      </van-cell>
    </van-sticky>

    <van-skeleton title :row="10" :loading="loading">
      <van-pull-refresh
        v-model="pullLoading"
        :pull-distance="100"
        success-text="刷新成功"
        @refresh="loadData"
      >
        <van-empty
          v-if="!loading && dataSource.length === 0"
          description="暂无月报记录"
        />
        <van-list
          v-else
          v-model="loading"
          :finished="true"
          @load="loadData"
          finished-text="加载完成"
        >
          <van-swipe-cell
            v-for="item in dataSource"
            :key="item.id"
            :before-close="handleCloseSwipe(item.id)"
          >
            <van-cell-group
              inset
              class="report-card"
              :title="item.generateDate"
              @click="handleClick(item)"
            >
              <van-cell title="费用类型" :value="item.expenseType" />
              <van-cell
                title="费用金额"
                :value="
                  parseFloat(item.expenseAmount || 0).toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) + '元'
                "
              />
              <van-cell title="费用备注" :value="item.remark" />
            </van-cell-group>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="report-card-delete-button"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
    </van-skeleton>

    <expense-dialog
      v-model="dialogVisible"
      :readonly="dialogData.flag === '1'"
      :type-list="typeList"
      :data="dialogData"
      :title="dialogTitle"
      :async-operation="handleSave"
      @undo="handleUndo"
    />

    <!-- 悬浮按钮菜单 -->
    <div v-if="editable" id="menu" class="menu">
      <van-button
        type="primary"
        class="menu-button"
        round
        icon="plus"
        @click="handleAdd"
      ></van-button>
    </div>
  </div>
</template>

<script>
import { postAction } from "@/api/manage.js";
import Vue from "vue";
import ExpenseDialog from "@/components/expense/ExpenseDialog.vue";

export default {
  components: { ExpenseDialog },
  data() {
    return {
      ms_username: Vue.ls.get("ms_username"), // 用户名
      loading: true, // 加载状态
      pullLoading: false, // 下拉刷新状态
      date: "",
      projectCode: "",
      projectName: "",
      day: "",
      expense: 0,
      editable: false,
      dataSource: [], // 报销数据列表
      typeList: [], // 费用类型列表
      dialogVisible: false, // 报销数据编辑弹窗状态
      dialogTitle: "", // 报销数据编辑弹窗标题
      dialogData: {}, // 报销数据编辑弹窗数据
      url: {
        type: "/project/expenseTypeList",
        list: "/report/expensesList",
        save: "/report/saveExpenses",
        delete: "/report/deleteExpenses",
      },
    };
  },
  computed: {
    // 日期
    dateDay() {
      return this.date + "-" + this.day;
    },
    // 求和数据列表的所有报销费用
    total() {
      return this.dataSource.reduce((acc, cur) => {
        return acc + parseFloat(cur.expenseAmount || 0.0);
      }, 0);
    },
  },
  watch: {
    // 监听费用总计，更新父组件的总计
    total: {
      handler() {
        this.$store.commit("setExpenseTotal", {
          day: this.day,
          projectCode: this.projectCode,
          total: this.total,
        });
      },
      immediate: true,
    },
  },
  created() {
    // 初始化数据
    this.init();
  },
  methods: {
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      this.date = this.$route.params.date;
      this.projectCode = this.$route.params.projectCode;
      this.projectName = this.$route.params.projectName;
      this.day = this.$route.params.day;
      this.expense = this.$route.params.expense || 0;
      this.editable = this.$route.params.editable;

      await Promise.all([this.getTypeList(), this.loadData()]);
      this.loading = false;
    },
    /**
     * 获取报销费用类型列表
     */
    async getTypeList() {
      // 发送请求
      const res = await postAction(this.url.type);
      // 处理数据
      if (res.status == 200) {
        this.typeList = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取费用类型失败");
        console.error(res);
      }
    },
    /**
     * 获取报销数据列表
     * @param {string} date 日期
     * @param {string} projectCode 项目编码
     */
    async loadData() {
      // 发送请求
      const res = await postAction(this.url.list, {
        date: this.dateDay,
        projectCode: this.projectCode,
      });
      // 处理数据
      if (res.status == 200) {
        this.dataSource = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取费用明细数据列表失败");
        console.error(res);
      }
      // 加载完成
      this.loading = false;
      this.pullLoading = false;
    },
    /**
     * 处理关闭滑动单元事件
     * @param {string} id 报销数据ID
     * @returns {function} 关闭事件回调函数
     */
    handleCloseSwipe(id) {
      return ({ position, instance }) => {
        switch (position) {
          case "left":
          case "cell":
          case "outside":
            // 如果点击的是左侧、cell、或者外部区域，立即关闭 SwipeCell
            instance.close();
            break;
          case "right":
            // 如果点击的是右侧
            this.$dialog
              .confirm({
                message: "确定删除吗？",
              })
              .then(async () => {
                // 在确认对话框点击确定后，执行异步操作
                await this.handleRemove(id);
                // 异步操作完成后关闭 SwipeCell
                instance.close();
              })
              .catch(() => {
                // 点击取消按钮，不做任何操作
              });
            break;
        }
      };
    },
    /**
     * 处理删除事件
     * @param {string} id 报销数据ID
     * @returns {Promise}
     */
    async handleRemove(id) {
      if (!id) {
        return;
      }
      // 发送删除请求
      const res = await postAction(this.url.delete, { id });
      if (res.status == 200) {
        this.$toast.success("删除成功");
        // 刷新数据
        this.loadData();
      } else {
        this.$toast.fail(res.message || "删除失败");
        console.error(res);
      }
    },
    /**
     * 处理点击事件
     * @param {object} item 报销数据对象
     * @returns {void}
     */
    handleClick(item) {
      this.dialogVisible = true;
      this.dialogTitle = item ? "查看费用明细数据" : "新增费用明细数据";
      this.dialogData = item || {};
    },
    /**
     * 处理保存事件
     * @param {object} data 报销数据对象
     * @returns {Promise}
     */
    handleSave(data) {
      return new Promise((resolve, reject) => {
        // 发送保存请求
        postAction(this.url.save, {
          expenseAmount: data.expenseAmount, // 费用金额
          expenseDesc: data.expenseDesc, // 费用描述
          expenseType: data.expenseType, // 费用类型
          generateDate: this.dateDay, // 费用日期
          projectCode: this.projectCode, // 项目编码
          remark: data.remark, // 费用备注
          // id: data.id,
        })
          .then((res) => {
            if (res.status == 200) {
              // 保存成功，关闭弹窗
              this.$toast.success("保存成功");
              this.loadData();
              resolve();
            } else {
              // 保存失败，显示错误信息
              this.$toast.fail(res.message || "保存失败");
              console.error(res);
              reject("保存失败");
            }
          })
          .catch((err) => {
            console.error(err);
            reject("保存失败");
          });
      });
    },
    /**
     * 处理撤销事件
     */
    handleUndo() {
      // 刷新数据
      this.loadData();
    },
    /**
     * 处理新增事件
     * @returns {void}
     */
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "新增费用明细数据";
      // 构建空数据
      this.dialogData = {
        expenseAmount: 0.0,
        expenseDesc: "",
        expenseType: "",
        generateDate: this.dateDay,
        projectCode: this.projectCode,
        remark: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell-group__title {
    /*font-size: 10px;*/
    text-align: center;
  }
  .van-cell__title {
    color: #999;
  }
  .van-cell__value {
    color: #000;
    flex: 4;
    text-align: left;
  }
  .van-popover__wrapper {
    pointer-events: none;
  }
}

.report-card {
  box-shadow: 0 4px 12px rgba(235, 237, 240, 66%);
  padding: 6px 4px;

  .van-cell {
    padding: 4px 16px;
  }

  &-title {
    font-weight: bold;
  }

  &-delete-button {
    top: 40px;
    height: calc(100% - 40px);
  }
}

.menu {
  position: fixed;
  right: 0;
  bottom: 25px;
  box-sizing: border-box;
  margin: 25px;
  white-space: nowrap;
  z-index: 100;
  padding-left: 0;

  &-button {
    width: 56px;
    height: 56px;
    margin-bottom: 25px;
    font-size: 25px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    transition: all 0.5s;
    pointer-events: auto;

    .van-button__content {
      transition: all 0.5s;
    }
  }
}
</style>