<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="聊天室"
        left-text="返回"
        left-arrow
        @click-left="() => this.$router.back()"
      />
    </van-sticky>

    <van-list
      class="chat-body"
      v-model="loading"
      :finished="finished"
      direction="up"
      finished-text="没有更多了"
      ref="chatBody"
      @load="onLoad"
    >
      <van-row
        v-for="item in list.slice().reverse()"
        :key="item.id"
        :class="{ 'chat-item': true, self: item.peopleId === userinfo.id }"
      >
        <van-image
          round
          width="38px"
          height="38px"
          fit="cover"
          :src="getUrl(item.peopleAvatar)"
        >
          <template v-slot:error>{{
            item.nickname ? item.nickname[0] : "匿"
          }}</template>
        </van-image>
        <div class="chat-right">
          <p class="chat-sender">
            {{ item.peopleId === userinfo.id ? "" : item.nickname + " - " }}
            {{ item.createTime }}
          </p>
          <div class="chat-msg">{{ item.content }}</div>
        </div>
      </van-row>
    </van-list>
    <van-row class="chat-bottom">
      <van-col span="2" style="font-size: 28px"
        ><van-icon name="smile-o"
      /></van-col>
      <van-col span="18"
        ><van-field
          v-model="model.content"
          return
          rows="1"
          :autosize="{ maxHeight: 180 }"
          type="textarea"
          autofocus
      /></van-col>
      <van-col span="1"></van-col>
      <van-col span="3">
        <van-button
          type="primary"
          size="small"
          class="send-btn"
          :loading="btnLoading"
          @click="handleSend"
          >发送</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { getAction, postAction } from "@/api/manage.js";

export default {
  name: "SignChatroom",
  data() {
    return {
      userinfo: {},
      model: {},
      btnLoading: false,
      loading: false,
      finished: false,
      list: [],
      ipages: {
        current: 0,
        pages: 0,
        size: 10,
        total: 0,
      },
    };
  },
  mounted() {
    const userinfo = this.$ls.get("SIGN");
    if (userinfo && userinfo.id) {
      this.userinfo = userinfo;
      this.model.peopleId = userinfo.id;
    } else {
      this.$toast.fail("加载失败，未查询到签到信息！");
    }
  },
  methods: {
    getUrl(url) {
      return window._CONFIG["domianURL"] + "/common/static/" + url;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const divElement = this.$refs.chatBody;
        if (divElement) {
          divElement.scrollTop =
            divElement.scrollHeight - divElement.clientHeight;
        }
      });
    },
    onLoad() {
      const that = this;
      getAction("/system/chat/list", { pageNo: this.ipages.current + 1 }).then(
        (res) => {
          if (res.success) {
            if (res.result && res.result.records && res.result.records.length) {
              that.ipages.current = res.result.current;
              that.list.push(...res.result.records);
            } else {
              that.finished = true;
            }

            if (that.ipages.current == 1) {
              that.scrollToBottom();
            }
          }
          this.loading = false;
        }
      );
    },
    handleSend() {
      if (!this.model.content) return;
      this.btnLoading = true;
      const that = this;
      postAction("/system/chat/add", this.model)
        .then((res) => {
          if (res.success) {
            that.model.content = "";
            console.log(res);
          } else {
            that.$toast.fail(res.message);
          }
        })
        .finally(() => {
          that.btnLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.van-image__error {
  background-color: #eee;
  font-size: 16px;
}
/deep/.van-list__finished-text {
  font-size: 11px;
  line-height: 16px;
  color: #ccc;
}

.chat-body {
  padding-bottom: 55px;

  .chat-item {
    display: flex;

    .chat-right {
      max-width: 70vw;
      margin-left: 4px;
      margin-right: 0;
      position: relative;
    }

    .chat-sender {
      font-size: 11px;
      color: #ccc;
      margin: 0;
    }
    .chat-msg {
      background: #fff;
      border-radius: 5px;
      font-size: 14px;
      padding: 6px 12px;
      margin: 2px 0 12px 0;
      box-shadow: rgba(0, 0, 0, 0.03) 0 0 10px 1px;
      white-space: pre-wrap;
      width: auto;
      max-width: 800px;
    }

    &.self {
      flex-direction: row-reverse;
      .chat-right {
        margin-left: 0;
        margin-right: 4px;
      }
      .chat-sender {
        text-align: right;
      }
      .chat-msg {
        background: #94eb6c;
      }
    }
  }
}

.chat-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  background-color: #f7f7f7;
  padding: 5px 0 10px 0;
  border-top: #e8e8e8 1px solid;

  .send-btn {
    margin-bottom: 5px;
    border-radius: 5px;
    height: 24px;
    padding: 1px 10px;
    text-wrap: nowrap;
  }
}
</style>
  