export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export  const getEnvelope = function(letter){
  let type
  switch( letter ){
    case ( 'ก'):
    case ( 'ข'):
    case ( 'ฃ'):
    case ( 'ค'):
    case ( 'ฅ'):
    case ( 'ฆ'):
      type = "k"
      break;
    case 'ง':
      type = "ng"
      break;
    case 'จ':
      type = "j"
      break;
    case ( 'ฉ' ):
    case ( 'ช' ):
    case ( 'ฌ' ):
      type = "sh"
      break;
    case ( 'ซ'):
    case ( 'ศ'):
    case ( 'ส'):
    case ( 'ษ' ):
      type = "s"
      break;
    case ( 'ญ'  ):
    case ( 'ย' ):
      type = "y"
      break;
    case 'ฎ' :
    case 'ด':
      type = "d"
      break;
    case 'ฏ' :
    case 'ต':
      type = "t"
      break;
    case 'ฐ' :
    case 'ฑ' :
    case 'ฒ' :
    case 'ถ' :
    case 'ท' :
    case 'ธ' :
      type = "th"
      break;
    case 'น':
    case 'ณ':
      type = "n"
      break;
    case 'บ' :
    case 'ป' :
    case 'ผ' :
    case 'พ' :
    case 'ภ' :
      type = "b"
      break;
    case 'ฝ' :
    case 'ฟ':
      type = "f"
      break;
    case 'ม':
      type = "m"
      break;
    case 'ร' :
    case  'ล':
    case  'ฤ':
    case  'ฬ':
      type = "l"
      break;
    case 'ว':
      type = "w"
      break;
    case 'ห':
    case 'ฮ':
      type = "h"
      break;
    case 'อ':
      type = "a"
      break;
  }
  return type
}