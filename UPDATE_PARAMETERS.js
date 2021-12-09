function UPDATE_PARAMS() {
  
  let obj = {
    'a':{
      'alpha':parseFloat(document.getElementById('input_alpha_initial').value),
      'beta':0,
      'budget':parseFloat(document.getElementById('input_budget_initial').value),
      'px':parseFloat(document.getElementById('input_px_initial').value),
      'py':parseFloat(document.getElementById('input_py_initial').value)
    },
    'b':{
      'alpha':parseFloat(document.getElementById('input_alpha_final').value),
      'beta':0,
      'budget':parseFloat(document.getElementById('input_budget_final').value),
      'px':parseFloat(document.getElementById('input_px_final').value),
      'py':parseFloat(document.getElementById('input_py_final').value)
    },
  }

  obj.a.beta = (1-obj.a.alpha);
  obj.b.beta = (1-obj.b.alpha);

  document.getElementById('input_beta_initial').value = obj.a.beta;
  document.getElementById('input_beta_final').value = obj.b.beta;

  // console.log(obj);
  return obj;
}

function RESET_PARAMS() {
  
  let obj = {
    'a':{
      'alpha':0.4,
      'beta':0.6,
      'budget':100,
      'px':2,
      'py':2
    },
    'b':{
      'alpha':0.4,
      'beta':0.6,
      'budget':100,
      'px':2,
      'py':2
    },
  }
  
  document.getElementById('input_alpha_initial').value = obj.a.alpha;
  document.getElementById('input_beta_initial').value = obj.a.beta;
  document.getElementById('input_budget_initial').value = obj.a.budget;
  document.getElementById('input_px_initial').value = obj.a.px;
  document.getElementById('input_py_initial').value = obj.a.py;

  document.getElementById('input_alpha_final').value = obj.b.alpha;
  document.getElementById('input_beta_final').value = obj.b.beta;
  document.getElementById('input_budget_final').value = obj.b.budget;
  document.getElementById('input_px_final').value = obj.b.px;
  document.getElementById('input_py_final').value = obj.b.py;
}