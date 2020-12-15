<template>
  <div class="editInfo">
    <hm-nav-bar
      :title="titleObj[type]"
      :path="path"
      :right="right"
      @clickRight="editClick(type)"
    />
    <div class="input">
      <van-field type="text" v-model="inputValue" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auEdit } from '@/api/user.js'

export default {
  name: 'editInfo',
  data () {
    return {
      path: '/home/myInfo',
      right: '',
      inputValue: '',
      type: this.$route.query.type,
      titleObj: {
        nickname: '修改昵称',
        intro: '个人简介',
        position: '我的岗位'
      }
    }
  },
  methods: {
    editClick (type) {
      if (this.right === '') {
        return
      }
      // 写动态的,用中括号包住
      this.editInfo({ [this.type]: this.inputValue })
    },
    editInfo (obj) {
      this.$toast.loading({
        duration: 0
      })
      auEdit(obj)
        .then(() => {
          this.$toast.success('修改成功')
          //  修改成功后,跳转到相应的页面
          if (this.type === 'position') {
            this.$router.push('/home/user')
          } else {
            this.$router.push('/home/myInfo')
          }
          this.$store.dispatch('revise')
        })
        .catch(() => {})
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    inputValue (newval) {
      if (newval !== this.userInfo[this.type] && newval !== '') {
        this.right = '保存'
      } else {
        this.right = ''
      }
    }
  },
  created () {
    this.inputValue = this.userInfo[this.type]
    // 如果是从user页面进入,也是要返回user页面
    if (this.type === 'position') {
      this.path = '/home/user'
    }
  }
}
</script>
<style lang="less" scoped>
.editInfo {
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  .input {
    padding: 19px 15px;
    .van-field {
      background-color: #f7f4f5;
      border-radius: 5px;
    }
  }
}
</style>
