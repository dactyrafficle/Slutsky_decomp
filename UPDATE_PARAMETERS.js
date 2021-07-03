function UPDATE_PARAMETERS() {
  
  b.alpha = parseFloat(document.getElementById('input_alpha_initial').value);
  b.budget = parseFloat(document.getElementById('input_budget_initial').value);
  b.px = parseFloat(document.getElementById('input_px_initial').value);
  b.py = parseFloat(document.getElementById('input_py_initial').value);

 document.getElementById('input_alpha_final').value = document.getElementById('input_alpha_initial').value;
 //document.getElementById('input_budget_final').value = document.getElementById('input_budget_initial').value;
 
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

function RESET_PARAMS() {
  document.getElementById('input_alpha_initial').value = 0.5;
  document.getElementById('input_budget_initial').value = 100;
  document.getElementById('input_px_initial').value = 2;
  document.getElementById('input_py_initial').value = 2;
  document.getElementById('input_alpha_final').value = 0.5;
  document.getElementById('input_budget_final').value = 100;
  document.getElementById('input_px_final').value = 2;
  document.getElementById('input_py_final').value = 2;
}