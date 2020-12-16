<template>
  <div class="technicIten">
    <div class="left">
      <div class="left-title van-multi-ellipsis--l2">
        {{ info.title }}
      </div>
      <div>
        <ul class="left-tip">
          <li>{{ info.updated_at | formaTime }}</li>
          <li><i class="iconfont">&#xe644;</i></li>
          <li>{{ info.read }}</li>
          <li><i class="iconfont">&#xe638;</i></li>
          <li>{{ info.star }}</li>
        </ul>
      </div>
    </div>
    <img v-if="info.cover" class="right" :src="$baseUrl + info.cover" />
  </div>
</template>

<script>
export default {
  props: ['info'],
  data () {
    return {}
  }
  // created () {
  //   console.log(moment())
  // }
  // 过滤器
  // filters: {
  //   formaTime (str) {
  //     const a = moment()
  //     const b = moment(str)
  //     const _diff = a.diff(b, 'h')

  //     if (_diff <= 1) {
  //       return '刚刚'
  //     } else if (_diff < 24) {
  //       return _diff + '小时前'
  //     } else {
  //       return moment(str).format('YYYY/MM/DD HH:mm:ss')
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.technicIten {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    // 改变主轴方向,在靠边对齐
    flex-direction: column;
    justify-content: space-between;
    .left-title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 550;
      text-align: left;
      color: #181a39;
      line-height: 23px;
      letter-spacing: 0px;
    }
    .left-tip {
      display: flex;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
      li:nth-child(1) {
        flex: 1;
      }
      li:nth-child(3) {
        margin-right: 23px;
      }
    }
  }
  .right {
    width: 113px;
    height: 75px;
    object-fit: cover;
    margin-left: 15px;
  }
}
</style>
