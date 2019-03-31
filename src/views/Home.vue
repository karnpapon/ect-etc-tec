<template>
  <div class="home">
    <!-- <h1 class="header-title">{{ hometitle }}</h1> -->
    <div class="grid">
      <div class="tag-list">
        <p
          v-for="(data, index) of permuted"
          :key="index"
        >
        {{ data }}
        </p>
      </div>
    </div>
    <div class="centered">
      <div class="group">
        <input  id="name" v-model="permuteData" type="text">
        <label for="name"></label>
        <div class="bar"></div>
      </div>
        <button class="generate-btn" @click="permuteGenerator">GENERATE</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { FETCH_LISTDATA } from "@/store/actions.type";
import { mapGetters } from 'vuex'
import permute from '../scripts/steinhaus-johnson-trotter'

export default {
  name: 'Home',
  data(){
    return {
      hometitle: "Karnpapon Vue's Boiler Plate",
      permuteData: "",
      permuted: ""
    }
  },
  mounted() {
    // this.$store.dispatch(FETCH_LISTDATA);
  },
  components: {
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(['getListData', 'isLoading'])
  },
  methods: {
    getdata(){
      console.log("getListData", this.getListData)
    },
    permutations(arr) {
      var generator = permute(arr);
      var next = arr;
      var result = [];
      while (next !== undefined) {
        result.push(next);
        next = generator();
      }
      return result;
    },
    permuteGenerator(){
      this.permuted = this.permutations(this.permuteData)  
    }
  },
  mounted(){
    this.permuted  = this.permutations(this.permuteData)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/_base.scss';

  *{
    font-family: 'Kanit', sans-serif;
  }
  .home{
    width: 100%;
    height: 100%;
    background-color: $main-color;
    text-align: center;
    align-items: center;
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    padding: 40px;
  }

  .header-title{
    width: fit-content;
    padding: 20px 0;
  }

  .home-detail{
    cursor: pointer;
    font-weight: bolder;
  }

  .tag-list{ 
    display: contents;
    height: -webkit-fill-available;
  }
  .tag-list li{ text-align: left}

  .grid{
    width: 100%;
    column-count: 8;
    /* grid-template-columns: repeat(2,1fr); */
    /* grid-gap: 1rem; */
  }

  .grid p{
    font-size: 18px; 
   
  }

  .generate-btn{
    border: none;
    cursor: pointer;
    padding: 10px;
    background:rgba(white, 1);
    transition: 100ms;
    &:hover{
      background: rgba(white, .5); 
    }
    &:active{
      color: white;
      background: black;
    }
  }

  .centered {
    width: $width;
    height: $width/5;
    margin: auto;
    top: 0; bottom: 0;
    left: 0; right: 0; 
  }

  .group {
    width: 100%;
    height: $width/5;
    overflow: hidden;
    position: relative;
  }

  label {
    position: absolute;
    top: $width/15;
    color: rgba(white, .5);
    font: 400 $width/15 Roboto;
    cursor: text;
    transition: .25s ease;
  }

  input {
    display: block;
    width: 100%;
    padding-top: $width/15;
    border: none;
    border-radius: 0;
    color: white;
    background: $main-color;
    font-size: $width/15;
    transition: .3s ease;
    &:valid {
      ~label {
        top: 0;
        font: 700 $width/25 Roboto;
        color: rgba(white, .5);
      }
    }
    &:focus {
      outline: none;
      ~label {
        top: 0;
        font: 700 $width/25 Roboto;
        color: $secondary-color;
      }
      
        
      ~ .bar:before {
      transform: translateX(0);
      }
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px $main-color inset;
      -webkit-text-fill-color: white !important;
    }
  }

  .bar {
    background: rgba(white, .5);
    content: '';
    width: $width;
    height: $width/150;
    transition: .3s ease;
    position: relative;
    /* &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 150%;
      background: $secondary-color;
      transform: translateX(-100%);
      
    } */
  }

  ::selection {background: rgba($secondary-color, .3);}
</style>
