<template>
  <div class="home">
    <h1>北京欢迎您~</h1>
  </div>
</template>

<script>
import { Icon, Toast, Dialog } from 'vant'
// import Service from '../../service/index'

export default {
  name: 'Index',
  components: {
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/index";
  @radius10: 10px;
</style>
