<template>
  <div class="home">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!--
      active-colo: 字体颜色
      inactive-color: 图标颜色
      route: 路由模式
      replace: 路由跳转是否覆盖当前页 默认false
      路由模式下,可以不写 v-model
     -->
    <van-tabbar class="tip" active-color="red" inactive-color="#b4b4bd" route>
      <van-tabbar-item replace to="/home/company">
        <template #icon>
          <i class="iconfont">&#xe63d;</i>
        </template>
        <span class="title">公司</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/question">
        <template #icon>
          <i class="iconfont">&#xe642;</i>
        </template>
        <span class="title">刷题</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/found">
        <template #icon>
          <i class="iconfont">&#xe646;</i>
        </template>
        <span class="title">发现</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/user">
        <template #icon>
          <i class="iconfont">&#xe645;</i>
        </template>
        <span class="title">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.tip {
  width: 375px;
  height: 88px;
  background: #fcfcfc;
  border: 1px solid #edebeb;
  .van-tabbar-item {
    margin-bottom: 38px;
  }
  .iconfont {
    font-size: 29px;
  }
  .title {
    font-size: 14px;
  }
}
</style>
