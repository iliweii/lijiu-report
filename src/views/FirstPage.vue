<template>
  <div>
    <p>尊敬的贵宾您好！</p>
    <p>您已预定【金麟汇•佛跳墙】</p>
    <p>【包间】 二层(深圳厅)</p>
    <p>【时间】1月26周五晚餐</p>
    <p>地址：丰台区马家堡街道马家堡东路71号院立业大厦二层</p>
    <p>【路线】:地铁路线:10号线角门东A出口500米即到</p>
    <p>美食顾问：付群燕</p>
    <p>☎️：15101602302微信同步</p>
    <p>金麟汇佛跳墙餐厅全员恭候您的光临!</p>
    <div style="text-align:center; width: 100%; height: 200px; background-color: #f5f5f5; margin-top: 20px;">
      <lijiu-logo :size="200" background/>
    </div>
    <div style="text-align:center; width: 100%; height: 200px; background-color: dodgerblue; margin-top: 20px;">
      <lijiu-logo :size="100" :white="true" />
    </div>
    
  </div>
</template>

<script>
import LijiuLogo from "@/components/logo/LijiuLogo";
export default {
  name: "FirstPage",
  components: {
    LijiuLogo
  }
};
</script>

<style>
</style>