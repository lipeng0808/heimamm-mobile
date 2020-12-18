<template>
  <div class="shartItem">
    <h3 class="title">
      {{ info.title }}
    </h3>
    <p class="text van-multi-ellipsis--l2">
      {{ info.content }}
    </p>
    <div class="item">
      <img
        v-if="info.author.avatar"
        class="item-img"
        :src="$baseUrl + info.author.avatar"
        alt=""
      />
      <img v-else class="item-img" src="@/assets/06.jpg" alt="" />
      <span class="item-name">{{ info.author.nickname }}</span>
      <span class="item-time">{{ info.updated_at | formaTime }}</span>
      <i class="iconfont">&#xe65b;</i>
      <span class="item-read">{{ info.read }}</span>
      <i class="iconfont">&#xe638;</i>
      <span class="item-star">{{ info.star }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shartItem',
  props: ['info']
}
</script>

<style lang="less">
.shartItem {
  margin-bottom: 15px;
  padding: 0 15px;
  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 550;
    text-align: left;
    color: #181a39;
    line-height: 23px;
    letter-spacing: 0px;
    padding-top: 15px;
  }
  .text {
    text-indent: 2em;
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #545671;
    line-height: 19px;
    letter-spacing: 0px;
    margin: 12px 0 16px 0;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
    }
    .item-img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .item-name {
      flex: 1;
      margin-left: 8px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #545671;
      line-height: 17px;
      letter-spacing: 0px;
    }
    .item-time {
      margin-right: 20px;
    }
    .item-read {
      margin-right: 23px;
    }
    .item-star {
      margin-right: 10px;
    }
    .iconfont {
      margin-right: 8px;
    }
  }
}
</style>
