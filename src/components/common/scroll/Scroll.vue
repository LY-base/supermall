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
      components: {
        BScroll
      },
      data(){
        return{
          scroll: null
        }
      },
      mounted() {
        // 1.创建Scroll实列对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        });

        // 2.监听滚动的位置
        if (this.probeType  === 2 || this.probeType === 3){
          this.scroll.on('scroll', (position) =>{
            this.$emit('scroll',position)
          });
        }
        // 3.监听滚动到底部，上拉加载更多
        if (this.pullUpLoad){
          this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
          })
        }
      },

      methods: {
        scrollTo(x, y, time=500){
          this.scroll && this.scroll.scrollTo(x, y, time)
        },
        refresh(){
          this.scroll && this.scroll.refresh()
        },

        finishPullUp(){
          this.scroll.finishPullUp()
        },

        getScrollY(){
          return this.scroll ? this.scroll.y : 0
        }
      }
    }

</script>

<style scoped>

</style>
