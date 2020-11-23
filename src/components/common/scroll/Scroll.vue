<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //由于网络请求同时进行的冲突，设置一个定时器
      setTimeout(this._initScroll, 40)
    },
    methods: {
      _initScroll() {
        // 1.创建BetterScroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })

        //监听滚动
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
          })
        }

        //上拉加载更多
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },

      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishedPullUp() {
        this.scroll && this.scroll.finishPullUp()
        // console.log(this.scroll);
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    watch: {
      data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>

</style>
