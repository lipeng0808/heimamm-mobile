<template>
  <div class="editInfo">
    <hm-nav-bar
      :title="titleObj[type]"
      :path="path"
      :right="right"
      @clickRight="editClick(type)"
    />
    <div class="input">
      <van-field v-if="type !== 'avatar'" type="text" v-model="inputValue" />
      <van-uploader
        v-else
        v-model="list"
        :after-read="afterRead"
        :before-read="beforeRead"
        :max-count="1"
        @delete="delEven"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auEdit, upload } from '@/api/user.js'

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
        position: '我的岗位',
        avatar: '头像上传'
      },
      list: []
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
          this.$router.push(this.path)
          this.$store.dispatch('revise')
        })
        .catch(() => {})
    },
    // 图片上传前,设置图片规格
    beforeRead (file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLimit2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$toast.fail('请上传JPG/PNG格式的图片')
      }
      if (!isLimit2M) {
        this.$toast.fail('请上传小于2M的图片')
      }
      return isImg && isLimit2M
    },
    // 将通过的文件上传到服务器
    afterRead (res) {
      // 转换为formData格式上传
      const _formData = new FormData()
      _formData.append('files', res.file)
      this.$toast.loading()
      upload(_formData).then(res => {
        this.$toast.success('上传成功')
        this.inputValue = res.data[0].id
        console.log(res)
      })
    },
    // 图片上传时,删除事件
    delEven () {
      this.inputValue = ''
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
    // 如果图片上传前有原图片
    if (this.userInfo.avatar) {
      this.list[0] = { url: process.env.VUE_APP_URL + this.userInfo.avatar }
    }
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
    text-align: center;
    .van-field {
      background-color: #f7f4f5;
      border-radius: 5px;
    }
  }
}
</style>
