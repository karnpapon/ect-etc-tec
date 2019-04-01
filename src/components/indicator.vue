<template>
  <div class="header-wrapper">
  </div>
</template>

<!-- "exact" force header actives only one by one.  -->

<script>
export default {
  name: "Indicator",
  data(){
    return { 
      isActive: false
    }
  },
  methods: {
    changeNav(){
      this.isActive = true
    }
  }
}
</script>


<style scoped>
  a{
    font-size: 16px;
    text-decoration: none;
  }

  .header-wrapper{
    display: flex;
    width: 100%;
    height: 5px;
    background-color: deepskyblue;
    justify-content: center;
    align-items: center;
  }

  .header{
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

  .header a:hover{ color: rgb(121, 121, 121); }

  .active{
    color: rgb(255, 255, 255);
  }
</style>
