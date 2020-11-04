<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted(){
      //由于网络请求同时进行的冲突，设置一个定时器
      setTimeout(this._initScroll, 800)
    },
    methods:{
      _initScroll() {
        // 1.创建BetterScroll
        this.scroll = new BScroll(this.$refs.wrapper, {})
      },
      scrollTo(x,y,time=500) {
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>
