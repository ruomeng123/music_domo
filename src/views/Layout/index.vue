<template>
  <div>
    <!-- fixed:固定在顶部 -->
    <van-nav-bar :title="activeTitle" fixed/>
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" replace to="/layout/search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeTitle: this.$route.meta.title, // "默认"顶部导航要显示的标题 (默认获取当前路由对象里的meta中title值)
    };
  },
  // 路由切换时 - 侦听$route对象的改变
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title; // 让切换后的路由信息对象里的title赋给activeTitle变量显示
    }
  }
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
