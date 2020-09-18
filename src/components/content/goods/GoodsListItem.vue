<template>
    <div class="goods-item">
      <img :src="goodsItem.show.img" alt=""  @load='imageLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
    </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props: {
        goodsItem: {
          type: Object,
          default(){
            return[]
          }
        }
      },
      methods: {
        imageLoad() {
          this.$bus.$emit('itemImageLoad')
        }
      }
    }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 44px;
    width: 47%;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5%;
  }

  .goods-info{
    font-size: 12px;
    text-align: center;
    position: absolute;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }

  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods-info .price{
    color: var(--color-tint);
    position: relative;
    left: -20px;
  }

  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before{
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    top: -1px;
    right: -20px;
    background: url("~assets/img/home/shoucang.png") 0px 0/14px 14px;
  }

</style>
