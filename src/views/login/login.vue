<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont left">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="conter">
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
            <span class="code" @click="getCode">获取验证码</span>
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
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不合法', trigger: 'onBlur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    getCode () {},
    // 点击登录
    submit () {}
  }
}
</script>

<style lang="less">
.login {
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
  .conter {
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
