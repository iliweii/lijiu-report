<template>
  <div>
    <van-nav-bar
      title="签到人员管理"
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
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.peopleName"
        :value="item.createTime"
        @click="handleClick(item)"
      />
    </van-list>
  </div>
</template>
  
  <script>
import { getAction, deleteAction } from "@/api/manage.js";

export default {
  name: "AdminPeopleList",
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
      getAction("/system/people/list", { pageSize: 999 }).then((res) => {
        if (res.success) {
          let peopleList = res.result.records;
          that.list = peopleList;
        } else {
          that.$toast.fail("加载失败，请重试");
        }
        // 加载状态结束
        that.loading = false;
        that.finished = true;
      });
    },
    handleClick(item) {
      const that = this;
      this.$dialog
        .confirm({
          title: "提醒",
          message: `确定要删除<b>${item.peopleName}</b>的签到信息吗？<br/>删除后此人不再参与抽奖，需要重新签到。`,
        })
        .then(() => {
          deleteAction("/system/people/delete", {
            id: item.id,
          })
            .then((res) => {
              that.$toast.success(res.message);
              that.onLoad();
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
  