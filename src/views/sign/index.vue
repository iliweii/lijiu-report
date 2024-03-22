<template>
  <div>
    <div class="avatar-body">
      <van-image
        round
        width="20vh"
        height="20vh"
        fit="cover"
        :src="getUrl(model.peopleAvatar)"
      >
        <template v-slot:error>{{
          model.peopleName ? model.peopleName[0] : ""
        }}</template>
      </van-image>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="model.peopleName"
        name="姓名"
        label="姓名"
        placeholder="请填写姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
        :disabled="loading || signined"
      />
      <van-cell-group
        title="签到信息"
        v-if="model.id && model.peopleName === userinfo.peopleName"
      >
        <van-cell title="签到时间" :value="model.signinTime" />
        <van-cell title="签到IP" :value="model.createIp" />
        <van-cell title="完善更多信息" is-link :to="{ name: 'signUserinfo' }" />
        <!-- <van-cell title="聊天室" is-link :to="{ name: 'signChatroom' }" /> -->
      </van-cell-group>

      <div
        style="
          padding: 16px;
          width: 100%;
          position: absolute;
          bottom: 0;
          box-sizing: border-box;
        "
      >
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          :disabled="signined"
          loading-text="拼命签到中..."
          ><van-icon name="location-o" />点击签到</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { getAction, postAction } from "@/api/manage.js";

export default {
  name: "SignIndex",
  data() {
    return {
      model: {
        peopleName: "",
      },
      loading: false,
      signined: false,
      userinfo: {},
    };
  },
  mounted() {
    const userinfo = this.$ls.get("SIGN");
    if (userinfo && userinfo.id) {
      // 校验
      this.signined = true;
      this.model = userinfo;
      this.onCheck(userinfo.id);
      this.userinfo = userinfo;
    }
  },
  methods: {
    getUrl(url) {
      return window._CONFIG["domianURL"] + "/common/static/" + url;
    },
    onSubmit() {
      const that = this;
      this.loading = true;
      postAction("/system/people/sign", this.model)
        .then((e) => {
          if (e.success) {
            that.$toast.success(e.message);
            that.$ls.set("SIGN", e.result);
            that.model = e.result;
            that.userinfo = that.$ls.get("SIGN");
            // that.signined = true;
          } else {
            that.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          that.$toast.fail(e.message);
        })
        .finally(() => {
          that.loading = false;
        });
    },
    onCheck(id) {
      const that = this;
      getAction("/system/people/queryById", { id }).then((res) => {
        if (res.success && res.result && res.result.id) {
          that.signined = false;
          that.model = res.result;
          that.$toast.success("您已经签过到了哦");
        } else {
          that.signined = false;
          that.$toast.fail("您的签到已过期，请重新输入姓名签到！");
          that.userinfo = {};
          that.model = { peopleName: that.model.peopleName };
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-body {
  height: 20vh;
  margin: 0 auto;
  text-align: center;
  padding: 2vh;

  /deep/.van-image__error {
    background-color: #eee;
    font-size: 32px;
  }
}
</style>
  