<template>
  <div class="home">
    <div class="header-title">
      <img src="https://img.icons8.com/material-outlined/24/000000/circled-menu.png">
    </div>
    <div class="header-total-patterns">
      total: <b>{{ this.permuted.length }}</b> patterns.
    </div>
    <div class="display-container">
     <div class="grid canvas-wrapper">
     <div  class="tag-list">
        <div
          id="text-bg"
          v-for="(data, index) of outputDataBG"
          :key="index"
          v-html="data"
        >
        </div>
      </div> 
    </div>
    <div class="grid render-text">
      <div  class="tag-list">
        <div
          v-for="(data, index) of outputData"
          :key="index"
          v-html="data"
        >
        </div>
      </div>
    </div>
    </div>
    <div class="display-char">
      <div class="char">{{ this.targetChar }}</div>
    </div>
   
    <div class="centered">
      <div class="group">
        <input autofocus id="name" v-model="permuteData" type="text">
        <label for="name"></label>
        <div class="bar"></div>
      </div>
      <div class="btn-group">
        <button class="generate-btn" @click="permuteGenerator">GENERATE</button>
      </div>
    </div>
    <p class="credits"> by Karnpapon Boonput 2019 all rights reversed.</p>
  </div>
</template>

<script>
import Indicator from "../components/indicator";
import Header from "../components/Header";
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
      synthB: "",
      permutedTextBg: ""
    }
  },
  mounted() {
    var reverb = new Tone.JCReverb(0.7).connect(Tone.Master);
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
    }).chain(reverb)

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
    }).chain(reverb)
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
    },
    outputDataBG: function(){
      return this.permutedTextBg
    }
  },
  watch: {
   
  },
  methods: {
    getdata(){
      console.log("getListData", this.getListData)
    },
     trigger(){
     switch( this.targetChar ) {
       case 'ต':
          this.synthA.envelope.attack = 0.05
          this.synthA.envelope.release = 0.2
          this.synthA.triggerAttackRelease("D4", "8n");
       break;
       case 'ก':
          this.synthB.envelope.attack = 0.01
          this.synthB.envelope.release = 0.6
          this.synthB.triggerAttackRelease("C#4", "8n");
       break;
       case 'ค':
          this.synthB.envelope.attack = 0.05
          this.synthB.envelope.release = 0.6
          this.synthB.triggerAttackRelease("F#4", "8n");
       break;
       case 'ว':
          this.synthA.envelope.attack = 1
          this.synthA.envelope.release = 1
          this.synthA.triggerAttackRelease("E3", "8n");
       break;
       case 'ญ':
          this.synthB.envelope.attack = 1
          this.synthB.envelope.release = 1
          this.synthB.triggerAttackRelease("B4", "8n");
       break;
     }
    },
    permutations(arr, highlight = false) {
      var generator = permute(arr);
      var next = arr;
      var result = [];
      let targetIndex = this.permuteData.length - 1
      this.target = this.permuteData.charAt(targetIndex)
      let mc 

      while (next !== undefined) {
        if(highlight){
          mc = next.replace(this.target, `<span id="text-bg-render">${this.target}</span>`)
          result.push(mc);
        } else {
          result.push(next);
        }
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
      this.permutedTextBg = this.permutations(this.permuteData, true)  
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
      this.trigger() 
      this.runPermuted()
    },
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
  }

  .header-total-patterns{
    position: absolute;
    right: 0;
    margin-right: 51px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    b{
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
    }
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
    padding-top: 20px;
    box-sizing: content-box;
    transition: 200ms;
    /* grid-template-columns: repeat(2,1fr); */
    /* grid-gap: 1rem; */
  }

  .render-text{
    position: relative;
    z-index: 5;
  }

  .grid p{
    font-size: 18px; 
   
  }

  .tag-list{
    div{
      letter-spacing: 4px;
    }
  }

  .canvas-wrapper{
    position: absolute;
  }

  #canvas{
    width: 100%;
  }

  #text-bg{
    color: $main-color;
    box-shadow: inset 0px -0.5px black
  }

  .display-container{
    width: 100%;
    position: inherit;
  }

  .display-char{
    font-size: 20rem;
    position: absolute;
    opacity: .5;
    transition: 200ms;
    z-index: 1;
    .char{
    }
  }

  .tag-list{
    /deep/ span{
      transition: 200ms;
      color: rgba(white, 1);
      border-bottom: 2px solid white;
    } 
    /deep/ span#text-bg-render{
      transition: 200ms;
      border-bottom: 2px solid black;
      color: black;
      font-weight: bolder;
    } 
   
  }

  .credits{
    font-family: 'Courier New', Courier, monospace;
    position: absolute;
    font-size: 12px;
    margin-bottom: 20px;
    bottom: 0px;
  }

  .btn-group{
    display: flex;
    justify-content: flex-end;
    width: 120px;
    padding-top: 30px;
  }

  .generate-btn{
    border: none;
    outline: none;
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
    top: 0; bottom: 0;
    left: 0; right: 0; 
    transition: 200ms;
    justify-content: flex-end;
    display: flex;
  }

  .group {
    width: 100%;
    height: $width/5;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-self: end;
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
    margin-top: auto;
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
