<template>
  <van-nav-bar
    class="hmNavBar"
    @click-left="$router.push(path)"
    @click-right="clickEven"
  >
    <template #left>
      <i class="iconfont left" v-html="icon">{{ icon }}</i>
    </template>
    <template #title>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template #right>
      <div class="right">
        {{ right }}
      </div>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'hmNavBar',
  // props: ['title', 'path', 'right'],
  props: {
    title: {
      type: String
    },
    path: {
      type: String
    },
    right: {
      type: String
    },
    icon: {
      type: String,
      default: '&#xe637;'
    }
  },
  methods: {
    clickEven () {
      this.$emit('clickRight')
    }
  }
}
</script>

<style lang="less" scoped>
.hmNavBar {
  // 使用 ::v-deep 处理
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  .van-nav-bar {
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
  }
  .left {
    font-size: 44px;
    color: #181a39;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .right {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
