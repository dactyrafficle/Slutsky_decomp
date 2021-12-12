function UPDATE_PARAMS() {
  
  let obj = {
    'INITIAL':{
      'alpha':parseFloat(document.getElementById('input_alpha_INITIAL').value),
      'beta':0,
      'budget':parseFloat(document.getElementById('input_budget_INITIAL').value),
      'px':parseFloat(document.getElementById('input_px_INITIAL').value),
      'py':parseFloat(document.getElementById('input_py_INITIAL').value)
    },
    'FINAL':{
      'alpha':parseFloat(document.getElementById('input_alpha_FINAL').value),
      'beta':0,
      'budget':parseFloat(document.getElementById('input_budget_FINAL').value),
      'px':parseFloat(document.getElementById('input_px_FINAL').value),
      'py':parseFloat(document.getElementById('input_py_FINAL').value)
    },
  }

  obj.INITIAL.beta = (1-obj.INITIAL.alpha);
  obj.FINAL.beta = (1-obj.FINAL.alpha);

  document.getElementById('input_beta_INITIAL').value = obj.INITIAL.beta;
  document.getElementById('input_beta_FINAL').value = obj.FINAL.beta;

  return obj;
}

function UPDATE_SOLUTIONS(obj) {
  
  let alpha_0 = obj.INITIAL.alpha;
  let alpha_1 = obj.FINAL.alpha;
  
  let beta_0 = obj.INITIAL.beta;
  let beta_1 = obj.FINAL.beta;
  
  let budget_0 = obj.INITIAL.budget;
  let budget_1 = obj.FINAL.budget;

  let px_0 = obj.INITIAL.px;
  let px_1 = obj.FINAL.px;
  
  let py_0 = obj.INITIAL.py;
  let py_1 = obj.FINAL.py;

  let x_0 = alpha_0 * budget_0 / px_0;
  let y_0 = beta_0 * budget_0 / py_0;
  let u_0 = x_0**alpha_0*y_0**beta_0;
  
  let x_1 = alpha_1 * budget_1 / px_1;
  let y_1 = beta_1 * budget_1 / py_1;
  let u_1 = x_1**alpha_1*y_1**beta_1;
  
  let xc_0 = (u_0*(py_0/px_0*alpha_0/beta_0)**beta_0);
  let yc_0 = (u_0*(px_0/py_0*beta_0/alpha_0)**alpha_0);
  
  let xc_1 = (u_0*(py_1/px_1*alpha_1/beta_1)**beta_1);
  let yc_1 = (u_0*(px_1/py_1*beta_1/alpha_1)**alpha_1);
  let budget_c = px_1*xc_1 + py_1*yc_1;

  return {
    'alpha_0': obj.INITIAL.alpha,
    'alpha_1': obj.FINAL.alpha,
    'beta_0': obj.INITIAL.beta,
    'beta_1': obj.FINAL.beta,
    'budget_0': obj.INITIAL.budget,
    'budget_1': obj.FINAL.budget,
    'px_0': obj.INITIAL.px,
    'px_1': obj.FINAL.px,
    'py_0': obj.INITIAL.py,
    'py_1': obj.FINAL.py,
    'x_0': alpha_0 * budget_0 / px_0,
    'y_0': beta_0 * budget_0 / py_0,
    'u_0': x_0**alpha_0*y_0**beta_0,
    'x_1': alpha_1 * budget_1 / px_1,
    'y_1': beta_1 * budget_1 / py_1,
    'u_1': x_1**alpha_1*y_1**beta_1,
    'xc_0': (u_0*(py_0/px_0*alpha_0/beta_0)**beta_0),
    'yc_0': (u_0*(px_0/py_0*beta_0/alpha_0)**alpha_0),
    'xc_1':xc_1,
    'yc_1':yc_1,
    'budget_c':budget_c
  };
}


// set the table here
function UPDATE_TABLE(obj) {
  initial_allocation_x.innerHTML = (obj.x_0).toFixed(3);
  marshallian_response_x.innerHTML = (obj.x_1).toFixed(3);
  hicksian_response_x.innerHTML = (obj.xc_1).toFixed(3);

  initial_allocation_y.innerHTML = (obj.y_0).toFixed(3);
  marshallian_response_y.innerHTML = (obj.y_1).toFixed(3);
  hicksian_response_y.innerHTML = (obj.yc_1).toFixed(3);

  initial_utility.innerHTML = (obj.u_0).toFixed(3);
  marshallian_utility.innerHTML = (obj.u_1).toFixed(3);
  hicksian_utility.innerHTML = (obj.u_0).toFixed(3);

  initial_expenditure.innerHTML = (obj.budget_0).toFixed(3);
  marshallian_expenditure.innerHTML = (obj.budget_1).toFixed(3);
  hicksian_expenditure.innerHTML = (obj.budget_c).toFixed(3);
  
  sub_x.innerHTML = (obj.xc_1 - obj.x_0).toFixed(3);
  income_x.innerHTML = (obj.x_1 - obj.xc_1).toFixed(3);
  total_x.innerHTML = (obj.x_1 - obj.x_0).toFixed(3);
  
  sub_y.innerHTML = (obj.yc_1 - obj.y_0).toFixed(3);
  income_y.innerHTML = (obj.y_1 - obj.yc_1).toFixed(3);
  total_y.innerHTML = (obj.y_1 - obj.y_0).toFixed(3);
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
      'px':3,
      'py':2
    },
  }
  
  document.getElementById('input_alpha_INITIAL').value = obj.INITIAL.alpha;
  document.getElementById('input_beta_INITIAL').value = obj.INITIAL.beta;
  document.getElementById('input_budget_INITIAL').value = obj.INITIAL.budget;
  document.getElementById('input_px_INITIAL').value = obj.INITIAL.px;
  document.getElementById('input_py_INITIAL').value = obj.INITIAL.py;

  document.getElementById('input_alpha_FINAL').value = obj.FINAL.alpha;
  document.getElementById('input_beta_FINAL').value = obj.FINAL.beta;
  document.getElementById('input_budget_FINAL').value = obj.FINAL.budget;
  document.getElementById('input_px_FINAL').value = obj.FINAL.px;
  document.getElementById('input_py_FINAL').value = obj.FINAL.py;
}