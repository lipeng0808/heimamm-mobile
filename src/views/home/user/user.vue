<template>
  <div class="user">
    <div class="top">
      <div class="top-user">
        <div class="left">
          <h3 class="name">{{ userInfo.nickname }}</h3>
          <span>{{ userInfo.intro }}</span>
        </div>
        <div class="right" @click="goInfo">
          <img v-if="userInfo.avatar" :src="baseURL + userInfo.avatar" />
          <img v-else src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <div class="top-item">
        <ul>
          <li>
            <h3>{{ userInfo.submitNum }}</h3>
            <span>累计答题</span>
          </li>
          <li>
            <h3>{{ userInfo.correctQuestions.length }}</h3>
            <span>收藏题目</span>
          </li>
          <li>
            <h3>{{ userInfo.errorNum }}</h3>
            <span>我的错题</span>
          </li>
          <li>
            <h3>293</h3>
            <span>正确率</span>
          </li>
        </ul>
      </div>
      <div class="top-tip">
        <my-cell
          class="mycell"
          title="我的岗位"
          :value="userInfo.position"
          icon="&#xe64d;"
        />
      </div>
    </div>
    <div class="content">
      <div class="middle">
        <h3 class="middle-title">面经数据</h3>
        <ul class="middle-list">
          <li class="list-item">
            <div class="item-top">
              昨日阅读<span>+{{ userInfo.shareData.read.yesterday }}</span>
            </div>
            <div class="item-center">{{ userInfo.shareData.read.total }}</div>
            <div class="item-bottom">阅读总数</div>
          </li>
          <li class="list-item">
            <div class="item-top">
              昨日获赞<span>+{{ userInfo.shareData.comment.yesterday }}</span>
            </div>
            <div class="item-center">
              {{ userInfo.shareData.comment.total }}
            </div>
            <div class="item-bottom">获赞总数</div>
          </li>
          <li class="list-item">
            <div class="item-top">
              昨日新增<span>+{{ userInfo.shareData.star.yesterday }}</span>
            </div>
            <div class="item-center">{{ userInfo.shareData.star.total }}</div>
            <div class="item-bottom">评论总数</div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <my-cell title="我的面经分享" value="21" icon="&#xe655;" />
        <my-cell
          title="我的消息"
          :value="userInfo.systemMessages"
          icon="&#xe656;"
        />
        <my-cell
          title="收藏题库"
          :value="userInfo.correctQuestions.length"
          icon="&#xe654;"
        />
        <my-cell title="收藏企业" value="32" icon="&#xe648;" />
        <my-cell
          title="我的错题"
          :value="userInfo.collectQuestions.length"
          icon="&#xe64f;"
        />
        <my-cell
          title="收藏的面试经验"
          :value="userInfo.collectArticles.length"
          icon="&#xe611;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyCell from './myCell'
// 导如mapState方法
import { mapState } from 'vuex'
export default {
  components: {
    MyCell
  },
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  },
  // 计算属性
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  methods: {
    goInfo () {
      this.$router.push('/home/myInfo')
    }
  }
  // created () {
  //   console.log(this.userInfo)
  // }
}
</script>

<style lang="less">
.user {
  .top {
    height: 216px;
    width: 100%;
    padding: 0 @p15;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    position: relative;
    .top-user {
      height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 31px 0;
      .left {
        .name {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 30px;
          letter-spacing: 0px;
        }
        span {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
      .right {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.38);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .top-item {
      margin-top: 50px;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          h3 {
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            text-align: center;
            color: #ffffff;
            line-height: 24px;
            letter-spacing: 0px;
          }
          span {
            opacity: 0.7;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 17px;
            letter-spacing: 0px;
          }
        }
      }
    }
    .top-tip {
      position: absolute;
      left: 0;
      bottom: -16px;
      width: 100%;
      padding: 0 @p15;

      .mycell {
        border-radius: 8px;
      }
    }
  }
  .content {
    padding: 27px @p15 0;
    background-color: #f7f4f5;
    margin-bottom: 10px;

    .middle {
      background-color: #fff;
      padding: 19px 15px;
      .middle-title {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #181a39;
        line-height: 20px;
        letter-spacing: 0px;
        margin-bottom: 17px;
      }
      .middle-list {
        display: flex;
        justify-content: space-between;
        .list-item {
          .item-top {
            font-size: 10px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #b4b4bd;
            line-height: 14px;
            letter-spacing: 0px;
            span {
              color: #00b8d4;
            }
          }
          .item-center {
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            text-align: center;
            color: #181a39;
            line-height: 24px;
            letter-spacing: 0px;
            margin: 10px 0 6px;
          }
          .item-bottom {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #545671;
            line-height: 17px;
            letter-spacing: 0px;
          }
        }
      }
    }
    .bottom {
      margin: 10px 0;
    }
  }
}
</style>
