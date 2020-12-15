<template>
  <div class="editInfo">
    <hm-nav-bar
      :title="titleObj[type]"
      path="/home/myInfo"
      :right="right"
      @click-right="editClick"
    />
    <div class="input">
      <van-field type="text" v-model="inputValue" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { auEdit } from '@/api/user.js'

export default {
  name: 'editInfo',
  data () {
    return {
      right: '',
      inputValue: '',
      type: this.$route.query.type,
      titleObj: {
        nickname: '修改昵称',
        intro: '个人简介'
      }
    }
  },
  methods: {
    editClick () {
      //   if (this.right === '') {
      //     return
      //   }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    inputValue (newval) {
      if (newval !== this.userInfo[this.type] && newval !== '') {
        console.log(123)
        this.right = '保存'
      } else {
        this.right = ''
      }
    }
  },
  created () {
    this.inputValue = this.userInfo[this.type]
  },
  mounted () {
    document.querySelector('body').style.backgroundColor = '#f7f4f5'
  },
  beforeDestroy () {
    document.querySelector('body').style.backgroundColor = '#fff'
  }
}
</script>
<style lang="less" scoped>
.editInfo {
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  .input {
    padding: 10px;
  }
}
</style>
