
// THE BOXES
let b, bx, by;

let b_auto_rescale = false;
let bx_auto_rescale = true;
let by_auto_rescale = true;


// VERTICES DEFINING THE CIRCUMCIRCLES
let v = {'a':{},'b':{},'c':{}};
let vx = {'a':{},'b':{},'c':{}};
let vy = {'a':{},'b':{},'c':{}}; 

// PARAMETERS
let PARAMETERS;

// MARSHALLIAN ALLOCATIONS
let INITIAL_MARSHALLIAN_ALLOCATION;
let FINAL_MARSHALLIAN_ALLOCATION

// UTILITIES
let INITIAL_UTILITY;
let FINAL_UTILITY;

// HICKSIAN ALLOCATIONS
let INITIAL_HICKSIAN_ALLOCATION;
let FINAL_HICKSIAN_ALLOCATION;

// EXPENDITURES
let INITIAL_EXPENDITURE;
let FINAL_EXPENDITURE;

// ISOQUANTS, DRAW ON b
let INITIAL_ISOQUANT;
let FINAL_ISOQUANT;

let INITIAL_BUDGET_LINE;
let HICKSIAN_BUDGET_LINE;
let FINAL_BUDGET_LINE;

// DEMAND CURVES, DRAW ON bx
let INITIAL_MARSHALLIAN_DEMAND_CURVE;
let INITIAL_HICKSIAN_DEMAND_CURVE;
let FINAL_MARSHALLIAN_DEMAND_CURVE;
let FINAL_HICKSIAN_DEMAND_CURVE;

// LOG DEMAND CURVES
let INITIAL_MARSHALLIAN_LOG_DEMAND_CURVE;
let INITIAL_HICKSIAN_LOG_DEMAND_CURVE;
let FINAL_MARSHALLIAN_LOG_DEMAND_CURVE;
let FINAL_HICKSIAN_LOG_DEMAND_CURVE;

window.addEventListener('load', function(e) {

 console.log(e);

 // SETUP
 b = new Box('x','y');
 document.getElementById('container-b').appendChild(b.returnCanvas());
 b.dimension(700, 700);
 // b.maps.push(['**',['/',23.05,['**',['get','x'],['get','b.alpha']]],['/',1,['-',1,['get','b.alpha']]]]);
 b.maps.push(['**',['/',['*',['*',['get','b.budget'],['**',['/',['get','b.alpha'],['get','b.px']],['get','b.alpha']]],['**',['/',['-',1,['get','b.alpha']],['get','b.py']],['-',1,['get','b.alpha']]]],['**',['get','x'],['get','b.alpha']]],['/',1,['-',1,['get','b.alpha']]]]);

 // utility
 // ['*',['*',['get','b.budget'],['**',['/',['get','b.alpha'],['get','b.px']],['get','b.alpha']]],['**',['/',['-',1,['get','b.alpha']],['get','b.py']],['-',1,['get','b.alpha']]]]

 // x piece
 // ['**',['/',['get','b.alpha'],['get','b.px']],['get','b.alpha']]

 // y piece 
 // ['**',['/',['-',1,['get','b.alpha']],['get','b.py']],['-',1,['get','b.alpha']]]
 
 
 
 

 bx = new Box('lnpx','lnx');
 document.getElementById('container-bx').appendChild(bx.returnCanvas());
 bx.dimension(430, 430);

 by = new Box('lnpy','lny');
 document.getElementById('container-by').appendChild(by.returnCanvas());
 by.dimension(430, 430);

 
 PARAMETERS = UPDATE_PARAMETERS();
 
 INITIAL_MARSHALLIAN_ALLOCATION = GET_MARSHALLIAN_ALLOCATION(PARAMETERS.a);
 FINAL_MARSHALLIAN_ALLOCATION = GET_MARSHALLIAN_ALLOCATION(PARAMETERS.b);
 
 INITIAL_UTILITY = INITIAL_MARSHALLIAN_ALLOCATION.u;
 FINAL_UTILITY = FINAL_MARSHALLIAN_ALLOCATION.u;
 
 INITIAL_HICKSIAN_ALLOCATION = GET_HICKSIAN_ALLOCATION(PARAMETERS.a, INITIAL_UTILITY);
 FINAL_HICKSIAN_ALLOCATION = GET_HICKSIAN_ALLOCATION(PARAMETERS.b, INITIAL_UTILITY);

 INITIAL_EXPENDITURE = INITIAL_HICKSIAN_ALLOCATION.e;
 FINAL_EXPENDITURE = FINAL_HICKSIAN_ALLOCATION.e;

 //UPDATE_PARAMETER_TABLE(PARAMETERS);
 UPDATE_RESULTS_TABLE();
 
     // WHAT IS THE MAX Y-INTERCEPT?
    let YMAX = 0;
    if (PARAMETERS.a.budget/PARAMETERS.a.py > YMAX) {
      YMAX = PARAMETERS.a.budget/PARAMETERS.a.py
    }
    if (PARAMETERS.b.budget/PARAMETERS.b.py > YMAX) {
      YMAX = PARAMETERS.b.budget/PARAMETERS.b.py;
    }
    if (FINAL_EXPENDITURE/PARAMETERS.b.py > YMAX) {
      YMAX = FINAL_EXPENDITURE/PARAMETERS.b.py;
    }
    let XMAX = 0;
    if (PARAMETERS.a.budget/PARAMETERS.a.px > XMAX) {
      XMAX = PARAMETERS.a.budget/PARAMETERS.a.px;
    }
    if (PARAMETERS.b.budget/PARAMETERS.b.px > XMAX) {
      XMAX = PARAMETERS.b.budget/PARAMETERS.b.px;
    }
    if (FINAL_EXPENDITURE/PARAMETERS.b.px > XMAX) {
      XMAX = FINAL_EXPENDITURE/PARAMETERS.b.px;
    }
    
    b.rangey(-5, YMAX*1.1);
    b.rangex(-5, XMAX*1.1);

    // REDRAW GRIDS
    b.SHOW_GRID_X(10);
    b.SHOW_GRID_Y(10);
    b.showAxes();

    b.draw();
    
 
           INITIAL_ISOQUANT = GET_ISOQUANT(b, INITIAL_UTILITY, PARAMETERS.a.alpha);
           FINAL_ISOQUANT = GET_ISOQUANT(b, FINAL_UTILITY, PARAMETERS.b.alpha);
           
           INITIAL_BUDGET_LINE = [[{'x':0, 'y':PARAMETERS.a.budget/PARAMETERS.a.py},{'x':PARAMETERS.a.budget/PARAMETERS.a.px, 'y':0}]];
           FINAL_BUDGET_LINE = [[{'x':0, 'y':PARAMETERS.b.budget/PARAMETERS.b.py},{'x':PARAMETERS.b.budget/PARAMETERS.b.px, 'y':0}]];
           HICKSIAN_BUDGET_LINE = [[{'x':0, 'y':FINAL_EXPENDITURE/PARAMETERS.b.py},{'x':FINAL_EXPENDITURE/PARAMETERS.b.px, 'y':0}]];


           DRAW_ARR(b, INITIAL_ISOQUANT, '#fc07', 2); 
           DRAW_ARR(b, FINAL_ISOQUANT, '#d1e0e0', 2);
           
           DRAW_ARR(b, INITIAL_BUDGET_LINE, '#fc07', 2);
           DRAW_ARR(b, FINAL_BUDGET_LINE, '#d1e0e0', 2);
           DRAW_ARR(b, HICKSIAN_BUDGET_LINE, '#adc2eb', 2);

           // SHOW VALUES
           b.SHOWVALUE({'x':INITIAL_MARSHALLIAN_ALLOCATION.x,'y':INITIAL_MARSHALLIAN_ALLOCATION.y}, '#fc07', 4);
           b.SHOWVALUE({'x':FINAL_MARSHALLIAN_ALLOCATION.x,'y':FINAL_MARSHALLIAN_ALLOCATION.y}, '#d1e0e0', 4);
           b.SHOWVALUE(FINAL_HICKSIAN_ALLOCATION, '#adc2eb', 4);
 
      // LOG DEMAND OF X

      // UPDATE VERTICES
      vx.a = {'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
      vx.b = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)};
      vx.c = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)};

      // RESCALE
      RESCALE_BASED_ON_CIRCUMCIRCLE(bx, vx);
      // RESCALE_BASED_ON_CENTROID(bx, vx);

      // REDRAW GRIDS
      bx.SHOW_GRID_X(1);
      bx.SHOW_GRID_Y(1);
      

      // UPDATE DEMAND CURVES    
      INITIAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.budget);
      INITIAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.py, INITIAL_UTILITY);
      FINAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.budget);
      FINAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.py, INITIAL_UTILITY);

      // REDRAW DEMAND CURVES 
      DRAW_ARR(bx, FINAL_MARSHALLIAN_DEMAND_CURVE, '#d1e0e0', 2);
      DRAW_ARR(bx, INITIAL_MARSHALLIAN_DEMAND_CURVE, '#ffe066', 2);
      DRAW_ARR(bx, INITIAL_HICKSIAN_DEMAND_CURVE, '#f937', 2);
      DRAW_ARR(bx, FINAL_HICKSIAN_DEMAND_CURVE, '#adc2eb', 2);

      // REDRAW ALLOCATIONS
      bx.SHOWVALUE(vx.b, '#adc2eb', 4);
      bx.SHOWVALUE(vx.c, '#d1e0e0', 4); 
      bx.SHOWVALUE(vx.a, '#fc0', 4);

      bx.SHOW_FLOATING_LOG_Y_AXIS();
      bx.SHOW_FLOATING_LOG_X_AXIS();
      
      // LOG DEMAND OF Y

      // UPDATE VERTICES
      vy.a = {'x':Math.log(PARAMETERS.a.py,Math.E), 'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.y,Math.E)};
      vy.b = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_HICKSIAN_ALLOCATION.y,Math.E)};
      vy.c = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.y,Math.E)};

      // RESCALE
      RESCALE_BASED_ON_CIRCUMCIRCLE(by, vy);
      //RESCALE_BASED_ON_CENTROID(by, vy);

      // REDRAW GRIDS
      by.SHOW_GRID_X(1);
      by.SHOW_GRID_Y(1);
      

      // UPDATE DEMAND CURVES
      let INITIAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.budget);
      let FINAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.budget); 
      let INITIAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.px, INITIAL_UTILITY);
      let FINAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.px, INITIAL_UTILITY);

      // REDRAW DEMAND CURVES 
      DRAW_ARR(by, FINAL_MARSHALLIAN_DEMAND_CURVE_Y, '#d1e0e0', 2);
      DRAW_ARR(by, INITIAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffe066', 2);
      DRAW_ARR(by, INITIAL_HICKSIAN_DEMAND_CURVE_Y, '#f937', 2);
      DRAW_ARR(by, FINAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 2);

      // REDRAW ALLOCATIONS
      by.SHOWVALUE(vy.b, '#adc2eb', 4);
      by.SHOWVALUE(vy.c, '#d1e0e0', 4); 
      by.SHOWVALUE(vy.a, '#fc0', 4);

      by.SHOW_FLOATING_LOG_Y_AXIS();
      by.SHOW_FLOATING_LOG_X_AXIS();
      
 let myinputs = document.getElementsByClassName('myinputs');
 for (let i = 0; i < myinputs.length; i++) {
   myinputs[i].addEventListener('input', function(e) {
     
      b.clear();
      bx.clear();
      by.clear();

      
           PARAMETERS = UPDATE_PARAMETERS();
           
           INITIAL_MARSHALLIAN_ALLOCATION = GET_MARSHALLIAN_ALLOCATION(PARAMETERS.a);
           FINAL_MARSHALLIAN_ALLOCATION = GET_MARSHALLIAN_ALLOCATION(PARAMETERS.b);
           
           INITIAL_UTILITY = INITIAL_MARSHALLIAN_ALLOCATION.u;
           FINAL_UTILITY = FINAL_MARSHALLIAN_ALLOCATION.u;
           
           INITIAL_HICKSIAN_ALLOCATION = GET_HICKSIAN_ALLOCATION(PARAMETERS.a, INITIAL_UTILITY);
           FINAL_HICKSIAN_ALLOCATION = GET_HICKSIAN_ALLOCATION(PARAMETERS.b, INITIAL_UTILITY);

           INITIAL_EXPENDITURE = INITIAL_HICKSIAN_ALLOCATION.e;
           FINAL_EXPENDITURE = FINAL_HICKSIAN_ALLOCATION.e;

           //UPDATE_PARAMETER_TABLE(PARAMETERS);
           UPDATE_RESULTS_TABLE();


    // WHAT IS THE MAX Y-INTERCEPT?
    let YMAX = 0;
    if (PARAMETERS.a.budget/PARAMETERS.a.py > YMAX) {
      YMAX = PARAMETERS.a.budget/PARAMETERS.a.py
    }
    if (PARAMETERS.b.budget/PARAMETERS.b.py > YMAX) {
      YMAX = PARAMETERS.b.budget/PARAMETERS.b.py;
    }
    if (FINAL_EXPENDITURE/PARAMETERS.b.py > YMAX) {
      YMAX = FINAL_EXPENDITURE/PARAMETERS.b.py;
    }
    let XMAX = 0;
    if (PARAMETERS.a.budget/PARAMETERS.a.px > XMAX) {
      XMAX = PARAMETERS.a.budget/PARAMETERS.a.px;
    }
    if (PARAMETERS.b.budget/PARAMETERS.b.px > XMAX) {
      XMAX = PARAMETERS.b.budget/PARAMETERS.b.px;
    }
    if (FINAL_EXPENDITURE/PARAMETERS.b.px > XMAX) {
      XMAX = FINAL_EXPENDITURE/PARAMETERS.b.px;
    }
    
    b.rangey(-5, YMAX*1.1);
    b.rangex(-5, XMAX*1.1);
    
    // REDRAW GRIDS
    b.SHOW_GRID_X(10);
    b.SHOW_GRID_Y(10);
    b.showAxes();
    b.draw();
    
           INITIAL_ISOQUANT = GET_ISOQUANT(b, INITIAL_UTILITY, PARAMETERS.a.alpha);
           FINAL_ISOQUANT = GET_ISOQUANT(b, FINAL_UTILITY, PARAMETERS.b.alpha);
           
           INITIAL_BUDGET_LINE = [[{'x':0, 'y':PARAMETERS.a.budget/PARAMETERS.a.py},{'x':PARAMETERS.a.budget/PARAMETERS.a.px, 'y':0}]];
           FINAL_BUDGET_LINE = [[{'x':0, 'y':PARAMETERS.b.budget/PARAMETERS.b.py},{'x':PARAMETERS.b.budget/PARAMETERS.b.px, 'y':0}]];
           HICKSIAN_BUDGET_LINE = [[{'x':0, 'y':FINAL_EXPENDITURE/PARAMETERS.b.py},{'x':FINAL_EXPENDITURE/PARAMETERS.b.px, 'y':0}]];


           DRAW_ARR(b, INITIAL_ISOQUANT, '#fc07', 2); 
           DRAW_ARR(b, FINAL_ISOQUANT, '#d1e0e0', 2);
           
           DRAW_ARR(b, INITIAL_BUDGET_LINE, '#fc07', 2);
           DRAW_ARR(b, FINAL_BUDGET_LINE, '#d1e0e0', 2);
           DRAW_ARR(b, HICKSIAN_BUDGET_LINE, '#adc2eb', 2);

           // SHOW VALUES
           b.SHOWVALUE({'x':INITIAL_MARSHALLIAN_ALLOCATION.x,'y':INITIAL_MARSHALLIAN_ALLOCATION.y}, '#fc07', 4);
           b.SHOWVALUE({'x':FINAL_MARSHALLIAN_ALLOCATION.x,'y':FINAL_MARSHALLIAN_ALLOCATION.y}, '#d1e0e0', 4);
           b.SHOWVALUE(FINAL_HICKSIAN_ALLOCATION, '#adc2eb', 4);



      // LOG DEMAND OF X

      // UPDATE VERTICES
      vx.a = {'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
      vx.b = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)};
      vx.c = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)};

      // RESCALE
      if (bx_auto_rescale) {
        // RESCALE_BASED_ON_CIRCUMCIRCLE(bx, vx);
        RESCALE_BASED_ON_CENTROID(bx, vx);
      }
      
      
      // REDRAW GRIDS
      bx.SHOW_GRID_X(1);
      bx.SHOW_GRID_Y(1);
      

      // UPDATE DEMAND CURVES    
      INITIAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.budget);
      INITIAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.py, INITIAL_UTILITY);
      FINAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.budget);
      FINAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.py, INITIAL_UTILITY);

      // REDRAW DEMAND CURVES 
      DRAW_ARR(bx, FINAL_MARSHALLIAN_DEMAND_CURVE, '#d1e0e0', 2);
      DRAW_ARR(bx, INITIAL_MARSHALLIAN_DEMAND_CURVE, '#ffe066', 2);
      DRAW_ARR(bx, INITIAL_HICKSIAN_DEMAND_CURVE, '#f937', 2);
      DRAW_ARR(bx, FINAL_HICKSIAN_DEMAND_CURVE, '#adc2eb', 2);

      // REDRAW ALLOCATIONS
      bx.SHOWVALUE(vx.b, '#adc2eb', 4);
      bx.SHOWVALUE(vx.c, '#d1e0e0', 4); 
      bx.SHOWVALUE(vx.a, '#fc0', 4);

      bx.SHOW_FLOATING_LOG_Y_AXIS();
      bx.SHOW_FLOATING_LOG_X_AXIS();
      // LOG DEMAND OF Y

      // UPDATE VERTICES
      vy.a = {'x':Math.log(PARAMETERS.a.py,Math.E), 'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.y,Math.E)};
      vy.b = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_HICKSIAN_ALLOCATION.y,Math.E)};
      vy.c = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.y,Math.E)};

      // RESCALE
      if (by_auto_rescale) {
       // RESCALE_BASED_ON_CIRCUMCIRCLE(by, vy);
       RESCALE_BASED_ON_CENTROID(by, vy);
      }
      
      // REDRAW GRIDS
      by.SHOW_GRID_X(1);
      by.SHOW_GRID_Y(1);
      

      // UPDATE DEMAND CURVES
      let INITIAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.budget);
      let FINAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.budget); 
      let INITIAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.px, INITIAL_UTILITY);
      let FINAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.px, INITIAL_UTILITY);

      // REDRAW DEMAND CURVES 
      DRAW_ARR(by, FINAL_MARSHALLIAN_DEMAND_CURVE_Y, '#d1e0e0', 2);
      DRAW_ARR(by, INITIAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffe066', 2);
      DRAW_ARR(by, INITIAL_HICKSIAN_DEMAND_CURVE_Y, '#f937', 2);
      DRAW_ARR(by, FINAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 2);

      // REDRAW ALLOCATIONS
      by.SHOWVALUE(vy.b, '#adc2eb', 4);
      by.SHOWVALUE(vy.c, '#d1e0e0', 4); 
      by.SHOWVALUE(vy.a, '#fc0', 4);
    
      by.SHOW_FLOATING_LOG_Y_AXIS();
      by.SHOW_FLOATING_LOG_X_AXIS();
   });
 }



 function GET_ISOQUANT(b, UTILITY, ALPHA) {

  let output = [];
  let dx = 0.25;
  for (let x = dx; x < b.data.range.x.max; x += dx) {
 
   let x0 = x;
   let x1 = x+dx;
   let y0 = (UTILITY/x0**ALPHA)**(1/(1-ALPHA));
   let y1 = (UTILITY/x1**ALPHA)**(1/(1-ALPHA));
   
   output.push([{'x':x0,'y':y0},{'x':x1,'y':y1}]);

  }
  return output;
 }
 
 function DRAW_ISOQUANT(ISOQUANT, COLOR_STRING) {
   
   for (let i = 0; i < ISOQUANT.length; i++) {
     
     let pixel0 = b.VAL2PIXEL(ISOQUANT[i][0]);
     let pixel1 = b.VAL2PIXEL(ISOQUANT[i][1]);
     
    b.ctx.strokeStyle = COLOR_STRING;
    b.ctx.beginPath();
    b.ctx.moveTo(pixel0.x, pixel0.y);
    b.ctx.lineTo(pixel1.x, pixel1.y);
    b.ctx.stroke(); 
   }
   
 }
 
 function GET_LOG_DEMAND(bx, alpha, budget) {

  let output = [];
  let dx = 0.25;
  for (let x = dx; x < bx.data.range.x.max; x += dx) {
 
   let x0 = x;
   let x1 = x+dx;
   let y0 = Math.log(alpha*budget,Math.E);
   let y1 = (UTILITY/x1**ALPHA)**(1/(1-ALPHA));
   
   output.push([{'x':x0,'y':y0},{'x':x1,'y':y1}]);

  }
  return output;
 }
 
 function DRAW_ARR(box, ARR, COLOR_STRING, LINE_WIDTH) {
   
   for (let i = 0; i < ARR.length; i++) {
     
    let pixel0 = box.VAL2PIXEL(ARR[i][0]);
    let pixel1 = box.VAL2PIXEL(ARR[i][1]);
  
    box.ctx.strokeStyle = COLOR_STRING;
    box.ctx.lineWidth = LINE_WIDTH;
    box.ctx.beginPath();
    box.ctx.moveTo(pixel0.x, pixel0.y);
    box.ctx.lineTo(pixel1.x, pixel1.y);
    box.ctx.stroke(); 
   }
   
 }
 
 function GET_LOG_H_DEMAND(bx, ALPHA, PY, U0) {

  let output = [];
  let dpx = 0.25;
  for (let px = dpx; x < bx.data.range.x.max; px += dpx) {
 
   let x0 = px;
   let x1 = px+dpx;
   let y0 = Math.log(U0,Math.E) + (1-ALPHA)*Math.log(PY*ALPHA/(px*(1-ALPHA)));
   let y1 = (UTILITY/x1**ALPHA)**(1/(1-ALPHA));
   
   output.push([{'x':x0,'y':y0},{'x':x1,'y':y1}]);

  }
  return output;
 }




}); // CLOSING ONLOAD



/*

*/


/*

 a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
 
 // DEMAND CURVES X
 let b = new Box('x','px');
 document.getElementById('container-b').appendChild(b.returnCanvas());
 b.dimension(700, 300);
 b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);

 // DEMAND CURVES Y
 let c = new Box('y','py');
 document.getElementById('container-c').appendChild(c.returnCanvas());
 c.dimension(700, 300);
 c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 
 // EVENT LISTENERS
 
 // CHANGE PX
 document.getElementById('input_px_initial').addEventListener('input', function(e) {
  px = constrainValue(this);
  document.getElementById('px_initial').innerHTML = px;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
  
 });

});
*/

function constrainValue(input_el) {
 let val = parseFloat(input_el.value);
 let min = parseFloat(input_el.min);
 let max = parseFloat(input_el.max);
 if (val > max) {
  val = max;
 }
 if (val < min) {
  val = min;
 }
 return val;

}