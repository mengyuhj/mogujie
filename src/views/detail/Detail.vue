<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info ref="itemParams" :param-info="itemParams"/>
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <!--    监听组件原生事件需给该组件添加native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImageInfo from "./childComps/DetailImageInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, Shop} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";

  import { mapActions } from "vuex"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 保存传入的id
      this.iid = this.$route.params.id

      // 详情数据请求
      getDetail(this.iid).then(res => {
        // console.log(res.data);
        const data = res.data.result
        //获取轮播数据
        this.topImages = res.data.result.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //获取详情信息
        this.detailInfo = data.detailInfo;

        //商品参数信息
        this.itemParams = data.itemParams;

        //评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //推荐数据请求
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })

      //给赋值的操作进行防抖
      this.getThemeTopY = debounce(() => {
        //一般offsettop值不对都是图片未加载完造成
        this.themeTopYs = [];
        //获取各模块顶部高度
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.itemParams.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        //在最后添加一个足够大的值
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs);
      }, 100)
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImagLoad', this.itemImageListener)
    },
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad() {
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        const positionY = -position.y
        //判断backtop是否显示
        this.isShowBackTop = (positionY) > 1000

        let length = this.themeTopYs.length
        for (let i = 0; i < this.themeTopYs.length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <
            this.themeTopYs[i + 1])) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        //获取购物车中的商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //添加商品到购物车(注意利用Promise和利用mapActions映射)
        this.addCart(product).then(res => {
          // this.show=true;
          // this.message=res;
          //
          // setTimeout(()=>{
          //     this.show=false;
          //     this.message=''
          //   },1500)
          // console.log(res);

          this.$toast.show(res,1500)
          // console.log(this.$toast);
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;

  }

  .content {
    position: absolute;
    background-color: #fff;
    overflow: hidden;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
