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
      <img
        class="img"
        v-if="type === 'img' && value"
        :src="baseUrl + value"
        alt=""
      />
      <img
        class="img"
        v-else-if="type === 'img' && !value"
        src="@/assets/06.jpg"
        alt=""
      />
      <div v-else class="value">
        {{ value }}
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'myCell',
  props: ['title', 'icon', 'value', 'type'],
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  }
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
  .value {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
