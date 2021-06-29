function GET_HICKSIAN_LOG_DEMAND_CURVE(box, ALPHA, PRICE, UTILITY) {

 // PRICE IS THE PRICE OF THE OTHER GOOD
 
 let c1 = (1-ALPHA);
 let c2 = Math.log(UTILITY, Math.E);
 let c3 = PRICE*ALPHA;
 let c4 = c1*Math.log(c3/c1, Math.E);
 let c5 = c2 + c4;

 // WTF IM SO DUMB THE SLOPE IS JUST -c1

 // I NEED THE ALLOCATION AS A REFERENCE POINT THEN

  return [
   [{
     'x':box.data.range.x.min,
     'y':c5-box.data.range.x.min*c1
   },{
     'x':c5/c1-box.data.range.y.min/c1,
     'y':0+box.data.range.y.min
   }]
  ];
  
}