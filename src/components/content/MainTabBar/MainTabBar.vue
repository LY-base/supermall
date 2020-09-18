<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="item-icon" src="~assets/img/shouye.svg" alt="首页">
      <img slot="item-icon-active" src="~assets/img/shouye_active.svg" alt="首页">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/menu" activeColor="blue">
      <img slot="item-icon" src="~assets/img/caidan.svg" alt="菜单">
      <img slot="item-icon-active" src="~assets/img/caidan_active.svg" alt="菜单">
      <div slot="item-text">菜单</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="~assets/img/fenlei.svg" alt="分类">
      <img slot="item-icon-active" src="~assets/img/fenlei_active.svg" alt="分类">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="profile" activeColor="blue">
      <img slot="item-icon" src="~assets/img/wode.svg" alt="我的">
      <img slot="item-icon-active" src="~assets/img/wode_active.svg" alt="我的">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
