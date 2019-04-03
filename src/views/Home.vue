<template>
  <div class="home">
    <div class="header-title">
      <img src="https://img.icons8.com/material-outlined/24/000000/circled-menu.png">
    </div>
    <Slide :crossIcon="false">
      <a href="#">
        <span>
          README.md
         <br/>
          ------------------
          <br/> 
          implementing 
          SJT ( Steinhaus-Johnson-Trotter's) algorithm 
          for letters as a musical pattern.
          <br/>
          -
          <br/>
          since letters contain interesting properties,
          Phonetic of each individual Thai Consonants 
          is using to determines "envelope" particular sound in this project
          eg. letter "p" has percussive sound than letter "y"
          and so on.
          <br/>
          -
          <br/>
          using Tone.js as audio engine.
        </span>
      </a>
    </Slide>
    <div class="header-total-patterns">
      total: <b>{{ this.permuted.length }}</b> patterns.
    </div>
    <div 
      class="display-container"
      v-bind:class="{ show: isShowing }" 
    >
      <div class="grid canvas-wrapper">
        <div  class="tag-list">
          <div
            id="text-bg"
            v-for="(data, index) of outputDataBG"
            :key="index"
            v-html="data"
            v-bind:class="{ active: rowCount == index && isSelected }"
            @click="toggleSelect( data, index )"
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
    <div 
      v-if="this.permuteData.length > 5 && isShowing"
      class="scroll"
    >
      ⟷
    </div>
    <div 
      class="display-char"
      v-bind:class="{ showLetter: isShowing }"  
    >
      <div class="char">{{ this.targetChar }}</div>
    </div>
   
    <div class="centered">
      <div class="group">
        <input autofocus id="name" v-model="permuteData" type="text">
        <label for="name"></label>
        <div class="bar"></div>
      </div>
      <div class="btn-group">
        <button class="generate-btn" @click="generate">GENERATE</button>
        <button v-if="!isPlay"
          class="generate-btn" @click="increment">►
        </button>
        <button v-else
          class="generate-btn" @click="stop">▨
        </button>
      </div>
    </div>
    <div class="credits credit-logo">
      <a href="https://github.com/karnpapon/ECT-ETC-TEC" target="_blank">
        <img src="../assets/icon/GitHub-sm.svg" width="20px" height="20px">
      </a>
      <a href="https://creativecommons.org/" target="_blank">
        <img src="../assets/icon/cc-sm.svg" width="20px" height="20px">
      </a>
    </div>
    <p class="credits"> by Karnpapon Boonput 2019 all rights reversed.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import permute from '../scripts/steinhaus-johnson-trotter'
import Tone from 'tone'
import { getRandomInt, getEnvelope } from '../helpers';
import { Slide } from 'vue-burger-menu'  

export default {
  name: 'Home',
  data(){
    return {
      timer: "",
      permuteData: "",
      permuted: "",
      cursor: 0,
      output: "",
      rowCount: -1,
      render: "",
      target: "",
      targetChar: "",
      synthA: "",
      synthB: "",
      synthC: "",
      permutedTextBg: "",
      isLooped: false,
      isShowing: false,
      isSelected: false,
      isPlay: false,
      triggerType: 'synth',
      player: "",
      buffer: ""
    }
  },
  mounted() {
    var vol = new Tone.Volume(-20);
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
    }).chain(vol, reverb)

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
    }).chain(vol, reverb)

    this.synthC = new Tone.MembraneSynth({
      pitchDecay  : 0.05 ,
      octaves  : 10 ,
      oscillator  : {
      type  : 'sine'
      }  ,
      envelope  : {
      attack  : 0.001 ,
      decay  : 0.4 ,
      sustain  : 0.01 ,
      release  : 1,
      attackCurve  : 'exponential'
}
    }).chain(vol, reverb)
  },
  components: {
    Slide
  },
  props: {
    msg: String
  },
  computed: {
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
    getRandomInt,
    getEnvelope,
    toggleSelect( selected, index ){
      this.rowCount = index
      this.isLooped = !this.isLooped
      this.isSelected = !this.isSelected
    },
     triggerSynth(){

      //  find phonetic before switch.
      let envType = this.getEnvelope( this.targetChar )

     switch( envType ) {
       case 'k':
          this.synthC.envelope.attack = 0.05
          this.synthC.envelope.release = 0.2
          this.synthC.triggerAttackRelease("D2", "8n");
       break;
       case 'ng':
          this.synthC.envelope.attack = 0.1
          this.synthC.envelope.release = 0.5
          this.synthC.octaves = this.getRandomInt(1,200)
          this.synthC.triggerAttackRelease("C#3", "8n");
       break;
       case 'j':
          this.synthB.envelope.attack = 0.05
          this.synthB.envelope.release = 0.6
          this.synthB.triggerAttackRelease("F#4", "8n");
       break;
       case 'sh':
          this.synthA.envelope.attack = 0.7
          this.synthA.envelope.release = 0.5
          this.synthA.triggerAttackRelease("E3", "8n");
       break;
       case 's':
          this.synthB.envelope.attack = 0.7
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("B2", "8n");
       break;
       case 'y':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = this.getRandomInt(0.01, 0.5)
          this.synthB.triggerAttackRelease("F#3", "8n");
       break;
       case 'd':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("B2", "8n");
       break;
       case 't':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("B3", "8n");
       break;
       case 'th':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = this.getRandomInt(0.01, 0.5)
          this.synthB.triggerAttackRelease("C2", "8n");
       break;
       case 'n':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("D#3", "8n");
       break;
       case 'b':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("B2", "8n");
       break;
       case 'f':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("B3", "8n");
       break;
       case 'm':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("G#3", "8n");
       break;
       case 'l':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = this.getRandomInt(0.01, 0.3)
          this.synthB.triggerAttackRelease("B3", "8n");
       break;
       case 'w':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("A4", "8n");
       break;
       case 'h':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("A#3", "8n");
       break;
       case 'a':
          this.synthB.envelope.attack = 0.3
          this.synthB.envelope.release = 0.5
          this.synthB.triggerAttackRelease("E4", "8n");
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
    generate(){
      this.isShowing = true
      this.permuted = this.permutations(this.permuteData)  
      this.permutedTextBg = this.permutations(this.permuteData, true)  
      this.display()
    },
    display(){
      if(this.cursor % this.permuteData.length == 0){
        this.cursor = 0
        this.isLooped? this.rowCount:this.rowCount++
      }
      
      let offset = 0
      let targetRow = this.permuted[this.rowCount]
      this.targetChar = targetRow.substr(this.cursor + offset, 1)   

      this.output = targetRow.substr(0, this.cursor + offset) + 
        `<span>` + this.targetChar + "</span>" + 
        targetRow.substr(this.cursor+1 + offset)

      this.render = this.permuted.slice(0)
      this.render[this.rowCount] = this.output
    },
    increment(){
      this.isPlay = true
      this.display()
      if( this.triggerType == 'synth' ){
        this.triggerSynth() 
      } else {
        this.triggerVoice()
      }
      this.run()
    },
    run(){
     this.timer = setTimeout( () => { 
        this.cursor++
        this.increment()
       }
     , 200)
    },
    stop(){
      this.isPlay = false
      clearTimeout(this.timer)
    }
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

  .scroll{
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 160px;
    margin-right: 50px;
    font-size: 14px;
    padding: 0px 10px;
    border: 1px solid black;
    /* animation: scaling 0.5s alternate infinite ease-in; */
  }

  /* .scroll-animate {
    width: 100px;
    height: 100px;
    background: #000;
    animation: scaling 1.5s alternate infinite ease-in;
  } */

  @keyframes scaling {
    0%   {transform: scale(.9);}
    100% {transform: scale(1);}
  }

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
    pointer-events: none;
  }

  .grid p{
    font-size: 18px; 
   
  }

  .tag-list{
    div{
      letter-spacing: 4px;
      transition: 150ms;
      &:hover{
        cursor: pointer;
        background: white;
      }
    }
  }

  .active{
    background: white;
  }

  .canvas-wrapper{
    position: absolute;
  }

  #canvas{
    width: 100%;
  }

  #text-bg{
    color: $main-color;
    box-shadow: inset 0px -0.5px black;
  }

  .display-container{
    width: 100%;
    position: inherit;
    padding-bottom: 15px;
    overflow: auto;
    opacity: 0;
    transition: 400ms;
  }

  .display-char{
    font-size: 20rem;
    position: absolute;
    opacity: 0;
    transition: 600ms;
    /* z-index: 1; */
    pointer-events: none;
    .char{
      color: rgb(98, 0, 255);
    }
  }

  .show{
    opacity: 1;
  }

  .showLetter{
    opacity: 0.5; 
  }

  .tag-list{
    /deep/ span{
      transition: 200ms;
      color: rgba(rgb(111, 0, 255), 1);
      border-bottom: 2px solid rgb(111, 0, 255);
    } 
    /deep/ span#text-bg-render{
      transition: 200ms;
      border-bottom: 2px solid black;
      color: black;
      font-weight: bolder;
    } 
   
  }

  .matched{
    color: $main-color;
  }

  .credits{
    font-family: 'Courier New', Courier, monospace;
    position: absolute;
    font-size: 12px;
    margin-bottom: 20px;
    bottom: 0px;
  }

  .credit-logo{
    right: 0;
    width: 60px;
    display: flex;
    justify-content: space-around;
    margin-right: 30px;
    &:hover{
      fill: #ace63c;
      cursor: pointer;
    }
  }

  .btn-group{
    display: flex;
    justify-content: flex-end;
    padding-top: 50px;
  }

  .generate-btn{
    border: none;
    outline: none;
    cursor: pointer;
    padding: 5px 20px;
    background:rgba(white, 1);
    margin-left: 10px;
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
