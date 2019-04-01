<template>
  <div class="home">
    <!-- <h1 class="header-title">{{ hometitle }}</h1> -->
    <div class="grid">
      <div  class="tag-list">
        <!-- <Indicator/> -->
        <div
          v-for="(data, index) of outputData"
          :key="index"
          v-html="data"
        >
         <!-- <div
          v-html="outputData"
        > -->
        </div>
      </div>
    </div>
    <div class="centered">
      <div class="group">
        <input autofocus id="name" v-model="permuteData" type="text">
        <label for="name"></label>
        <div class="bar"></div>
      </div>
      <div class="btn-group">
        <button class="generate-btn" @click="permuteGenerator">GENERATE</button>
        <!-- <button class="generate-btn" @click="runPermuted">RUN</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Indicator from "../components/indicator";
import { FETCH_LISTDATA } from "@/store/actions.type";
import { mapGetters } from 'vuex'
import permute from '../scripts/steinhaus-johnson-trotter'
import Tone from 'tone'
// import Gibber from '../scripts/gibber.audio.lib'
// import { setInterval } from 'timers';

export default {
  name: 'Home',
  data(){
    return {
      permuteData: "",
      permuted: "",
      cursor: 0,
      output: "",
      cursorIndicator: "",
      rowCount: -1,
      render: "",
      target: "",
      targetChar: "",
      synthA: "",
      synthB: ""
    }
  },
  mounted() {
    this.synthA = new Tone.Synth({
      oscillator: {
        type: 'fmsquare',
        modulationType: 'sawtooth',
        modulationIndex: 3,
        harmonicity: 3.4
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
      }
    }).toMaster()


    this.synthB = new Tone.Synth({
      oscillator: {
        type: 'triangle8'
      },
      envelope: {
        attack: 0.01,
        decay: 1,
        sustain: 0.4,
        release: 0.6
      }
    }).toMaster()
  },
  components: {
    Indicator
  },
  props: {
    msg: String
  },
  computed: {
    // ...mapGetters(['getListData', 'isLoading'])
    outputData: function(){
      return this.render
    }
  },
  watch: {
    targetChar: function(){
     switch( this.targetChar ) {
       case 'ต':
          this.synthA.triggerAttackRelease("C4", "8n");
       break;
       case 'ก':
          this.synthB.triggerAttackRelease("F4", "8n");
       break;
       case 'ค':
          this.synthB.triggerAttackRelease("A4", "8n");
       break;
       case 'ว':
          this.synthA.triggerAttackRelease("G3", "8n");
       break;
       case 'ย':
          this.synthB.triggerAttackRelease("B4", "8n");
       break;
     }
    }
  },
  methods: {
    getdata(){
      console.log("getListData", this.getListData)
    },
    permutations(arr) {
      var generator = permute(arr);
      var next = arr;
      var result = [];
      let targetIndex = this.permuteData.length - 1
      this.target = this.permuteData.charAt(targetIndex)
      let mc 

      while (next !== undefined) {
        // mc = next.replace(this.target, `<span>${this.target}</span>`)
        result.push(next);
        next = generator();
      }
      return result;
    },
    runPermuted(){
     setTimeout( () => { 
        this.cursor++
        this.increment()
       }
     , 250)
    },
    permuteGenerator(){
      this.permuted = this.permutations(this.permuteData)  
      this.increment()
    },
    increment(){
      if(this.cursor % this.permuteData.length == 0){
        this.cursor = 0
        this.rowCount++
      }
      
      let offset = 0
      this.targetChar = this.permuted[this.rowCount].substr(this.cursor + offset, 1)   

      this.output = this.permuted[this.rowCount].substr(0, this.cursor + offset) + 
        `<span>` + this.targetChar + "</span>" + 
        this.permuted[this.rowCount].substr(this.cursor+1 + offset)

      this.render = this.permuted.slice(0)
      this.render[this.rowCount] = this.output
      
      this.runPermuted()
    },
    // play: function() {
    //   Gibber.scale.root.seq( ['c4','eb4'], 2)
    //   c = Mono('easyfx').note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) )
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/_base.scss';

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
    height: 410px;
    box-sizing: content-box;
    /* grid-template-columns: repeat(2,1fr); */
    /* grid-gap: 1rem; */
  }

  .grid p{
    font-size: 18px; 
   
  }

  .tag-list{
    div{
      letter-spacing: 4px;
    }
  }

  .tag-list{
    /deep/ span{
      transition: 200ms;
      color: rgba(white, 1);
      /* border-bottom: 2px solid; */
      /* &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background: rgba(white, 1);
        transform: translateX(-100%);
        margin-top: 3px;
      } */
    } 
   
  }

  .btn-group{
    display: flex;
    justify-content: space-between;
    width: 120px;
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
    transition: 200ms;
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
