
// THE BOXES
let b, bx, by, bxx, byy;

// THE PARAMS FROM THE INPUT TABLE
let PARAMS;
let SOLUTIONS;
let my_inputs = document.getElementsByClassName('myinputs');

window.onload = function() {
  
  my_inputs = document.getElementsByClassName('myinputs');
  
  // INITIALIZE BOXES
  b = new Box({'labels':{'x':'x','y':'y'}});
  bx = new Box({'labels':{'x':'lnpx','y':'lnx'}});
  by = new Box({'labels':{'x':'lnpy','y':'lny'}});
  bxx = new Box({'labels':{'x':'px','y':'x'}});
  byy = new Box({'labels':{'x':'py','y':'y'}});
  
  // ATTACH BOX CANVASES TO CONTAINERS
  document.getElementById('container-b').appendChild(b.returnCanvas());
  document.getElementById('container-bx').appendChild(bx.returnCanvas());
  document.getElementById('container-by').appendChild(by.returnCanvas());
  document.getElementById('container-bxx').appendChild(bxx.returnCanvas());
  document.getElementById('container-byy').appendChild(byy.returnCanvas());

  // SIZE THE CANVASES
  let w = window.innerWidth/4;
  if (w < 250) {
    w = 250;
  }
  b.CANVAS_SIZE(w, w);
  bx.CANVAS_SIZE(w, w);
  by.CANVAS_SIZE(w, w);
  bxx.CANVAS_SIZE(w, w);
  byy.CANVAS_SIZE(w, w);
  
  // PROCESS
  PARAMS = UPDATE_PARAMS();
  SOLUTIONS = UPDATE_SOLUTIONS(PARAMS);
  UPDATE_TABLE(SOLUTIONS);
  
  rescaleBoxes(PARAMS);
  
  update_b(PARAMS, SOLUTIONS);
  update_bx(PARAMS);
  update_by(PARAMS);
  update_bxx(PARAMS);
  update_byy(PARAMS);
 
 

  window.addEventListener('resize', function(e) {
    
    // RESIZE THE CANVASES
    let w = window.innerWidth/4;
    if (w < 250) {
      w = 250;
    }
    b.CANVAS_SIZE(w, w);
    bx.CANVAS_SIZE(w, w);
    by.CANVAS_SIZE(w, w);
    bxx.CANVAS_SIZE(w, w);
    byy.CANVAS_SIZE(w, w);
    
    update_b(PARAMS, SOLUTIONS);
    update_bx(PARAMS);
    update_by(PARAMS);
    update_bxx(PARAMS);
    update_byy(PARAMS);

  });
  
    
  for (let i = 0; i < my_inputs.length; i++) {
    my_inputs[i].addEventListener('input', function(e) {
      
      // GET PARAMETERS
      PARAMS = UPDATE_PARAMS();
      SOLUTIONS = UPDATE_SOLUTIONS(PARAMS);
      UPDATE_TABLE(SOLUTIONS);
      
      rescaleBoxes(PARAMS); // AS THE PARAMETERS CHANGE, WE ZOOM IN/OUT
      
      update_b(PARAMS, SOLUTIONS);
      update_bx(PARAMS);
      update_by(PARAMS);
      update_bxx(PARAMS);
      update_byy(PARAMS);

    });
  }

  
}


function rescaleBoxes(obj) {

  let alpha_0 = SOLUTIONS.alpha_0;
  let alpha_1 = SOLUTIONS.alpha_1;
  
  let beta_0 = SOLUTIONS.beta_0;
  let beta_1 = SOLUTIONS.beta_1;
  
  let budget_0 = SOLUTIONS.budget_0;
  let budget_1 = SOLUTIONS.budget_1;
  
  let px_0 = SOLUTIONS.px_0;
  let px_1 = SOLUTIONS.px_1;
  
  let py_0 = SOLUTIONS.py_0;
  let py_1 = SOLUTIONS.py_1;

  // THE RESULTING ALLOCATIONS

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
  
  let scale = 1.25;

  // SCALING THE NON-LOG GRAPHS

  px_arr = [obj.a.px, obj.b.px, obj.a.py, obj.b.py].sort(function(a,b) {
    return a - b;
  });
  x_min = px_arr[0];
  x_max = px_arr[px_arr.length-1];
  
  py_arr = [x_0, y_0, x_1, y_1, xc_1, yc_1].sort(function(a,b) {
    return a - b;
  });
  y_min = py_arr[0];
  y_max = py_arr[py_arr.length-1];
  
   // the non log graphs
  bxx.RANGE_X(0, x_max*scale);
  byy.RANGE_X(0, x_max*scale);

  bxx.RANGE_Y(0, y_max*scale);
  byy.RANGE_Y(0, y_max*scale);

  
  let ln_x_min = Math.log(x_min);
  let ln_x_max = Math.log(x_max);
  let ln_x_avg = (ln_x_min + ln_x_max) / 2;
  let ln_y_min = Math.log(y_min);
  let ln_y_max = Math.log(y_max);
  let ln_y_avg = (ln_y_min + ln_y_max) / 2;
  
  // THE LOG GRAPHS
  bx.RANGE_X(ln_x_min-0.5, ln_x_max+0.5);
  by.RANGE_X(ln_x_min-0.5, ln_x_max+0.5);

  bx.RANGE_Y(ln_y_min-0.5, ln_y_max+0.5);
  by.RANGE_Y(ln_y_min-0.5, ln_y_max+0.5);
  
  b.RANGE_X(0, y_max*scale*1.25);
  b.RANGE_Y(0, y_max*scale*1.25);

}




function update_b(PARAMS, SOLUTIONS) {
  
// actually. i can draw the new hicksian. i have u. alpha. beta.
  
  b.CLEAR_CANVAS();
  b.SHOW_GRID_X({'dx':10});
  b.SHOW_GRID_Y({'dy':10});

  let final_budget_line = b.DRAW_BUDGET_LINE({
    'budget':PARAMS.b.budget,
    'px':PARAMS.b.px,
    'py':PARAMS.b.py,
    'line_width':2,
    'color_string':'#d1e0e0'
  });

  let initial_budget_line = b.DRAW_BUDGET_LINE({
    'budget':PARAMS.a.budget,
    'px':PARAMS.a.px,
    'py':PARAMS.a.py,
    'line_width':2,
    'color_string':'#ffe6b3'
  });
  
  // HICKSIAN
  let final_hicksian_budget_line = b.DRAW_BUDGET_LINE({
    'budget':SOLUTIONS.budget_c,
    'px':PARAMS.b.px,
    'py':PARAMS.b.py,
    'line_width':2,
    'color_string':'#c2d1f0'
  });
  
  // AFTER A PRICE CHANGE (NOT VISIBLE) OR PREFERENCE CHANGE (VISIBLE), THIS IS THE UTILITY CURVE WHICH IS EQUIVALENT TO THE ORIGINAL
  let final_hicksian = b.DRAW_ISOQUANT({
    'alpha':PARAMS.b.alpha,
    'beta':PARAMS.b.beta,
    'u':SOLUTIONS.u_0,
    /*'budget':PARAMS.b.budget,
    'px':PARAMS.b.px,
    'py':PARAMS.b.py,*/
    'line_width':1,
    'color_string':'#c2d1f0'
  });
  
  /*
  // INITIAL HICKSIAN? that your preferences did change, that is like a what change in income? at the old preferences.
  
  // or would the initial hicksian be : take your new marshallian, that is like what change in E ?
  let initial_hicksian = b.DRAW_ISOQUANT({
    'alpha':PARAMS.a.alpha,
    'beta':PARAMS.a.beta,
    'u':SOLUTIONS.u_1,
    'color_string':'#f937'
  });
  */
  
  /*   up */
  
  b.DRAW_POINT({
    'val':{'x':SOLUTIONS.xc_1,'y':SOLUTIONS.yc_1},
    'color_string':'#c2d1f0',
    'rx':4
  });

  let final_marshallian = b.DRAW_ISOQUANT({
    'alpha':PARAMS.b.alpha,
    'beta':PARAMS.b.beta,
    'budget':PARAMS.b.budget,
    'px':PARAMS.b.px,
    'py':PARAMS.b.py,
    'color_string':'#d1e0e0'
  });

  let initial_marshallian = b.DRAW_ISOQUANT({
    'alpha':PARAMS.a.alpha,
    'beta':PARAMS.a.beta,
    'budget':PARAMS.a.budget,
    'px':PARAMS.a.px,
    'py':PARAMS.a.py,
    'color_string':'#ffe6b3'
  });
  

 
};

function update_bx(PARAMS) {
  
  bx.CLEAR_CANVAS();

  bx.SHOW_GRID_Y({'dy':0.5});
  bx.SHOW_GRID_Y({'dy':1,'color_string':'#ccc'});
  bx.SHOW_GRID_X({'dx':0.5,'color_string':'#eee'});
  bx.SHOW_GRID_X({'dx':1,'color_string':'#ccc'});
  
  // bx.SHOW_FLOATING_LOG_X_AXIS();
  
  let drawing = bx.DRAW_DEMAND_CURVE({
    'alpha':[PARAMS.a.alpha,PARAMS.b.alpha],
    'beta':[PARAMS.a.beta,PARAMS.b.beta],
    'budget':[PARAMS.a.budget,PARAMS.b.budget],
    'px':[PARAMS.a.px,PARAMS.b.px],
    'py':[PARAMS.a.py,PARAMS.b.py],
    'marshallian':true,
    'hicksian':true,
    'log':true,
    'x':[1,1],
    'y':[0,0]
  });
};

function update_by(PARAMS) {
  
  by.CLEAR_CANVAS();
  by.SHOW_GRID_X({'dx':0.5});
  by.SHOW_GRID_Y({'dy':0.5});

  let drawing = by.DRAW_DEMAND_CURVE({
    'alpha':[PARAMS.a.alpha,PARAMS.b.alpha],
    'beta':[PARAMS.a.beta,PARAMS.b.beta],
    'budget':[PARAMS.a.budget,PARAMS.b.budget],
    'px':[PARAMS.a.px,PARAMS.b.px],
    'py':[PARAMS.a.py,PARAMS.b.py],
    'marshallian':true,
    'hicksian':true,
    'log':true,
    'x':[0,0],
    'y':[1,1]
  });
};

function update_bxx(PARAMS) {
  
  bxx.CLEAR_CANVAS();
  bxx.SHOW_GRID_X({'dx':2});
  bxx.SHOW_GRID_Y({'dy':10});

  let drawing = bxx.DRAW_DEMAND_CURVE({
    'alpha':[PARAMS.a.alpha,PARAMS.b.alpha],
    'beta':[PARAMS.a.beta,PARAMS.b.beta],
    'budget':[PARAMS.a.budget,PARAMS.b.budget],
    'px':[PARAMS.a.px,PARAMS.b.px],
    'py':[PARAMS.a.py,PARAMS.b.py],
    'marshallian':true,
    'hicksian':true,
    'x':[1,1],
    'y':[0,0]
  });
};


function update_byy(PARAMS) {
  
  byy.CLEAR_CANVAS();
  byy.SHOW_GRID_X({'dx':2});
  byy.SHOW_GRID_Y({'dy':10});

  let drawing = byy.DRAW_DEMAND_CURVE({
    'alpha':[PARAMS.a.alpha,PARAMS.b.alpha],
    'beta':[PARAMS.a.beta,PARAMS.b.beta],
    'budget':[PARAMS.a.budget,PARAMS.b.budget],
    'px':[PARAMS.a.px,PARAMS.b.px],
    'py':[PARAMS.a.py,PARAMS.b.py],
    'marshallian':true,
    'hicksian':true,
    'x':[0,0],
    'y':[1,1]
  });
};


