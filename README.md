# ECT-ETC-TEC

implementation on SJT ( Steinhaus-Johnson-Trotter's) algorithm 
for thai characters as a musical pattern sequencer.

since letter contains an array of properties,
one of the property is "Phonetic" in short, Phonetic of each individual letter determine how to produce a sound. thus, phonetic is picked up and using to determine an "envelope" for each particular synth voice

eg. letter "p" has percussive sound, then attack = 0.01 ( in term of tone.js )
letter "y" has a smooth attack, so attack = 0.5 and so on.

![Alt text](./src/assets/img/1.png?raw=true "Title")
![Alt text](./src/assets/img/2.png?raw=true "Title")

## Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn run serve
```