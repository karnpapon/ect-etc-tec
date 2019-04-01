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

  .container{
    height: 100vh;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
</style>
