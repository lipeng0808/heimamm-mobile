<template>
  <div class="myInfo">
    <hm-nav-bar title="我的资料" path="/home/user" />
    <div class="content">
      <my-cell class="title" title="头像" :value="userInfo.avatar" type="img" />
      <my-cell class="nickname" title="昵称" :value="userInfo.nickname" />
      <my-cell title="性别" :value="genderObj[userInfo.gender]" />
      <my-cell title="地区" :value="ares.city_list[userInfo.area]" />
      <my-cell title="个人简介" :value="userInfo.intro" />
      <van-button class="exit" color="#fff" block @click="exit">
        <span>退出登录</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import myCell from './myCell'
import { mapState } from 'vuex'
import { rmLocal } from '@/utils/local'
// 导入地区
import area from '@/assets/js/area'
export default {
  components: {
    myCell
  },
  data () {
    return {
      genderObj: {
        0: '未知',
        1: '男',
        2: '女'
      },
      ares: area
    }
  },
  methods: {
    // 退出登录
    exit () {
      this.$dialog
        .confirm({
          title: '退出',
          message: '你确定要退出吗?'
        })
        .then(() => {
          // 点击确定
          // 退出删除token
          rmLocal()
          // 修改登录状态信息
          this.$store.commit('setStatus', false)
          // 跳转到登录页
          this.$router.push('/login')
        })
        .catch(() => {
          // 点击取消
        })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    document.querySelector('body').style.backgroundColor = '#f7f4f5'
  },
  beforeDestroy () {
    document.querySelector('body').style.backgroundColor = '#fff'
  }
}
</script>

<style lang="less">
.content {
  padding: 18px @p15;
  background-color: #f7f4f5;
  .title {
    border-radius: 10px;
  }
  .nickname {
    margin-top: 18px;
  }
  .exit {
    margin-top: 18px;
    span {
      color: red;
    }
  }
}
</style>
