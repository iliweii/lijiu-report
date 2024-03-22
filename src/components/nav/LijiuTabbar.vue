<template>
  <van-tabbar
    route
    active-color="#247bbf"
    inactive-color="#000"
    placeholder
    safe-area-inset-bottom
  >
    <van-tabbar-item replace to="/report" icon="records-o"
      >填报</van-tabbar-item
    >
    <van-tabbar-item replace to="/mine" icon="user-o">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
::v-deep {
  .van-tabbar {
    box-shadow: 0 -1px 0px 0px #f1f2f3;
  }
}
</style>