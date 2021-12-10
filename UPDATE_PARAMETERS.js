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

function UPDATE_SOLUTIONS(obj) {
  
  let alpha_0 = obj.a.alpha;
  let alpha_1 = obj.b.alpha;
  
  let beta_0 = obj.a.beta;
  let beta_1 = obj.b.beta;
  
  let budget_0 = obj.a.budget;
  let budget_1 = obj.b.budget;

  let px_0 = obj.a.px;
  let px_1 = obj.b.px;
  
  let py_0 = obj.a.py;
  let py_1 = obj.b.py;

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
    'alpha_0': obj.a.alpha,
    'alpha_1': obj.b.alpha,
    'beta_0': obj.a.beta,
    'beta_1': obj.b.beta,
    'budget_0': obj.a.budget,
    'budget_1': obj.b.budget,
    'px_0': obj.a.px,
    'px_1': obj.b.px,
    'py_0': obj.a.py,
    'py_1': obj.b.py,
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