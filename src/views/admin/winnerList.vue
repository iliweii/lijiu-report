<template>
  <div>
    <van-nav-bar
      title="获奖者名单"
      left-text="返回"
      left-arrow
      @click-left="() => this.$router.back()"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group
        v-for="(item, index) in list"
        :key="item.id"
        :title="`第${index + 1}位获奖者`"
      >
        <van-cell :title="item.processRemark" :value="item.createTime" />
      </van-cell-group>
    </van-list>
  </div>
</template>
  
  <script>
import { getAction } from "@/api/manage.js";

export default {
  name: "AdminWinnerList",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
    };
  },
  mounted() {
    let admin = this.$ls.get("ADMIN");
    if (!admin) {
      this.$router.push({ name: "adminLogin" });
    }
  },
  methods: {
    onLoad() {
      const that = this;
      getAction("/system/process/list", { pageSize: 999 }).then((res) => {
        if (res.success) {
          let processList = res.result.records;
          that.list = processList;
        } else {
          that.$toast.fail("加载失败，请重试");
        }
        // 加载状态结束
        that.loading = false;
        that.finished = true;
      });
    },
  },
};
</script>
  