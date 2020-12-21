<template>
  <div class="home">
    <!-- 路由出口 -->
    <!-- keep-alive:  缓存组件
         name="name值"
         include属性: 设置指定组件缓存
     -->
    <keep-alive include="found">
      <router-view></router-view>
    </keep-alive>
    <!--
      active-colo: 字体颜色
      inactive-color: 图标颜色
      route: 路由模式
      replace: 路由跳转是否覆盖当前页 默认false
      路由模式下,可以不写 v-model
      placeholder: 生成一个等高的占位空间
     -->
    <van-tabbar
      v-if="$route.meta.needTab"
      class="tip"
      active-color="red"
      inactive-color="#b4b4bd"
      route
      placeholder
    >
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
      <van-tabbar-item to="/home/found">
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
  },
  methods: {},
  created () {}
}
</script>

<style lang="less" scoped></style>
