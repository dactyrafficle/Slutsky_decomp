
// DRAWINGS
let b, bx, by;

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
 b.rangex(-5, 60);
 b.rangey(-5, 60);

 
 bx = new Box('lnpx','lnx');
 document.getElementById('container-bx').appendChild(bx.returnCanvas());
 bx.dimension(400, 400);

 
 by = new Box('lnpy','lny');
 document.getElementById('container-by').appendChild(by.returnCanvas());
 by.dimension(400, 400);
 by.rangex(-2, 7);
 by.rangey(-2, 7);
 by.SHOWGRIDX(1);
 by.SHOWGRIDY(1);
 by.showAxes();
 
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
    b.SHOWGRIDX(10);
    b.SHOWGRIDY(10);
    b.showAxes();
 
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
 
 /* x demand curve */
 
 
let objX = {};
    objX.a = {'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
    objX.b = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)};
    objX.c = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
    
    // NOW, FIND THE CIRCUMCENTER OF OBJ
    let c_x = new circumcircle2(objX.a, objX.b, objX.c);
    let r_x = ((c_x.x - c_x.a.x)**2 + (c_x.y - c_x.a.y)**2)**0.5;

    // RESCALE
    if (r_x) {
     bx.rangex(c_x.x-r_x*3, c_x.x+r_x*3);
     bx.rangey(c_x.y-r_x*3, c_x.y+r_x*3);
    }
    // REDRAW GRIDS
    bx.SHOWGRIDX(1);
    bx.SHOWGRIDY(1);
    bx.showAxes();

           
           
           INITIAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.budget);
           INITIAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.py, INITIAL_UTILITY);
           FINAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.budget);
           FINAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.py, INITIAL_UTILITY);
           
           // THE MARSHALLIAN CURVES WILL BE THE SAME
           
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
           DRAW_ARR(bx, INITIAL_MARSHALLIAN_DEMAND_CURVE, '#fc07', 2);
           
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
           DRAW_ARR(bx, FINAL_MARSHALLIAN_DEMAND_CURVE, '#fc07', 2);
           
           DRAW_ARR(bx, INITIAL_HICKSIAN_DEMAND_CURVE, '#f937', 2);
           DRAW_ARR(bx, FINAL_HICKSIAN_DEMAND_CURVE, '#adc2eb', 2);
           
           
           // INITIAL ALLOCATION (MARSHALLIAN = HICKSIAN)
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)}, '#fc0', 4);
           
           // HICKSIAN RESPONSE TO PRICE CHANGES
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)}, '#adc2eb', 4);
           
           // MARSHALLIAN RESPONSE TO PRICE CHANGES
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)}, '#d1e0e0', 4);
           

           // now do everythings for y thahtdsoghodsjgbasdkgbkasbgk
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
 /* y demand curve */

 // now do everythings for y thahtdsoghodsjgbasdkgbkasbgk
 // INITIAL MARSHALLIAN LOG DEMAND CURVE
 let INITIAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.budget);
 let FINAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.budget);
 DRAW_ARR(by, INITIAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffcc0099', 1);
 DRAW_ARR(by, FINAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffcc0099', 1);
 let INITIAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, (1-PARAMETERS.a.alpha), PARAMETERS.a.px, INITIAL_UTILITY);
 let FINAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, (1-PARAMETERS.b.alpha), PARAMETERS.b.px, INITIAL_UTILITY);
 DRAW_ARR(by, INITIAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 1);
 DRAW_ARR(by, FINAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 1);

 // INITIAL ALLOCATION (MARSHALLIAN = HICKSIAN)
 by.SHOWVALUE({'x':Math.log(PARAMETERS.a.py,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.y,Math.E)}, '#ffcc0099', 3);
 
 //by.SHOWVALUE({'x':Math.log(PARAMETERS.a.py,Math.E),'y':Math.log(INITIAL_HICKSIAN_ALLOCATION.y,Math.E)}, '#ffcc0099', 3);
 
 // HICKSIAN RESPONSE TO PRICE CHANGES
 by.SHOWVALUE({'x':Math.log(PARAMETERS.b.py,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.y,Math.E)}, '#adc2eb', 3);
 
 // MARSHALLIAN RESPONSE TO PRICE CHANGES
 by.SHOWVALUE({'x':Math.log(PARAMETERS.b.py,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.y,Math.E)}, '#adc2eb', 3);



  
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
    b.SHOWGRIDX(10);
    b.SHOWGRIDY(10);
    b.showAxes();
    
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

    let objX = {};
    objX.a = {'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
    objX.b = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)};
    objX.c = {'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)};
    
    // NOW, FIND THE CIRCUMCENTER OF OBJ
    let c_x = new circumcircle2(objX.a, objX.b, objX.c);
    let r_x = ((c_x.x - c_x.a.x)**2 + (c_x.y - c_x.a.y)**2)**0.5;

    // RESCALE
    if (r_x) {
     bx.rangex(c_x.x-r_x*3, c_x.x+r_x*3);
     bx.rangey(c_x.y-r_x*3, c_x.y+r_x*3);
    }
    // REDRAW GRIDS
    bx.SHOWGRIDX(1);
    bx.SHOWGRIDY(1);
    bx.showAxes();

           
           
           INITIAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.budget);
           INITIAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.a.alpha, PARAMETERS.a.py, INITIAL_UTILITY);
           FINAL_MARSHALLIAN_DEMAND_CURVE = GET_MARSHALLIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.budget);
           FINAL_HICKSIAN_DEMAND_CURVE = GET_HICKSIAN_LOG_DEMAND_CURVE(bx, PARAMETERS.b.alpha, PARAMETERS.b.py, INITIAL_UTILITY);
           
           // THE MARSHALLIAN CURVES WILL BE THE SAME
           
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
           DRAW_ARR(bx, INITIAL_MARSHALLIAN_DEMAND_CURVE, '#fc07', 2);
           
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
           DRAW_ARR(bx, FINAL_MARSHALLIAN_DEMAND_CURVE, '#fc07', 2);
           
           DRAW_ARR(bx, INITIAL_HICKSIAN_DEMAND_CURVE, '#f937', 2);
           DRAW_ARR(bx, FINAL_HICKSIAN_DEMAND_CURVE, '#adc2eb', 2);
           
           
           // INITIAL ALLOCATION (MARSHALLIAN = HICKSIAN)
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.a.px,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.x,Math.E)}, '#fc0', 4);
           
           // HICKSIAN RESPONSE TO PRICE CHANGES
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.x,Math.E)}, '#adc2eb', 4);
           
           // MARSHALLIAN RESPONSE TO PRICE CHANGES
           bx.SHOWVALUE({'x':Math.log(PARAMETERS.b.px,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.x,Math.E)}, '#d1e0e0', 4);
           

           // now do everythings for y thahtdsoghodsjgbasdkgbkasbgk
           // INITIAL MARSHALLIAN LOG DEMAND CURVE
         


         
    // RESCALE by TO MAKE ALL 3 DOTS LIE ON A CIRCLE
    // CAPTURE CONDITION WHERE 2 POINTS ARE THE SAME, TO KEEP IT FROM BUGGING OUT
    // CAPTURE CONDITION WHERE 2 POINTS ARE SO CLOSE, MAKING THE CIRCLE TOO BIG
    // PUT SOME KIND OF TESTING CONDITION

    let obj = {};
    obj.a = {'x':Math.log(PARAMETERS.a.py,Math.E), 'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.y,Math.E)};
    obj.b = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_HICKSIAN_ALLOCATION.y,Math.E)};
    obj.c = {'x':Math.log(PARAMETERS.b.py,Math.E), 'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.y,Math.E)};


    // NOW, FIND THE CIRCUMCENTER OF OBJ
    let c = new circumcircle2(obj.a, obj.b, obj.c);
    let r = ((c.x - c.a.x)**2 + (c.y - c.a.y)**2)**0.5;

    // RESCALE
    if (r) {
     by.rangex(c.x-r*3, c.x+r*3);
     by.rangey(c.y-r*3, c.y+r*3);
    }
    
    // angles of triangle can play a role too
    // if you have big angles, then we need to shift closer to r (since r will be very large)
    // if equal 60-60-60, we can move closer to 3r
    
 
    // REDRAW GRIDS
    by.SHOWGRIDX(1);
    by.SHOWGRIDY(1);
    by.showAxes();

    // RECALC CURVES, THE RANGE HERE DEPENDS ON BOX RANGE
    let INITIAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.budget);
    let FINAL_MARSHALLIAN_DEMAND_CURVE_Y = GET_MARSHALLIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.budget); 
    let INITIAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.a.alpha), PARAMETERS.a.px, INITIAL_UTILITY);
    let FINAL_HICKSIAN_DEMAND_CURVE_Y = GET_HICKSIAN_LOG_DEMAND_CURVE(by, (1-PARAMETERS.b.alpha), PARAMETERS.b.px, INITIAL_UTILITY);

    
    // this is all about showing the circumcenter
    /* 
    by.SHOWVALUE(c, '#ffe670', 3);
    let c_pixel = by.VAL2PIXEL(c);
    by.ctx.beginPath();
    by.ctx.arc(c_pixel.x, c_pixel.y, r*by.data.zoom.x, 0, 2 * Math.PI);
    by.ctx.stroke();
    */
 
    // REDRAW THE CURVES
    DRAW_ARR(by, INITIAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffcc0099', 1);
    DRAW_ARR(by, FINAL_MARSHALLIAN_DEMAND_CURVE_Y, '#ffcc0099', 1);
    DRAW_ARR(by, INITIAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 1);
    DRAW_ARR(by, FINAL_HICKSIAN_DEMAND_CURVE_Y, '#adc2eb', 1);

    // REDRAW THE POINTS
    by.SHOWVALUE({'x':Math.log(PARAMETERS.a.py,Math.E),'y':Math.log(INITIAL_MARSHALLIAN_ALLOCATION.y,Math.E)}, '#ffcc0099', 3);
    by.SHOWVALUE({'x':Math.log(PARAMETERS.b.py,Math.E),'y':Math.log(FINAL_HICKSIAN_ALLOCATION.y,Math.E)}, '#adc2eb', 3);
    by.SHOWVALUE({'x':Math.log(PARAMETERS.b.py,Math.E),'y':Math.log(FINAL_MARSHALLIAN_ALLOCATION.y,Math.E)}, '#adc2eb', 3);
     
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