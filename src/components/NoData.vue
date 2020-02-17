<template>
  <div class="nodata">
    <img :src="image" alt="无消息图片." />
    <div class="tips">{{tips}}</div>
  </div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    image: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      default: '暂无数据~'
    }
  }
}
</script>

<style lang="less" scoped>
  .nodata {
    text-align: center;

    img {
      width: 3.8rem;
      height: 2.68rem;;
    }
    .tips {
      font-size: .24rem;
      color: #999999;
      padding-top: .4rem;
    }
  }
</style>
