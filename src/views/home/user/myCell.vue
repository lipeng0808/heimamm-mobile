<template>
  <!-- van-cell
   title: 左边文本
   value: 右边文本
   is-link: 右边小剪头
   icon: vant自带图标
   center:true: 上下居中对齐
   slot="title/default/icon/right-icon"
   -->
  <van-cell is-link center class="myCell">
    <template #title>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template #icon>
      <i class="iconfont" v-html="icon"></i>
    </template>
    <template>
      <div class="post">
        {{ value }}
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['title', 'icon', 'value']
}
</script>
<style lang="less" scoped>
.myCell {
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
    padding-left: 12px;
  }
  .post {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
