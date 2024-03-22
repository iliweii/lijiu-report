<template>
  <div>
    <van-nav-bar
      title="完善更多信息"
      left-text="返回"
      left-arrow
      @click-left="() => this.$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="model.peopleName"
        name="姓名"
        label="姓名"
        placeholder="请填写姓名"
        :disabled="true"
      />
      <van-field
        v-model="model.signinRemark"
        name="昵称"
        label="昵称"
        placeholder="请填写昵称"
        :maxlength="10"
      />
      <van-field
        v-model="model.phone"
        name="手机号"
        label="手机号"
        placeholder="请填写手机号"
        :maxlength="16"
      />
      <van-field
        v-model="model.email"
        name="邮箱"
        label="邮箱"
        placeholder="请填写邮箱"
        :maxlength="50"
      />
      <van-cell title="头像">
        <template #default>
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            :max-count="1"
            :max-size="2000 * 1024"
            @oversize="onOversize"
          />
        </template>
      </van-cell>
      <van-field
        v-model="model.peopleAvatar"
        name="头像地址"
        label="头像地址"
        disabled
      />

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
          loading-text="提交中..."
          >保存</van-button
        >
      </div>
    </van-form>
  </div>
</template>
  
  <script>
// import { mapState } from "vuex";
import { getAction, putAction, uploadAction } from "@/api/manage.js";

export default {
  name: "SignUserinfo",
  data() {
    return {
      model: {
        peopleName: "",
      },
      loading: false,
      signined: false,
      fileList: [],
    };
  },
  mounted() {
    const userinfo = this.$ls.get("SIGN");
    if (userinfo && userinfo.id) {
      this.model = userinfo;
      this.init(userinfo.id);

      if (userinfo.peopleAvatar) {
        this.fileList.push({
          url:
            window._CONFIG["domianURL"] +
            "/common/static/" +
            userinfo.peopleAvatar,
        });
      }
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const that = this;
      uploadAction("/common/upload", { file: file.file, biz: "avatar" })
        .then((res) => {
          if (res.success) {
            that.$toast.success("上传成功！");
            that.model.peopleAvatar = res.message;
          } else {
            that.$toast.fail(res.message);
          }
        })
        .catch((err) => {
          that.$toast.fail(err.message);
        });
    },
    onOversize(file) {
      console.log(file);
      this.$toast.fail("文件大小不能超过 2Mb");
    },
    onSubmit() {
      const that = this;
      this.loading = true;
      putAction("/system/people/edit", this.model)
        .then((e) => {
          if (e.success) {
            that.$toast.success(e.message);
            that.$ls.set("SIGN", e.result);
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
    init(id) {
      const that = this;
      getAction("/system/people/queryById", { id }).then((res) => {
        if (res.success && res.result && res.result.id) {
          that.model = res.result;
        }
      });
    },
  },
};
</script>
  
  <style scoped lang="scss">
</style>
    