<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont left">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="content">
      <h3 class="title">你好, 请登录</h3>
      <van-form ref="form">
        <van-field
          name="mobile"
          v-model="form.mobile"
          placeholder="请输入手机号"
          :rules="rules.mobile"
          ><template #left-icon>
            <i class="iconfont">&#xe60b;</i>
          </template>
        </van-field>
        <van-field
          v-model="form.code"
          placeholder="请输入验证码"
          :rules="rules.code"
          ><template #left-icon>
            <i class="iconfont">&#xe60c;</i>
          </template>
          <template #button>
            <span class="code" @click="getCode" v-if="totalTime === 30">
              获取验证码
            </span>
            <span class="code" v-else>{{ totalTime }}S后重试</span>
          </template>
        </van-field>
        <div class="tip">
          登录即同意 <span>《用户使用协议》</span> 和 <span>《隐私协议》</span>
        </div>
      </van-form>
      <van-button class="btn" block round color="#e40137" @click="submit"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
// 导入axios请求方法
import { auCode, auLogin } from '@/api/login.js'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      totalTime: 30, // 时间
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' },
          {
            validator: valid => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                valid
              )
            },
            message: '手机号不合法',
            trigger: 'onblur'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    getCode () {
      this.$refs.form
        .validate('mobile')
        .then(() => {
          // 倒计时处理
          this.totalTime--
          const timeout = setInterval(() => {
            this.totalTime--
            if (this.totalTime <= 0) {
              // 清除定时器
              clearInterval(timeout)
              // 还原事件
              this.totalTime = 30
            }
          }, 1000)

          // 使用传进来的login.js模块
          auCode({ mobile: this.form.mobile })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$toast.fail('验证失败')
        })
    },
    // 点击登录
    submit () {
      this.$refs.form
        .validate()
        .then(() => {
          auLogin({ data: this.form })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$toast.fail('登录失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped: 只管当前页面和子组件的最外层()
//   原理: 加了scoped,会自动添加一些属性选择器,所以只能设置有属性选择器的样式
//   解决: 在需要修改的css属性前面加上 ::v-deep  例: ::v-deep .left{}
.login {
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
    margin: 50px 0 63px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .content {
    padding: 0 @p15;

    .code {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00b8d4;
      line-height: 23px;
      letter-spacing: 0px;
    }
    .tip {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      line-height: 17px;
      letter-spacing: 0px;
      margin: 15px 0 44px;
      span {
        color: #00b8d4;
      }
    }
  }
}
</style>
//
<style lang="less">
// .van-nav-bar__left {
//   padding: 0;
// }
//
</style>
