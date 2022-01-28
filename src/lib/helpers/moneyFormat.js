export const moneyFormat = (price, sign = '₦') =>{
  if(price==null) return "0.00"
  let negative='';
  let negative2='';
  if(parseFloat(price)<0){
    negative='-'
    negative2=''
    price=price*-1;
  } 
  const pieces = parseFloat(price).toFixed(2).split('')

  let ii = pieces.length - 3
  while ((ii-=3) > 0) {
    pieces.splice(ii, 0, ',')
  }
  return sign + negative+pieces.join('')+negative2
}
