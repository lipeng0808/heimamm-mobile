<template>
  <div class="shareList">
    <hm-nav-bar title="面经分享" path="/home/found" />
    <van-search
      shape="round"
      class="search"
      v-model="inputValue"
      placeholder="请输入搜索内容"
      show-action
      @search="search"
      @cancel="onCancel"
    />
    <div v-if="showlist">
      <van-pull-refresh
        v-model="pull"
        @refresh="refresh"
        success-text="刷新成功"
      >
        <van-list
          v-if="bol"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="load"
        >
          <shartItem v-for="(item, index) in list" :key="index" :info="item" />
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-else class="box">
      <h3 class="title">大家都在搜</h3>
      <van-tag
        @click="tagClick(item)"
        v-for="(item, index) in hotList"
        :key="index"
        class="tag"
        color="#F7F4F5"
        text-color="#545671"
        >{{ item }}</van-tag
      >
      <van-cell class="cell">
        <template #title>
          <div class="title">
            历史搜索
          </div>
        </template>
        <template>
          <div class="clear" @click="clear">
            清空
          </div>
        </template>
      </van-cell>
      <van-tag
        @click="tagClick(item)"
        v-for="(item, index) in localList"
        :key="index"
        class="tag"
        color="#F7F4F5"
        text-color="#545671"
        >{{ item }}</van-tag
      >
    </div>
  </div>
</template>

<script>
import shartItem from './shartItem'
import { articleShare, shareTopSearch } from '@/api/found.js'
import { setLocal, getLocal } from '@/utils/local'
export default {
  name: 'shareList',
  components: {
    shartItem
  },
  data () {
    return {
      showlist: true,
      bol: true,
      inputValue: '',
      list: [],
      pull: false,
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      currPage: 1, // 页码数
      pageSize: 2, // 页码容量
      hotList: [], // 热门搜索标签
      localList: JSON.parse(getLocal('history')) || [] // 历史搜索
      // localList: [] // 历史搜索
    }
  },
  methods: {
    async load () {
      const res = await articleShare({
        start: (this.currPage - 1) * this.pageSize,
        limit: this.pageSize,
        q: this.inputValue
      })
      if (this.inputValue.trim() !== '') {
        res.data.list.forEach(item => {
          const _arr = item.title.split(this.inputValue)
          item.title = _arr.join(
            `<span style="color:red;">${this.inputValue}</span>`
          )
        })
      }
      this.list.push(...res.data.list)
      // 是否处于加载状态
      this.loading = false
      // 滚动出现新的数据
      this.currPage++
      // 下拉刷新
      this.pull = false

      if (this.list.length >= res.data.total) {
        // finished 判断是否加载完成
        this.finished = true
      }
    },
    refresh () {
      this.load()
    },
    // 搜索
    search () {
      // 还原以前的值
      this.list = []
      this.loading = false
      this.finished = false
      this.currPage = 1
      // 静默刷新
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      this.showlist = true
      // 判断输入是否为空
      if (this.inputValue.trim() !== '') {
        this.localList.unshift(this.inputValue)
      }
      // 去重
      this.localList = [...new Set(this.localList)]
      // 限制长度
      this.localList.splice(5)
      // 进行本地存储
      setLocal('history', JSON.stringify(this.localList))
    },
    // 取消
    onCancel () {
      this.showlist = false
      if (this.hotList.length === 0) {
        shareTopSearch().then(res => {
          this.hotList = res.data
        })
      }
    },
    // tag标签点击事件,实现搜索
    tagClick (str) {
      this.inputValue = str
      this.search()
    },
    // 清空
    clear () {
      this.localList = []
      setLocal('history', JSON.stringify(this.localList))
    }
  },
  // 再次进入页面时,回到记录的滚动条位置
  activated () {
    window.scrollTo(0, this.$route.meta.scrollTop)
  }
}
</script>

<style lang="less" scoped>
.shareList {
  .search {
    padding: 10px 15px;
  }
  .box {
    padding: 0 15px;
    h3 {
      margin-top: 30px;
    }
    .tag {
      padding: 8px 11px;
      margin-top: 11px;
      margin-right: 10px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #545671;
      line-height: 17px;
      letter-spacing: 0px;
    }
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
    .cell {
      padding: 0;
      margin-top: 30px;
      .clear {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #545671;
        line-height: 17px;
        letter-spacing: 0px;
      }
    }
    .van-cell::after {
      border-bottom: 0;
    }
  }
}
</style>
