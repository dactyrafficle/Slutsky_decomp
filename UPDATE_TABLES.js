function UPDATE_RESULTS_TABLE() {
 document.getElementById('expenditure-initial').innerHTML = INITIAL_EXPENDITURE.toFixed(2);
 document.getElementById('allocation-initial').innerHTML = '(' + INITIAL_MARSHALLIAN_ALLOCATION.x.toFixed(2) + ', ' + INITIAL_MARSHALLIAN_ALLOCATION.y.toFixed(2) + ')';
 document.getElementById('utility-initial').innerHTML = INITIAL_UTILITY.toFixed(2);
 
 document.getElementById('expenditure-hicksian').innerHTML = FINAL_EXPENDITURE.toFixed(2);
  document.getElementById('allocation-hicksian').innerHTML = '(' + FINAL_HICKSIAN_ALLOCATION.x.toFixed(2) + ', ' + FINAL_HICKSIAN_ALLOCATION.y.toFixed(2) + ')';
 document.getElementById('utility-hicksian').innerHTML = INITIAL_UTILITY.toFixed(2);

 document.getElementById('expenditure-marshallian').innerHTML = INITIAL_EXPENDITURE.toFixed(2);
  document.getElementById('allocation-marshallian').innerHTML = '(' + FINAL_MARSHALLIAN_ALLOCATION.x.toFixed(2) + ', ' + FINAL_MARSHALLIAN_ALLOCATION.y.toFixed(2) + ')';
 document.getElementById('utility-marshallian').innerHTML = FINAL_UTILITY.toFixed(2);
 
 
 
 
 document.getElementById('x-initial').innerHTML = INITIAL_MARSHALLIAN_ALLOCATION.x.toFixed(2);
 document.getElementById('sub-effect-x').innerHTML = (FINAL_HICKSIAN_ALLOCATION.x-INITIAL_MARSHALLIAN_ALLOCATION.x).toFixed(2);
 document.getElementById('hicksian-x').innerHTML = (FINAL_HICKSIAN_ALLOCATION.x).toFixed(2);
 document.getElementById('income-effect-x').innerHTML = (FINAL_MARSHALLIAN_ALLOCATION.x-FINAL_HICKSIAN_ALLOCATION.x).toFixed(2);
 document.getElementById('x-final').innerHTML = FINAL_MARSHALLIAN_ALLOCATION.x.toFixed(2);
 
 document.getElementById('y-initial').innerHTML = INITIAL_MARSHALLIAN_ALLOCATION.y.toFixed(2);
 document.getElementById('sub-effect-y').innerHTML = (FINAL_HICKSIAN_ALLOCATION.y-INITIAL_MARSHALLIAN_ALLOCATION.y).toFixed(2);
 document.getElementById('hicksian-y').innerHTML = (FINAL_HICKSIAN_ALLOCATION.y).toFixed(2);
 document.getElementById('income-effect-y').innerHTML = (FINAL_MARSHALLIAN_ALLOCATION.y-FINAL_HICKSIAN_ALLOCATION.y).toFixed(2);
 document.getElementById('y-final').innerHTML = FINAL_MARSHALLIAN_ALLOCATION.y.toFixed(2);
};