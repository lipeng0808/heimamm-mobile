<template>
  <div class="shareList">
    <hm-nav-bar title="面经分享" path="/home/found" />
    <van-search
      shape="round"
      class="search"
      v-model="inputValue"
      placeholder="请输入搜索内容"
      show-action
      @cencle="cencell"
      @search="search"
    />
    <van-pull-refresh v-model="pull" @refresh="refresh" success-text="刷新成功">
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
</template>

<script>
import shartItem from './shartItem'
import { articleShare } from '@/api/found.js'

export default {
  components: {
    shartItem
  },
  data () {
    return {
      bol: true,
      inputValue: '',
      list: [],
      pull: false,
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      currPage: 1, // 页码数
      pageSize: 2 // 页码容量
    }
  },
  methods: {
    async load () {
      const res = await articleShare({
        start: (this.currPage - 1) * this.pageSize,
        limit: this.pageSize,
        q: this.inputValue
      })
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
    cencell () {
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
    },
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
    }
  }
}
</script>

<style lang="less">
.shareList {
  .search {
    padding: 10px 15px;
  }
}
</style>
