
window.onload = function() {

 // SETUP
 let a = new Box('x','y');
 document.getElementById('container-a').appendChild(a.returnCanvas());
 a.dimension(700, 700);
 
 // MAIN
 let alpha = parseFloat(document.getElementById('input_alpha_initial').value);
 let m = parseFloat(document.getElementById('input_budget_initial').value);
 let px = parseFloat(document.getElementById('input_px_initial').value);
 let py = parseFloat(document.getElementById('input_py_initial').value);
 
 let alpha2 = alpha;
 let m2 = m;
 let px2 = parseFloat(document.getElementById('input_px_final').value);
 let py2 = parseFloat(document.getElementById('input_py_final').value);
 
 document.getElementById('alpha_initial').innerHTML = alpha.toFixed(3);
 document.getElementById('budget_initial').innerHTML = m.toFixed(0);
 document.getElementById('px_initial').innerHTML = px.toFixed(2);
 document.getElementById('py_initial').innerHTML = py.toFixed(2);
 
 document.getElementById('alpha_final').innerHTML = alpha.toFixed(3);
 document.getElementById('budget_final').innerHTML = m.toFixed(0);
 document.getElementById('px_final').innerHTML = px2.toFixed(2);
 document.getElementById('py_final').innerHTML = py2.toFixed(2);

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
 
 document.getElementById('input_px_final').addEventListener('input', function(e) {
  px2 = constrainValue(this);
  document.getElementById('px_final').innerHTML = px2;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 });
 
 // CHANGE PY
 document.getElementById('input_py_initial').addEventListener('input', function(e) {
  py = constrainValue(this);
  document.getElementById('py_initial').innerHTML = py;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 });
 
 document.getElementById('input_py_final').addEventListener('input', function(e) {
  py2 = constrainValue(this);
  document.getElementById('py_final').innerHTML = py2;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 });
 
 document.getElementById('input_alpha_initial').addEventListener('input', function(e) {
  alpha = constrainValue(this);
  alpha2 = alpha;
  alpha_initial.innerHTML = alpha;
  alpha_final.innerHTML = alpha;
  document.getElementById('input_alpha_final').value = alpha;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 });
 
 document.getElementById('input_budget_initial').addEventListener('input', function(e) {
  m = constrainValue(this);
  m2 = m;
  budget_initial.innerHTML = m;
  budget_final.innerHTML = m;
  document.getElementById('input_budget_final').value = m;
  
  a.clear();
  a.showCompare(alpha, m, px, py, alpha2, m2, px2, py2);
  b.clear();
  b.updateDemandCurves(alpha, m, px, py, alpha2, m2, px2, py2);
  c.clear();
  c.updateDemandCurves((1-alpha), m, py, px, (1-alpha2), m2, py2, px2);
 });

}

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