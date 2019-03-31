<template>
  <div class="home">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      title: "About page"
    }
  },
  components: {
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
 .home{
    width: 100%;
    height: 100%;
    background-color: #aaaa;
    display: flex;
    justify-content: center;
  } 
</style>
