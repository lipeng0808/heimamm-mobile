<template>
  <div class="found">
    <hm-nav-bar title="发现" icon="" />
    <van-pull-refresh
      v-model="loading"
      @refresh="refresh"
      success-text="刷新成功"
    >
      <div>
        <div class="content">
          <found-cell title="面试技巧" />
          <technicItem
            v-for="(item, index) in technicList"
            :key="index"
            :info="item"
          />
        </div>
        <div class="line"></div>
        <div class="content">
          <found-cell title="市场数据" class="data" />
          <div class="data-item">
            <van-tag class="city" color="#eceaea" text-color="#545671">{{
              chartDataObj.city
            }}</van-tag>
            <van-tag class="position" color="#eceaea" text-color="#545671">
              {{ chartDataObj.position }}
            </van-tag>
            <ul ref="dataList" class="dataList">
              <template v-for="(item, index) in chartDataObj.yearSalary">
                <li v-if="index <= show" :key="index">
                  <span class="year">{{ item.year.substr(0, 5) }}</span>
                  <div class="salary">
                    <span
                      :style="{
                        width:
                          (item.salary / chartDataObj.topSalary) * 100 + '%'
                      }"
                      >¥{{ item.salary }}</span
                    >
                  </div>
                  <i
                    class="iconfont"
                    style="color: #fe6d67"
                    v-if="item.percent < 0"
                    >&#xe64e;
                  </i>
                  <i
                    class="iconfont"
                    style="color: #00d47a"
                    v-else-if="item.percent >= 0"
                    >&#xe651;</i
                  >
                  <i class="iconfont" style="color: #FFF" v-else>&#xe651;</i>
                  <span v-if="item.percent !== undefined" class="percent"
                    >{{ item.percent }}%</span
                  >
                  <span v-else class="percent" style="color: #FFF"></span>
                </li>
              </template>
            </ul>
            <div class="tip" @click="doClick">
              <span v-if="show === 2">
                展开更多<i class="iconfont">&#xe652;</i>
              </span>
              <span v-else>
                收起<i :class="{ iconfont: true, active: true }">&#xe652;</i>
              </span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="content">
          <found-cell
            class="shart"
            title="面经分享"
            @click.native="$router.push('/home/shareList')"
          />
          <shartItem
            v-for="(item, index) in shareList"
            :key="index"
            :info="item"
          />
        </div>
        <div class="bottom">
          <van-divider
            :style="{
              color: '#B4B4BD',
              borderColor: '#ccc',
              padding: '0 46px'
            }"
          >
            到底了
          </van-divider>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import hmNavBar from '@/components/hmNavBar.vue'
import foundCell from './foundCell'
import technicItem from './technicItem'
import shartItem from './shartItem'
import { technic, chartDataHot, articleShare } from '@/api/found.js'
export default {
  name: 'found',
  components: { hmNavBar, foundCell, technicItem, shartItem },
  data () {
    return {
      technicList: [],
      chartDataObj: {},
      shareList: [],
      limit: 5,
      show: 2,
      loading: false
    }
  },
  methods: {
    // 展开与收起
    doClick () {
      if (this.show === 2) {
        this.$nextTick(() => {
          this.show = 6
          this.$refs.dataList.style.height = 265 + 'px'
        })
      } else {
        this.$nextTick(() => {
          this.show = 2
          this.$refs.dataList.style.height = 125 + 'px'
        })
      }
    },
    // 下拉刷新页面
    async refresh () {
      // 让三个接口同时调用,用promise.all处理
      Promise.all([
        technic(),
        chartDataHot(),
        articleShare({ params: this.limit })
      ]).then(res => {
        // 面试技巧
        const res1 = res[0]
        this.technicList = res1.data.list
        // 市场数据
        const res2 = res[1]
        res2.data.yearSalary.reverse()
        this.chartDataObj = res2.data
        // 面经分享
        const res3 = res[2]
        this.shareList = res3.data.list
        // 刷新完成要将v-model的值变成false
        this.loading = false
      })
      // // 面试技巧
      // technic().then(res => {
      //   this.technicList = res.data.list
      // })
      // // 市场数据
      // chartDataHot().then(res => {
      //   res.data.yearSalary.reverse()
      //   this.chartDataObj = res.data
      // })
      // // 面经分享
      // articleShare({ params: this.limit }).then(res => {
      //   this.shareList = res.data.list
      // })
    }
  },
  created () {
    // 调用下拉刷新方法获取数据
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.active {
  display: inline-block;
  transform: rotate(180deg);
}
.found {
  .line {
    height: 10px;
    background-color: #f7f4f5;
  }
  .data {
    margin: 25px 0;
  }
  .data-item {
    padding: 0 15px;
    .city {
      padding: 0 10px;
      height: 24px;
      border-radius: 4px;
      font-size: 14px;
      margin-right: 10px;
    }
    .position {
      padding: 0 10px;
      height: 24px;
      border-radius: 4px;
      font-size: 14px;
    }
    .dataList {
      height: 125px;
      transition: all 0.5s;
      margin-top: 12px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        span {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          line-height: 20px;
          letter-spacing: 0px;
        }
        .salary {
          flex: 1;
          height: 12px;
          border-radius: 10px;
          margin-right: 14px;
          margin-left: 11px;
          background-color: #ebdfdf;

          span {
            display: block;
            height: 12px;
            background-color: #fe6d67;
            border-radius: 10px;
            font-size: 11px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 12px;
            letter-spacing: 0px;
          }
        }
        .year {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          line-height: 20px;
          letter-spacing: 0px;
        }
        .percent {
          width: 40px;
          font-size: 14px;
          font-weight: 400;
          text-align: right;
          color: #5b5d75;
        }
        .iconfont {
          color: #00d47a;
        }
      }
    }
    .tip {
      // margin-top: 23px;
      margin-bottom: 19px;
      text-align: center;
      span {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
        margin-right: 7px;
      }
      .iconfont {
        font-size: 12px;
        color: #b4b4bd;
      }
    }
  }
  .shart {
    margin: 25px 0;
  }
  .bottom {
    width: 375px;
    height: 60px;
    background: #f7f4f5;
    padding-top: 5px;
  }
}
</style>
