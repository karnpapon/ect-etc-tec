<template>
  <div class="header-wrapper">
    <div class="header">
      <router-link 
        :to="{name: 'home'}" 
        active-class="active"
        exact 
      >
        {{ route1 }}
      </router-link>
      <router-link 
        to="/about"  
        active-class="active"
        exact
      >
        {{ route2 }}
      </router-link>
    </div>
  </div>
</template>

<!-- "exact" force header actives only one by one.  -->

<script>
export default {
  name: "Header",
  data(){
    return { 
      route1: "go home",
      route2: "about page",
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
    height: 50px;
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
