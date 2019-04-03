<template>
  <div class="container">
    <div id="app"></div>
    <!-- <Header/> -->
    <router-view></router-view>
  </div>
</template>

<script>

import Header from "./components/Header";

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Kanit', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .container{
    height: 100vh;
    align-items: center;
    display: flex;
    flex-direction: column;
  }


  .bm-item-list{
    font-size: 16px !important;
    margin-left: unset !important;
  }

  .bm-item-list>*>span{
    font-weight: normal !important;
    font-family: Arial, Helvetica, sans-serif !important;
    text-align: left !important;
  }
  .bm-menu{
    background-color: #6e01ff !important;
  }

  .bm-burger-button{
    width: 20px !important;
    height: 20px !important;
  }

  .line-style{
    height: 10% !important;
  }
</style>
