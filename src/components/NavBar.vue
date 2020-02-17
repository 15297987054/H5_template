<template>
  <div class="nav-bar">
    <van-icon name="arrow-left" size="20px" color="#666" class="vm" @click="goBack" />
    <div class="header-title text-ellipsis">
      <span>{{title}}</span>
    </div>
    <span class="space-right"></span>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'nav-bar',
  components: {
    [Icon.name]: Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/study')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/index";
  @font-size-18: 18px;

  .nav-bar {
    .flex-normal;
    padding: .2rem .16rem;
    border-bottom: 0;
    .header-title{
      display: inline-block;
      vertical-align: middle;
      max-width: 85%;
      span {
        margin-right: .1rem;
        .font-c(36,@color-text-paragraph);
        font-weight: bold;
        padding-top: .1rem;
        display: inline-block;
      }
    }
    .space-right{
      width: 20px;
    }
  }
</style>

<style>
  .van-nav-bar .van-icon {
    font-size: 20px;
    color: #666666;
  }

  .nav-bar .nav-title {
    font-weight: bold;
    vertical-align: middle;
  }
</style>
