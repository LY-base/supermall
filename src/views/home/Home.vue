<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banners">
            <a :href="item.link">
              <img :src="item.image" alt="" @load="swiperImageLoad">
            </a>
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import {getHomeMultidata, getHomeGoods} from "network/home";
    import Swiper from "swiper"
    import 'swiper/dist/css/swiper.min.css';
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backtop/BackTop";

    import {debounce} from "common/utils";

    export default {
      name: "Home",
      components: {
        NavBar,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      data(){
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          },
          currentType:'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY:0
        }
      },

      computed: {
        showGoods(){
          return this.goods[this.currentType].list
        }
      },

      destroyed() {
        console.log("home destroyed")
      },
      activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
      },

      created() {
        this.getHomeMultidata()

        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      methods:{
        // 一，网络请求相关
        initSwiper() {
          setTimeout(() => {
            var mySwiper = new Swiper('.swiper-container', {
              loop: true,
              direction: "horizontal",
              speed: 2000,
                //防止拖拽后无法自动滑动
              autoplay: 2000,
              autoplayDisableOnInteraction: false,

              // 防止拖拽后无法自动滑动
              observer: true,
              observeParents: true,
              observeSlideChildren: true,

              // 如果需要前进后退按钮
              prevButton:'.swiper-button-prev',
              nextButton:'.swiper-button-next',
            })
          }, 300)
        },
        //1. 请求多个数据
        getHomeMultidata(){
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          });
        },
        //2. 商品数据请求
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            // console.log(res.data)
            this.goods[type].list.push(...res.data.list),
            this.goods[type].page += 1

            // 上拉加载更多，scroll默认情况下只能加载一次，调用finish函数方法
            this.$refs.scroll.finishPullUp()
          })
        },
        // 二.事件监听相关
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop';
              break
            case 1:
              this.currentType = 'new';
              break
            case 2:
              this.currentType = 'sell';
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index
        },
        // 1.返回顶部，滑动停留
        backClick(){
         this.$refs.scroll.scrollTo(0, 0, 600)
        },
        contentScroll(position){
          // 1.判断backTop是否显示
          this.isShowBackTop = (-position.y) > 1000;

          // 2.决定tabControl是否吸顶（position: fixed）
          this.isTabFixed = (-position.y) > this.tabOffsetTop

        },
        // 2.上拉加载一次，接受事件，并进行监听
        loadMore(){
          this.getHomeGoods(this.currentType)  // 调用方法，实时监听加载更多数据
        },
        swiperImageLoad(){
          // 2.获取tabControl的offsetTop
          // 所有组件都有一个$el属性：用于获取组件中的元素
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

        }
      },
      mounted() {

        this.initSwiper();

        // 1.监听Item中图片加载完成,在created中可能加载延迟
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('itemImageLoad', () => {
          refresh()
        });

      }
    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    /*使用原生滚动时，才有用*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  img{
    width: 100%;
  }
  /*没有吸顶效果*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    top: 44px;
    z-index: 9;
    background-color: #ffffff;
  }

</style>
