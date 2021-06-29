function UPDATE_PARAMETERS() {
  
 document.getElementById('input_alpha_final').value = document.getElementById('input_alpha_initial').value;
 document.getElementById('input_budget_final').value = document.getElementById('input_budget_initial').value;
 
 return {
  'a':{
   'alpha':parseFloat(document.getElementById('input_alpha_initial').value),
   'budget':parseFloat(document.getElementById('input_budget_initial').value),
   'px':parseFloat(document.getElementById('input_px_initial').value),
   'py':parseFloat(document.getElementById('input_py_initial').value)
  },
  'b':{
   'alpha':parseFloat(document.getElementById('input_alpha_final').value),
   'budget':parseFloat(document.getElementById('input_budget_final').value),
   'px':parseFloat(document.getElementById('input_px_final').value),
   'py':parseFloat(document.getElementById('input_py_final').value)
  }
 }
}