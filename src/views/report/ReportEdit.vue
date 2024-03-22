<template>
  <div v-if="!date">
    <van-nav-bar
      fixed
      placeholder
      safe-area-inset-top
      title="月报详情"
      left-text="返回"
      left-arrow
      @click-left="() => $router.go(-1)"
    />
    <van-empty image="network" description="抱歉，未找到相关月报数据" />
  </div>

  <div v-else>
    <van-sticky>
      <van-nav-bar
        fixed
        placeholder
        safe-area-inset-top
        :title="`${date} | ${
          !editable ? '查看' : id ? '编辑' : '新增'
        }项目月报`"
        left-text="返回"
        :right-text="editable ? '保存' : ''"
        left-arrow
        @click-left="() => $router.go(-1)"
        @click-right="handleSave"
      />
      <van-field
        center
        readonly
        clickable
        input-align="center"
        name="projectName"
        :value="projectName"
        placeholder="点击选择项目"
        :formatter="handleFormatter"
        @click="showPicker = true"
      >
        <template #right-icon>
          <van-icon name="arrow-down" />
        </template>
      </van-field>

      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          :show-toolbar="editable"
          title="选择项目"
          value-key="projectCode"
          :columns="projectList"
          :readonly="!editable"
          @cancel="showPicker = false"
          @confirm="handleConfirm"
        >
          <template slot="option" slot-scope="option">
            <span style="color: #333">{{ option.projectName }}</span>
          </template>
        </van-picker>
      </van-popup>

      <van-cell>
        <template #default>
          <span>合计工时：</span>
          <span style="color: #333">{{ totalTime }} 小时</span>
        </template>
      </van-cell>

      <van-cell>
        <template #default>
          <span>报销费用：</span>
          <span style="color: #333"
            >{{
              totalExpense.toLocaleString("en-US", {
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
      <van-row v-for="(item, index) in dataList" :key="index">
        <van-col span="16">
          <van-field
            v-model="item.time"
            type="digit"
            placeholder="请输入工时"
            input-align="right"
            :readonly="!editable"
            @input="handleTimeChange(index, $event)"
          >
            <template #label>
              <span :class="{ weekends: item.weekends }">{{
                item.day + "日"
              }}</span>
              <span v-if="item.weekends !== 0" style="color: #f44336"
                >({{
                  dayOfWeek[new Date(`${date}-${item.day - 1}`).getDay()]
                }})</span
              >
            </template>
            <template #right-icon>
              <span>小时</span>
            </template>
          </van-field>
        </van-col>
        <van-col span="8">
          <van-field
            v-model="item.expense"
            type="number"
            placeholder="请输入报销费用"
            input-align="right"
            :readonly="!editable || true"
            @input="handleExpenseChange(index, $event)"
            @click="handleExpenseClick(item)"
          >
            <template #right-icon>
              <span>元</span>
            </template>
          </van-field>
        </van-col>
      </van-row>
      <van-field
        v-model="remarks"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="200"
        placeholder="请输入备注"
        show-word-limit
        :readonly="!editable"
        @input="handleRemarksChange($event)"
      />
    </van-skeleton>
  </div>
</template>

<script>
import { getAction, postAction } from "@/api/manage.js";

export default {
  data() {
    return {
      id: "",
      date: "",
      projectCode: "",
      projectName: "",
      editable: false,
      emptyPage: false,
      showPicker: false,
      loading: false,
      reportList: [], // 月报列表
      projectList: [], // 项目列表
      dayList: [], // 当月日期列表
      dayOfWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      url: {
        save: "/report/saveReportInfo",
        reportList: "/report/reportList",
        projectList: "/project/projectList",
        dayList: "/report/title",
      },
      randomParam: "", // 用于刷新页面
    };
  },
  computed: {
    // 存在的项目编码
    existProjectCodes() {
      return Array.from(
        new Set(this.reportList.map((item) => item.project_code))
      );
    },
    // 日报数据
    dataList: {
      get() {
        // 首先筛选出report_type=Time，并且project_code=this.projectCode的一条记录
        const time = this.reportList.find(
          (item) =>
            item.report_type === "Time" &&
            item.project_code === this.projectCode
        );
        // 再筛选出report_type=Expense，并且project_code=this.projectCode的一条记录

        const expense = this.reportList.find(
          (item) =>
            item.report_type === "Expense" &&
            item.project_code === this.projectCode
        );
        // time和expense中都有day1-day31的记录，合并成一个长度为31的数组，属性包括day, time, expense，若没有则用0填充
        const data = [];
        if (!this.date) return [];
        for (let i = 0; i < this.dayList.length; i++) {
          const day = this.dayList[i].day;
          const field = this.dayList[i].field;
          const weekends = this.dayList[i].flag;
          const timeItem = time && time[day] ? parseInt(time[day]) : 0;
          const expenseItem =
            expense && expense[day] ? parseFloat(expense[day]) : 0.0;
          data.push({
            weekends,
            day: field,
            time: timeItem,
            expense: expenseItem,
          });
        }
        return data;
      },
      // 使用 setter 修改值
      set(value) {
        // 先清空合计值
        this.reportList.forEach((item) => {
          if (
            item.project_code === this.projectCode &&
            item.report_amount !== 0
          ) {
            item.report_amount = 0;
          }
        });
        value.forEach((day) => {
          this.reportList.forEach((item) => {
            if (
              item.report_type === "Time" &&
              item.project_code === this.projectCode
            ) {
              item[`day${day.day}`] = day.time;
              item.report_amount += parseInt(day.time);
            }
            if (
              item.report_type === "Expense" &&
              item.project_code === this.projectCode
            ) {
              item[`day${day.day}`] = day.expense;
              item.report_amount += parseFloat(day.expense);
            }
          });
        });
      },
    },
    // 合计工时
    totalTime() {
      return this.dataList.reduce((acc, cur) => acc + parseInt(cur.time), 0);
    },
    // 合计报销费用
    totalExpense() {
      return this.dataList.reduce(
        (acc, cur) => acc + parseFloat(cur.expense),
        0
      );
    },
    // 备注
    remarks: {
      get() {
        const time = this.reportList.find(
          (item) =>
            item.report_type === "Time" &&
            item.project_code === this.projectCode
        );
        if (time) {
          return time.remarks;
        } else {
          return "";
        }
      },
      set(value) {
        // 先清空合计值
        this.reportList.forEach((item) => {
          if (
            item.report_type === "Time" &&
            item.project_code === this.projectCode
          ) {
            item.remarks = value;
          }
        });
      },
    },
    expenseTotal() {
      return this.$store.state.expenseTotal;
    },
  },
  watch: {
    // 监听$route的变化
    $route(to) {
      const randomParam = to.query.randomParam;
      if (randomParam && randomParam !== this.randomParam) {
        // 设置this.randomParam的新值
        this.randomParam = randomParam;
        // 执行初始化操作
        this.init();
      }
    },
    expenseTotal(payload) {
      if (payload && payload.projectCode === this.projectCode) {
        this.reportList.forEach((item) => {
          if (
            item.report_type === "Expense" &&
            item.project_code === payload.projectCode
          ) {
            item[`day${payload.day}`] = payload.total;
          }
        });
      }
    },
  },
  created() {
    this.randomParam = this.$route.query.randomParam;

    this.init();
  },
  methods: {
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      this.id = this.$route.params.id;
      this.date = this.$route.params.date;
      this.projectCode = this.$route.params.projectCode;
      this.projectName = this.$route.params.projectName;
      this.editable = this.$route.params.editable;
      if (!this.date) {
        this.emptyPage = true;
        return;
      } else {
        this.emptyPage = false;
      }

      await Promise.all([
        this.getDayList(),
        this.getReportList(),
        this.getProjectList(),
      ]);
      this.loading = false;
    },
    /**
     * 获取当月日期列表
     */
    async getDayList() {
      // 发送请求
      const res = await getAction(this.url.dayList, { date: this.date });
      // 处理数据
      if (res.status == 200) {
        this.dayList = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取当月日期列表失败");
        console.error(res);
      }
    },
    /**
     * 获取项目列表
     */
    async getReportList() {
      // 发送请求
      const res = await postAction(this.url.reportList, { date: this.date });
      // 处理数据
      if (res.status == 200) {
        this.reportList = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取月报列表失败");
        console.error(res);
      }
    },
    /**
     * 获取项目列表
     */
    async getProjectList() {
      // 发送请求
      const res = await postAction(this.url.projectList, { date: this.date });
      // 处理数据
      if (res.status == 200) {
        this.projectList = res.dataList;
      } else {
        this.$toast.fail(res.message || "获取项目列表失败");
        console.error(res);
      }
      // 遍历项目列表，若项目编码存在于existProjectCodes中，则将其设置为disabled
      this.projectList.forEach((item) => {
        if (
          item.projectCode !== this.projectCode &&
          this.existProjectCodes.includes(item.projectCode)
        )
          item.disabled = true;
      });
    },
    /**
     * 格式化项目名称
     * @param {string} value 项目名称
     * @returns {string} 项目编码
     */
    handleFormatter(value) {
      // 在projectList中匹配项目名称，返回项目编码
      const project = this.projectList.find(
        (item) => item.projectName === value
      );
      return project ? project.projectCode : "";
    },
    /**
     * 选择项目
     * @param {Object} selected 选择的项目
     * @returns {void}
     */
    handleConfirm(selected) {
      this.projectCode = selected.projectCode;
      this.projectName = selected.projectName;
      this.showPicker = false;
      // 如果id为空，说明是新增，则构建一套reportList空数据
      if (!this.id) {
        const emptyReportData = [
          {
            report_type: "Time",
            report_amount: "0",
            report_sort: 1,
            project_name: this.projectCode,
            project_code: this.projectCode,
          },
          {
            report_type: "Expense",
            report_amount: "0",
            report_sort: 2,
            project_code: this.projectCode,
            project_name: this.projectCode,
          },
        ];
        // 为emptyReportData添加day1-day31的记录
        for (let i = 1; i <= 31; i++) {
          emptyReportData[0][`day${i}`] = "0";
          emptyReportData[1][`day${i}`] = "0.0";
        }
        // 添加进reportList
        this.reportList.push(...emptyReportData);
      }
    },
    /**
     * 处理工时输入框的变化
     * @param {number} index 行索引
     * @param {number} value 输入值
     * @returns {void}
     */
    handleTimeChange(index, value) {
      if (!this.projectCode) {
        this.$toast("请先选择项目！");
      }
      // 更新 dataList 中相应项的 time 属性
      let dataListCopy = [...this.dataList];
      dataListCopy[index].time = value;
      this.dataList = dataListCopy;
    },
    /**
     * 处理报销费用输入框的变化
     * @param {number} index 行索引
     * @param {number} value 输入值
     * @returns {void}
     */
    handleExpenseChange(index, value) {
      if (!this.projectCode) {
        this.$toast("请先选择项目！");
      }
      // 更新 dataList 中相应项的 expense 属性
      let dataListCopy = [...this.dataList];
      dataListCopy[index].expense = value;
      this.dataList = dataListCopy;
    },
    /**
     * 处理报销费用输入框的点击事件
     * @returns {void}
     */
    handleExpenseClick(dayReport) {
      if (!this.projectCode) {
        this.$toast("请先选择项目！");
        return;
      }
      // 跳转到报销详细页面
      this.$router.push({
        name: "reportExpense",
        params: {
          date: this.date,
          projectCode: this.projectCode,
          projectName: this.projectName,
          day: dayReport.day,
          expense: dayReport.expense,
          editable: this.editable,
        },
      });
    },
    /**
     * 处理备注输入框的变化
     * @param {string} value 输入值
     * @returns {void}
     */
    handleRemarksChange(value) {
      this.reportList.forEach((item) => {
        if (
          item.report_type === "Time" &&
          item.project_code === this.projectCode
        ) {
          item.remarks = value;
        }
      });
    },
    /**
     * 保存数据
     * @returns {void}
     */
    handleSave() {
      // 验证数据完整性
      if (!this.date) {
        this.$toast.fail("请先选择月份");
        return;
      }
      if (!this.projectCode) {
        this.$toast.fail("请先选择项目");
        return;
      }
      if (this.totalTime === 0) {
        this.$toast.fail("请填写工时");
        return;
      }
      // 发送保存请求
      postAction(this.url.save, {
        date: this.date,
        informationJsonData: JSON.stringify(this.reportList),
      })
        .then((res) => {
          if (res.status == 200) {
            this.$toast.success("保存成功");
            this.$notify({
              type: "success",
              message: "保存成功",
            });
            // 触发刷新
            this.$store.commit("setRefreshReport", true);
            this.$router.push({ name: "report" });
          } else {
            this.$toast.fail(res.message || "保存失败");
            console.error(res);
          }
        })
        .finally(() => {
          // 关闭弹窗
          // this.showSaveDialog = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.weekends {
  color: #f44336;
}
</style>