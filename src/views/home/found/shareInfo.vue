<template>
  <div class="shareInfo">
    <hm-nav-bar :path="path" />
    <!-- 文章详情 -->
    <div class="content">
      <h3 class="title">{{ info.title }}</h3>
      <ul class="item">
        <li class="item-time">{{ info.updated_at | formaTime }}</li>
        <li class="iconfont">&#xe644;</li>
        <li class="item-read">{{ info.read }}</li>
        <li class="iconfont">&#xe650;</li>
        <li class="item-star">{{ info.star }}</li>
      </ul>
      <div class="text" v-html="info.content"></div>
    </div>
    <div class="line"></div>
    <!-- 评论内容 -->
    <h4 class="title">
      评论<span>{{ num }}</span>
    </h4>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="load"
    >
      <div class="comment" v-for="(item, index) in list" :key="index">
        <div class="comment-top">
          <img
            v-if="item.author.avatar"
            :src="$baseUrl + item.author.avatar"
            alt=""
          />
          <img v-else src="@/assets/06.jpg" alt="" />
          <div class="top-item">
            <h4 class="item-up">{{ item.author.nickname }}</h4>
            <p class="item-down">{{ item.created_at | formaTime }}</p>
          </div>
          <span>{{ item.star }}</span>
          <i class="iconfont">&#xe650;</i>
        </div>
        <div class="comment-bottom">
          <div class="bottom-up">{{ item.content }}</div>
          <div class="bottom-down" v-if="item.children_comments.length !== 0">
            <p
              class="txt-item"
              v-for="(ele, idx) in item.children_comments"
              :key="idx"
            >
              {{ ele.author }}：<span>{{ ele.content }}</span>
            </p>
          </div>
        </div>
      </div>
    </van-list>
    <!-- 底部搜索栏 -->
    <div class="footer">
      <div class="search">
        我来补充两句
      </div>
      <div class="item">
        <p class="iconfont">&#xe63c;</p>
        <p class="num">323</p>
      </div>
      <div class="item">
        <p class="iconfont">&#xe638;</p>
        <p class="num">345</p>
      </div>
      <div class="item">
        <p class="iconfont">&#xe63e;</p>
        <p class="num">367</p>
      </div>
    </div>
  </div>
</template>

<script>
import { articlesShareId, articlesCommentsId } from '@/api/found'
export default {
  data () {
    return {
      id: this.$route.params.id,
      path: this.$route.query.path,
      info: '', // 文章详情
      loading: false,
      finished: false,
      currPage: 1,
      pageSize: 3,
      list: [],
      num: 0
    }
  },
  async created () {
    const res = await articlesShareId(this.id)
    this.info = res.data
    console.log(res)
  },
  methods: {
    async load () {
      const res = await articlesCommentsId(this.id, {
        start: (this.currPage - 1) * this.pageSize,
        limit: this.pageSize
      })
      this.num = res.data.total
      // 存储数据,通过push追加
      this.list.push(...res.data.list)
      this.currPage++
      // loading
      this.loading = false
      // 判断是否全部加载完成
      if (this.list.length >= res.data.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shareInfo {
  .content {
    padding: 19px 15px;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 25px;
    }
    .item {
      display: flex;
      align-items: center;
      color: #ccc;
      font-size: 12px;
      margin: 9px 0 28px;
      .item-time {
        flex: 1;
      }
      .item-read {
        margin-left: 5px;
        margin-right: 20px;
      }
      .item-star {
        margin-left: 8px;
        margin-right: 6px;
      }
    }
    .text {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      ::v-deep img {
        width: 100%;
      }
    }
  }
  .line {
    width: 100%;
    height: 11px;
    background-color: #f7f4f5;
  }
  h4 .title {
    position: relative;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
    margin-top: 25px;
    padding: 0 15px;
    span {
      position: absolute;
      top: -5px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #b4b4bd;
      line-height: 17px;
      letter-spacing: 0px;
    }
  }
  .comment {
    padding: 30px 15px 0;

    .comment-top {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .top-item {
        flex: 1;
        margin-left: 10px;
        .item-up {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #545671;
          line-height: 17px;
          letter-spacing: 0px;
        }
        .item-down {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 17px;
          letter-spacing: 0px;
          margin-top: 3px;
        }
      }
      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 17px;
        letter-spacing: 0px;
        margin-right: 5px;
      }
      .iconfont {
        font-size: 24px;
        color: #b4b4bd;
      }
    }
    .comment-bottom {
      padding-top: 11px;
      margin-left: 45px;
      padding-bottom: 30px;
    }
    .bottom-up {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 500;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
    }
    .bottom-down {
      margin-top: 15px;
      padding: 15px 20px;
      background-color: #f7f4f5;
      border-radius: 4px;
      .txt-item {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #60627a;
        line-height: 20px;
        letter-spacing: 0px;
        word-wrap: break-word;
        word-break: break-all;
        span {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 400;
          text-align: left;
          color: #7d7e92;
          line-height: 20px;
          letter-spacing: 0px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 15px;
    .search {
      flex: 1;
      width: 189px;
      height: 34px;
      background: #f7f4f5;
      border-radius: 4px;
      line-height: 34px;
      font-size: 14px;
      font-weight: 400;
      color: #b4b4bd;
      padding-left: 10px;
    }
    .item {
      margin-left: 24px;
      color: #b4b4bd;
      .iconfont {
        font-size: 29px;
      }
      .num {
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        line-height: 17px;
        letter-spacing: 0px;
      }
    }
  }
}
</style>
