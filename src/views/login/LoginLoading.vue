<template>
  <hevu-loading
    :loadingning="true"
    :fixed="true"
    backgroundColor="#247bbf"
    textColor="#fff"
    :textSize="30"
    loadingIconColor="#fff"
    :size="120"
    loadingText="拼命加载中..."
    type="loading11"
  >
  </hevu-loading>
</template>

<script>
import { getCookie } from "@/utils/cookie.js";
import hevuLoading from "@/components/hevu-loading/hevu-loading.vue";

export default {
  components: {
    hevuLoading,
  },
  created() {
    const token = getCookie("X-Token");
    if (token) {
      this.$router.push({ name: "report" });
    } else {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style scoped lang="scss">
</style>