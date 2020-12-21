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
            @click="rmComment(item)"
          />
          <img v-else src="@/assets/06.jpg" alt="" @click="rmComment(item)" />
          <div class="top-item">
            <h4 class="item-up">{{ item.author.nickname }}</h4>
            <p class="item-down">{{ item.created_at | formaTime }}</p>
          </div>
          <span
            class="item-star"
            :class="{ red: gettersStar('starComments', +item.id) }"
            @click="starComments(item)"
          >
            {{ item.star }}
          </span>
          <i
            class="iconfont"
            :class="{ red: gettersStar('starComments', +item.id) }"
            @click="starComments(item)"
          >
            &#xe650;
          </i>
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
      <div class="search" @click="showComment = true">
        我来补充两句
      </div>
      <div
        class="item"
        :class="{ red: gettersStar('collectArticles', +id) }"
        @click="collect"
      >
        <p class="iconfont">&#xe63c;</p>
        <p class="num">{{ info.collect }}</p>
      </div>
      <div
        class="item"
        :class="{ red: gettersStar('starArticles', +id) }"
        @click="star"
      >
        <p class="iconfont">&#xe638;</p>
        <p class="num">{{ info.star }}</p>
      </div>
      <div class="item">
        <p class="iconfont">&#xe63e;</p>
        <p class="num">{{ info.share || 0 }}</p>
      </div>
    </div>
    <!-- 发送评论弹框 -->
    <van-popup v-model="showComment" position="bottom" class="commit-text">
      <van-field
        type="textarea"
        placeholder="我来补充两句"
        v-model="inputText"
        rows="4"
      />
      <div class="sendComment">
        <span v-if="inputText.trim() === ''" class="send">发送</span>
        <span v-else class="send" style="color: red" @click="send">发送</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {
  articlesShareId,
  articlesCommentsId,
  articlesComments,
  articlesCollect,
  articlesStar,
  commentsStar
} from '@/api/found'
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
      list: [], // 评论数组
      num: 0,
      showComment: false, // 是否显示评论弹框
      inputText: '', // 弹框内容
      parent: '', // 评论id
      parentObj: ''
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
    },
    // 发表评论
    async send () {
      const res = await articlesComments({
        content: this.inputText,
        article: this.id,
        parent: this.parent
      })
      if (this.parent !== '') {
        this.parentObj.children_comments.push(res.data)
      } else {
        // 添加star字段
        res.data.star = 0
        // 添加到评论数组
        this.list.unshift(res.data)
      }
      // 关闭窗口
      this.showComment = false
    },
    // 回复评论
    rmComment (item) {
      // 存储评论id
      this.parent = item.id
      // 存储对象
      this.parentObj = item
      // 打开窗口
      this.showComment = true
    },
    // 文章收藏
    async collect () {
      const res = await articlesCollect({ id: this.id })
      if (res.data.list.includes(+this.id)) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.fail('取消收藏')
      }
      console.log(res)
      // 更新收藏总数
      this.info.collect = res.data.num
      this.$store.dispatch('revise')
    },
    // 文章点赞
    async star () {
      const res = await articlesStar({ article: this.id })
      if (res.data.list.includes(+this.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.fail('取消点赞')
      }
      // 更新点赞总数
      this.info.star = res.data.num
      this.$store.dispatch('revise')
    },
    // 评论点赞
    async starComments (item) {
      const res = await commentsStar({ id: item.id })
      if (res.data.list.includes(+item.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.fail('取消点赞')
      }
      console.log(res)
      // 更新点赞总数
      item.star = res.data.num
      this.$store.dispatch('revise')
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['gettersStar'])
  },
  watch: {
    showComment (newVal) {
      if (!newVal) {
        this.parent = ''
        this.inputText = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.red {
  color: red !important ;
}
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
  .commit-text {
    padding: 25px 15px 20px;
    .van-field {
      background-color: #f7f4f5;
    }
    .sendComment {
      text-align: right;
      padding-top: 11px;
      .send {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 23px;
        letter-spacing: 0px;
      }
    }
  }
}
</style>
