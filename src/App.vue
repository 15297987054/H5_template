<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less">
@import "assets/iconfont/iconfont.css";
@import "style/index";
@import "style/ui-rewrite";

html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: calc(100%);
  font-family: "PingFangSC-Regular", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
