# ECT-ETC-TEC

implementation on SJT ( Steinhaus-Johnson-Trotter's) algorithm 
as a musical pattern sequencer.

since letter contains an array of properties,
one of the property is "Phonetic" in short, Phonetic of each individual letter determines how to produce a sound. thus, phonetic is picked up and using to determine an "envelope" for each particular synth voice.

eg. letter "p" has percussive sound, then attack = 0.01 ( in terms of tone.js )
letter "y" has a smooth attack, so attack = 0.5 and so on.

👉[Try Here](https://karnpapon.github.io/ect-etc-tec/#/)

![Alt text](./src/assets/img/3.png?raw=true "Title")
![Alt text](./src/assets/img/4.png?raw=true "Title")

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
