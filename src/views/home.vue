<template>
  <div class="home-page">
    <router-view @numChanged="setActiveNum"></router-view>
    <van-tabbar v-model="active" active-color="#6B81FF">
      <van-tabbar-item to="/index">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.homeActive : icon.homeNormal" />
      </van-tabbar-item>
      <van-tabbar-item to="/product">
        <span>产品</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.productActive : icon.productNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/transaction">
        <span>交易</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.jyActive : icon.jyNormal" />
      </van-tabbar-item>
      <van-tabbar-item to="/personalInfo">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.personActive : icon.personNormal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

let homeNormalImage = require('@/assets/images/tab_home_normal.png')
let homeActiveImage = require('@/assets/images/tab_home_active.png')
let productNormalImage = require('@/assets/images/tab_product_normal.png')
let productActiveImage = require('@/assets/images/tab_product_active.png')
let jyNormalImage = require('@/assets/images/tab_jy_normal.png')
let jyActiveImage = require('@/assets/images/tab_jy_active.png')
let personNormalImage = require('@/assets/images/tab_person_normal.png')
let personActiveImage = require('@/assets/images/tab_person_active.png')

export default {
  name: 'home',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      active: 0,
      icon: {
        homeNormal: homeNormalImage,
        homeActive: homeActiveImage,
        productNormal: productNormalImage,
        productActive: productActiveImage,
        jyNormal: jyNormalImage,
        jyActive: jyActiveImage,
        personNormal: personNormalImage,
        personActive: personActiveImage
      }
    }
  },
  methods: {
    setActiveNum (num) {
      this.active = num
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  padding-bottom: 50px;
}
</style>
