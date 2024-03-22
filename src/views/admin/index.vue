<template>
  <div>
    <van-nav-bar
      title="程序后台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group title="当前签到信息">
      <van-cell title="总签到人数" :value="model.total" />
      <van-cell title="签到人员管理" is-link :to="{ name: 'adminPeopleList' }">
        <template #title>
          <van-icon name="friends-o" />
          <span class="custom-title">签到人员管理</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="当前抽奖信息">
      <van-cell title="已中奖人数" :value="model.winnerNum" />
      <van-cell title="未中奖人数" :value="model.noNum" />
      <van-cell title="获奖者名单" is-link :to="{ name: 'adminWinnerList' }">
        <template #title>
          <van-icon name="medal-o" />
          <span class="custom-title">获奖者名单</span>
        </template>
      </van-cell>
      <!-- <van-cell title="进入抽奖页面" is-link :to="{ name: 'adminLottery' }">
        <template #title>
          <van-icon name="gift-o" />
          <span class="custom-title">进入抽奖页面</span>
        </template>
      </van-cell> -->
      <van-cell title="进入抽奖页面" is-link :to="{ name: 'adminLottery2' }">
        <template #title>
          <van-icon name="gem-o" />
          <span class="custom-title">进入抽奖页面</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="快捷操作">
      <van-button
        round
        block
        plain
        type="warning"
        style="margin-top: 12px"
        @click="handleClearProcess"
        >重置抽奖</van-button
      >
      <van-button
        round
        block
        plain
        type="danger"
        style="margin-top: 12px"
        @click="handleClearPeople"
        >清空签到信息</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import { getAction, deleteAction } from "@/api/manage.js";

export default {
  name: "AdminIndex",
  data() {
    return {
      model: {
        total: "",
        winnerNum: "",
        noNum: "",
      },
      loading: false,
    };
  },
  mounted() {
    let admin = this.$ls.get("ADMIN");
    if (!admin) {
      this.$router.replace({ name: "adminLogin" });
    }
    this.init();
  },
  methods: {
    onClickLeft() {
      this.$ls.remove("ADMIN");
      this.$router.push({ name: "adminLogin" });
    },
    init() {
      const that = this;
      getAction("/system/process/getNow").then((res) => {
        if (res.success) {
          that.model = res.result;
        }
      });
    },
    handleClearProcess() {
      const that = this;
      this.$dialog
        .confirm({
          title: "警告",
          message: `确定要清空所有中奖信息吗？<br/>清空后数据不可恢复。`,
        })
        .then(() => {
          deleteAction("/system/process/deleteBatch", {})
            .then(() => {
              that.$toast.success("清空信息成功！");
              that.init();
            })
            .catch((res) => {
              that.$toast.fail(res.message);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    handleClearPeople() {
      const that = this;
      this.$dialog
        .confirm({
          title: "警告",
          message: `确定要清空所有签到信息吗？<br/>清空后数据不可恢复。`,
        })
        .then(() => {
          deleteAction("/system/people/deleteBatch", {})
            .then(() => {
              that.$toast.success("清空信息成功！");
              that.init();
            })
            .catch((res) => {
              that.$toast.fail(res.message);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
