<template>
  <!-- 我是首頁 首頁 -->
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeadNav from '../components/Index/HeadNav'
import LeftMenu from '../components/Index/LeftMenu'
export default {
  name: 'index',

  components: {
    HeadNav,
    LeftMenu
  }
}
</script>

<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  /* width: calc(100%-180px); */
  /* height: calc(100%-71px); */
  width: 1740px%;
  height: 100%;
  overflow: auto;
}

.el-dialog__header {
  background-color: #67c23a;
  line-height: 30px;
}
</style>
