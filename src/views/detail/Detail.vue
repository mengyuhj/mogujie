<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-params-info :param-info="itemParams"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, Shop} from "network/detail";
  import {itemListenerMixin} from "common/mixin";

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
        recommends: []
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
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin],
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
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImagLoad', this.itemImageListener)
    },
    methods:{
      detailImageLoad(){
        this.newRefresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: absolute;
    background-color: #fff;
    /*overflow: hidden;*/
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
