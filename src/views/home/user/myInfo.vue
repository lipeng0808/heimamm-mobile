<template>
  <div class="myInfo">
    <hm-nav-bar title="我的资料" path="/home/user" />
    <div class="content">
      <my-cell
        class="title"
        title="头像"
        :value="userInfo.avatar"
        type="img"
        @click.native="edit('avatar')"
      />
      <my-cell
        class="nickname"
        title="昵称"
        :value="userInfo.nickname"
        @click.native="edit('nickname')"
      />
      <my-cell
        title="性别"
        :value="genderObj[userInfo.gender]"
        @click.native="show = true"
      />
      <my-cell
        title="地区"
        :value="area.city_list[userInfo.area]"
        @click.native="showArea = true"
      />
      <my-cell
        title="个人简介"
        :value="userInfo.intro"
        @click.native="edit('intro')"
      />
      <van-button class="exit" color="#fff" block @click="exit">
        <span>退出登录</span>
      </van-button>
    </div>
    <!-- 性别弹框 -->
    <van-popup v-model="show" position="bottom">
      <van-picker
        title="性别"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="Object.values(genderObj)"
        @confirm="confirmSex"
        @cancel="show = false"
      />
    </van-popup>
    <!-- 地区弹框 -->
    <van-popup v-model="showArea" position="bottom">
      <van-area
        title="地区选择"
        :area-list="area"
        :value="userInfo.area"
        columns-num="2"
        @cancel="showArea = false"
        @confirm="confirmArea"
      />
    </van-popup>
  </div>
</template>

<script>
import myCell from './myCell'
import { mapState } from 'vuex'
import { rmLocal } from '@/utils/local'
import { auEdit } from '@/api/user.js'
// 导入地区
import area from '@/assets/js/area.js'
export default {
  name: 'myInfo',
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
      area: area,
      showArea: false,
      show: false
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
    },
    // 点击修改昵称
    edit (str) {
      this.$router.push('/home/editInfo?type=' + str)
    },
    // 性别确定按钮
    confirmSex (value, index) {
      this.show = false
      this.editInfo({ gender: index })
    },
    // 地区选择按钮
    confirmArea (value, index) {
      this.showArea = false
      this.editInfo({ area: value[1].code })
    },
    // 修改用户信息
    editInfo (obj) {
      this.$toast.loading({
        duration: 0
      })
      auEdit(obj)
        .then(() => {
          this.$toast.success('修改成功')
          this.$store.dispatch('revise')
        })
        .catch(() => {})
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
