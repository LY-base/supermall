<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <slot></slot>

    <div>
      <slot>
        <div></div>
      </slot>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/swiper-bundle.css';

    export default {
      name: "Swiper",
      Swiper,
      mounted(){
        new Swiper('.swiper-container', {})
      }
    }
</script>

<style scoped>
  .swiper-container {
    width: 600px;
    height: 300px;
  }

</style>
