<template>
  <div>
    <van-sticky>
      <van-nav-bar fixed placeholder safe-area-inset-top title="项目月报">
        <template #left>
          <lijiu-logo :size="24" background />
        </template>
        <!-- <template #right>
          <van-icon name="add-o" size="22" />
        </template> -->
      </van-nav-bar>

      <van-field
        center
        readonly
        clickable
        input-align="center"
        name="month"
        :value="value"
        placeholder="点击选择月份"
        :formatter="fieldFormatter"
        @click="showPicker = true"
      >
        <template #right-icon>
          <van-icon name="arrow-down" />
        </template>
      </van-field>

      <van-popup v-model="showPicker" round position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择月份"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="pickerFormatter"
          @confirm="handlePickerConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
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
            :before-close="handleCloseSwipe(item.project_code)"
          >
            <van-cell-group
              inset
              class="report-card"
              :title="formatDate(item.create_date)"
              @click="handleClick(item)"
            >
              <van-cell class="report-card-title" :value="ms_username">
                <template #default>
                  <van-icon name="gold-coin" class="report-card-icon" />
                  <span>{{ ms_username }}</span>
                  <van-tag
                    style="float: right"
                    v-if="item.report_status === '0'"
                    plain
                    type="success"
                    size="medium"
                    >未提交</van-tag
                  >
                  <van-tag
                    style="float: right"
                    v-else
                    color="#247bbf"
                    size="medium"
                    >已提交</van-tag
                  >
                </template>
              </van-cell>
              <van-divider />
              <van-cell
                class="report-card-expenses"
                title="报销费用"
                :value="
                  item.report_expenses.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
              />
              <van-cell
                title="工时合计"
                :value="item.report_workhours + ' 小时'"
              />
              <van-cell title="项目编码" :value="item.project_code" />
              <van-cell title="项目名称" :value="item.project_name" />
              <van-cell
                v-if="item.remarks"
                title="备注"
                :value="item.remarks"
              />
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

    <!-- 悬浮按钮菜单 -->
    <ul id="menu" :class="{ menu: true, active: showOverlay }">
      <li>
        <van-popover
          v-model="showPopover"
          placement="left-start"
          trigger="none"
        >
          <template #reference>
            <van-button
              :type="showOverlay ? 'danger' : 'info'"
              class="menu-button"
              round
              icon="plus"
              @click="handleOverlay"
            ></van-button>
          </template>
          <span class="menu-popover">{{ message.cancel }}</span>
        </van-popover>
      </li>
      <ul class="menu-list">
        <li>
          <!-- 新增按钮 -->
          <van-popover
            v-model="showPopover"
            placement="left-start"
            trigger="none"
          >
            <template #reference>
              <van-button
                type="info"
                class="menu-button"
                round
                icon="plus"
                @click="handleAdd"
              ></van-button>
            </template>
            <span class="menu-popover">{{ message.add }}</span>
          </van-popover>
        </li>
        <li>
          <!-- 提交按钮 -->
          <van-popover
            v-model="showPopover"
            placement="left-start"
            trigger="none"
          >
            <template #reference>
              <van-button
                type="primary"
                class="menu-button"
                round
                icon="success"
                :disabled="!hasUnsubmittedData"
                @click="handleSubmit"
              ></van-button>
            </template>
            <span class="menu-popover"
              >{{ message.submit }}
              <template v-if="!hasUnsubmittedData">
                <br />(当前无需要提交的月报)
              </template>
            </span>
          </van-popover>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import LijiuLogo from "@/components/logo/LijiuLogo.vue";
import { postAction } from "@/api/manage.js";
import Vue from "vue";

export default {
  components: { LijiuLogo },
  data() {
    return {
      ms_username: Vue.ls.get("ms_username"), // 用户名
      loading: true, // 加载状态
      pullLoading: false, // 下拉刷新状态
      queryParam: {}, // 查询条件
      dataSource: [], // 数据列表
      originalDataSource: [], // 原始数据列表
      projectList: [], // 项目列表
      showPicker: false,
      showOverlay: false,
      showPopover: false,
      currentDate: new Date(),
      value: new Date().toString(),
      minDate: new Date(new Date().getFullYear() - 1, 0, 1),
      maxDate: new Date(),
      url: {
        list: "/report/reportList",
        save: "/report/saveReportInfo",
        delete: "/report/deleteReportInfo",
        projectList: "/project/projectList",
      },
      message: {
        cancel: "取消",
        add: "新增一条月报",
        submit: "填写完成，点击提交本月月报",
      },
    };
  },
  computed: {
    shouldRefresh() {
      return this.$store.state.shouldRefreshReport;
    },
    // 当前dataSource中是否存在未提交的数据
    hasUnsubmittedData() {
      return this.dataSource.some((item) => item.report_status === "0");
    },
  },
  watch: {
    shouldRefresh(newVal) {
      if (newVal) {
        this.loadData();
        this.$store.commit("setRefreshReport", false); // 重置状态
      }
    },
  },
  async created() {
    this.loading = true;
    await this.getProjectList();
    this.loadData();
  },
  methods: {
    /**
     * 加载数据
     */
    loadData() {
      // 加载数据前，先清空数据列表
      this.queryParam.date = this.fieldFormatter(this.value);
      // 发送请求
      postAction(this.url.list, this.queryParam)
        .then((res) => {
          // 处理数据
          if (res.status === 200) {
            this.dataSource = []; // 清空数据列表
            let dataList = res.dataList; // 月报数据列表
            this.originalDataSource = dataList; // 保存原始数据列表
            // 合并数据
            for (let i = 0; i < dataList.length; i += 2) {
              let item1 = dataList[i];
              let item2 = dataList[i + 1];
              // 合并数据
              this.dataSource.push({
                id: `${item1.id}-${item2.id}`, // 合并数据 id
                project_code: item1.project_code, // 项目编码
                project_name: this.getProjectName(item1.project_code), // 项目名称
                report_status: item1.report_status, // 月报状态
                // 工时合计
                report_workhours:
                  item1.report_type === "Time"
                    ? item1.report_amount
                    : item2.report_amount,
                // 报销费用
                report_expenses:
                  item1.report_type === "Expense"
                    ? item1.report_amount
                    : item2.report_amount,
                report_date: item1.report_date, // 月报日期
                create_date: item1.create_date, // 创建日期
                user_name: item1.user_name, // 创建人
                remarks: item1.remarks, // 备注
              });
            }
          } else {
            // 处理错误信息
            this.$toast.fail(res.message || "获取数据失败");
            console.error(res);
          }
        })
        .finally(() => {
          // 加载完成
          this.loading = false;
          this.pullLoading = false;
        });
    },
    /**
     * 获取项目列表
     */
    async getProjectList() {
      this.queryParam.date = this.fieldFormatter(this.value);
      // 发送请求
      const res = await postAction(this.url.projectList, this.queryParam);
      // 处理数据
      if (res.status == 200) {
        this.projectList = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取项目列表失败");
        console.error(res);
      }
    },
    /**
     * 处理点击事件
     * @param {object} item 月报数据项
     * @returns {void}
     */
    handleClick(item) {
      // 跳转到编辑页面
      this.$router.push({
        name: "reportEdit",
        query: { randomParam: Math.random().toString(36).substring(7) },
        params: {
          id: item.id,
          projectCode: item.project_code,
          projectName: this.getProjectName(item.project_code),
          date: item.report_date,
          editable: item.report_status === "0",
        },
      });
    },
    /**
     * 处理新增事件
     * @returns {void}
     */
    handleAdd() {
      // 关闭菜单
      this.showOverlay = false;
      // 跳转到新增页面
      this.$router.push({
        name: "reportEdit",
        query: { randomParam: Math.random().toString(36).substring(7) },
        params: {
          id: "",
          projectCode: "",
          projectName: "",
          date: this.value,
          editable: true,
        },
      });
    },
    /**
     * 处理关闭滑动单元事件
     * @param {string} projectCode 月报 项目编码
     * @returns {function} 关闭事件回调函数
     */
    handleCloseSwipe(projectCode) {
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
                await this.handleRemove(projectCode);
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
     * @param {string} projectCode 月报 项目编码
     * @returns {Promise}
     */
    async handleRemove(projectCode) {
      if (!this.queryParam.date) {
        this.$toast.fail("请先选择月份");
        return;
      }
      // 发送删除请求
      const res = await postAction(this.url.delete, {
        projectCode,
        date: this.queryParam.date,
      });
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
     * 保存数据
     * @param {boolean} submit 是否提交 true-提交 false-保存
     * @returns {void}
     */
    handleSave(submit = false) {
      if (!this.queryParam.date) {
        this.$toast.fail("请先选择月份");
        return;
      }
      // 深复制原始数据列表
      const dataSource = JSON.parse(JSON.stringify(this.originalDataSource));
      // 遍历数据列表，计算工时合计和报销费用
      for (let i = 0; i < dataSource.length; i++) {
        const item = dataSource[i];
        if (item.report_type === "Time") {
          item.report_workhours = item.report_amount;
        } else if (item.report_type === "Expense") {
          item.report_expenses = item.report_amount;
        }
      }
      // 请求参数
      let params = {
        date: this.queryParam.date,
        informationJsonData: JSON.stringify(dataSource),
      };
      if (submit) params.submit = "1";
      // 发送保存请求
      postAction(this.url.save, params)
        .then((res) => {
          if (res.status == 200) {
            this.$notify({
              type: "success",
              message: submit ? "提交成功" : "保存成功",
            });
            // 刷新数据
            this.loadData();
          } else {
            this.$notify({
              type: "danger",
              message: submit ? "提交失败" : "保存失败",
            });
            console.error(res);
          }
        })
        .finally(() => {});
    },
    /**
     * 提交月报
     */
    handleSubmit() {
      const that = this;
      // 弹出确认对话框
      this.$dialog
        .confirm({
          title: "标题",
          message: `确定要提交${that.queryParam.date}的全部月报吗？`,
          async beforeClose(action, done) {
            // 点击确认按钮时，关闭弹窗
            if (action === "confirm") {
              that.showOverlay = false;
              await that.handleSave(true); // 提交月报
              setTimeout(done, 500); // 关闭弹窗
            } else {
              done(); // 关闭弹窗
            }
          },
        })
        .catch(() => {
          // 点击取消按钮，不做任何操作
        });
    },
    /**
     * 显示菜单
     */
    handleOverlay() {
      this.showOverlay = !this.showOverlay;
      if (this.showOverlay) {
        setTimeout(() => {
          this.showPopover = true;
        }, 500);
      }
    },

    /**
     * 选择日期
     * @param {Date} date 日期对象
     */
    handlePickerConfirm(date) {
      this.value = date.toString();
      this.showPicker = false;
      this.loadData();
    },
    /**
     * 格式化日期字段
     * @param {string} value 日期字符串
     * @returns {string} 格式化后的日期字符串
     */
    fieldFormatter(value) {
      const date = new Date(value);
      this.value = `${date.getFullYear()}-${
        date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      }`;
      return this.value;
    },
    /**
     * 格式化日期选择器
     * @param {string} type 类型
     * @param {number} val 值
     * @returns {string} 格式化后的字符串
     */
    pickerFormatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },

    /**
     * 格式化日期
     * @param {Date} date 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours() + 8; // 北京时间
      const minute = date.getMinutes();
      // 格式化日期
      return `${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      } ${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }`;
    },
    /**
     * 获取项目名称
     * @param {string} projectCode 项目编码
     * @returns {string} 项目名称
     */
    getProjectName(projectCode) {
      if (this.projectList && this.projectList.length > 0) {
        const project = this.projectList.find(
          (item) => item.projectCode === projectCode
        );
        return project ? project.projectName : "";
      }
      return "";
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell-group__title {
    font-size: 10px;
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

  /*&:last-child {
    margin-bottom: 12px;
  }*/

  .van-cell {
    padding: 4px 16px;

    &::after {
      content: unset;
    }
  }

  &-title {
    font-weight: bold;
  }

  &-icon {
    font-size: 18px;
    padding-right: 6px;
    color: goldenrod;
  }

  &-expenses {
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-cell__value {
      font-size: 32px;
      font-weight: bold;
      padding: 6px;

      &::before {
        content: "¥";
        margin-right: 4px;
        font-size: 26px;
        vertical-align: top;
      }
    }
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
  list-style: none;

  display: flex;
  flex-direction: column-reverse;

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

  &-list {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    list-style: none;
    pointer-events: none;
    position: absolute;
    bottom: 100%;

    .menu-button {
      pointer-events: none;
      transform: scale(0);
      pointer-events: auto;
    }

    .menu-button:nth-child(1) {
      transition-delay: 0.05s;
    }
    .menu-button:nth-child(2) {
      transition-delay: 0.1s;
    }
  }

  &.active &-button {
    transform: scale(1);
  }

  &.active &-list {
    pointer-events: unset;
  }

  &.active > li &-button .van-button__content {
    transform: rotate(225deg);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 56px;
    height: 56px;
    z-index: -1;
    background-color: #247bbf;
    border-radius: 999px;
    transition: all 1s ease-in-out;
  }

  &.active::after {
    opacity: 0.8;
    transform: scale(50);
    background-color: #fff;
  }

  &-popover {
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(50, 50, 51, 0.12);

    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: auto;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>