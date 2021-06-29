function GET_MARSHALLIAN_LOG_DEMAND_CURVE(box, ALPHA, BUDGET) {

  return [
   [{
     'x':box.data.range.x.min,
     'y':Math.log(ALPHA*BUDGET, Math.E)-box.data.range.x.min
   },{
     'x':box.data.range.x.max,
     'y':Math.log(ALPHA*BUDGET, Math.E)-box.data.range.x.min-box.data.range.x.span
   }]
  ];
  
}