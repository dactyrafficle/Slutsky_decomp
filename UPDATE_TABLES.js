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
};