<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <!-- 热搜词容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <div class="hot_title">热门搜索</div>
      <!-- 热搜词容器 -->
      <div class="hot_name_wrap">
        <!-- 热搜词 -->
        <div
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
        >
          {{ obj.first }}
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <div class="hot_title">最佳匹配</div>
      <!-- 结果列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <songItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.al.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></songItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "@/api";
import songItem from "@/components/songItem.vue";
export default {
  data() {
    return {
      value: "",
      hotArr: [],
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },
  components: {
    songItem,
  },
  async created() {
    const res = await hotSearchAPI();
    // console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, // 固定公式
      });
    },
    async fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      const res = await this.getListFn();
      // console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    async inputFn() {
      this.page = 1;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.finished = false; // 输入框关键字改变-可能有新数据(不一定加载完成了)
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        // 如果搜索结果响应数据没有songs字段-无数据
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        this.loading = false;
      }, 900);
    },
    async onLoad() {
      this.page++;
      const res = await this.getListFn();
      // console.log(res);
      if (res.data.result.songs === undefined) {
        this.finished = false;
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>