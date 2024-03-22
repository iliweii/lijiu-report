<template>
  <div id="app">
    <!-- 使用 keep-alive 组件包裹需要保持存活的页面组件 -->
    <keep-alive>
      <router-view v-if="isKeepAlive"></router-view>
    </keep-alive>
    <!-- 显示非缓存的页面组件 -->
    <router-view v-if="!isKeepAlive"></router-view>
    <!-- 显示 Tabbar 组件 -->
    <Tabbar v-if="showTabbar" />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    Tabbar: () => import("./components/nav/LijiuTabbar.vue"),
  },
  computed: {
    // 判断当前路由是否是登录页面
    showTabbar() {
      return this.$route.meta.tabbar;
    },
    isKeepAlive() {
      return this.$route.meta.keepAlive;
    },
  },
};
</script>
<style lang="scss">
#app {
  height: 100vh;
  overflow-y: auto;
  background: #f7f8fa;
}
</style>
