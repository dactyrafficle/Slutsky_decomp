function Box(label_x, label_y) {
 this.c = document.createElement('canvas');
 this.ctx = this.c.getContext('2d');
 
 this.data = {
  'dimension':{'w':100,'h':100},
  'zoom':{'x':10,'y':10},
  'translate':{'x':5,'y':5},
  'label':{'x':label_x,'y':label_y}
 }
}
Box.prototype.returnCanvas = function() {
 return this.c;
}


Box.prototype.dimension = function(w, h) {
 this.data.dimension.w = w;
 this.data.dimension.h = h; 
 this.c.width = this.data.dimension.w;
 this.c.height = this.data.dimension.h;
}
Box.prototype.zoom = function(zx, zy) {
 this.data.zoom.x = zx;
 this.data.zoom.y = zy;
}
Box.prototype.translate = function(x, y) {
 this.data.translate.x = x;
 this.data.translate.y = y; 
}
Box.prototype.VAL2PIXEL = function(val) {
 return {
  'x':(val.x+this.data.translate.x)*this.data.zoom.x,
  'y':this.data.dimension.h - (val.y+this.data.translate.y)*this.data.zoom.y
 }
}
Box.prototype.PIXEL2VAL = function(pixel) {
 return {
  'x':(pixel.x/this.data.zoom.x)-this.data.translate.x,
  'y':(this.data.dimension.h-pixel.y)*this.data.zoom.y-this.data.translate.y
 }
}
Box.prototype.clear = function() {
 this.ctx.fillStyle = '#fff';
 this.ctx.beginPath();
 this.ctx.rect(0, 0, this.data.dimension.w, this.data.dimension.h);
 this.ctx.fill();
}

Box.prototype.showAxes = function() {

 this.ctx.strokeStyle = '#333';
 
 this.ctx.beginPath();
 this.ctx.moveTo((0+this.data.translate.x)*this.data.zoom.x, 0);
 this.ctx.lineTo((0+this.data.translate.x)*this.data.zoom.x, this.data.dimension.h);
 this.ctx.stroke();
 
 // X AXIS LABEL
 this.ctx.fillStyle = '#333';
 this.ctx.font = this.data.dimension.w/100*3.5 + 'px Monospace';
 this.ctx.textAlign = "right";
 this.ctx.fillText(this.data.label.y, this.data.translate.x*this.data.zoom.x-this.data.dimension.w/100, this.data.translate.x*this.data.zoom.x);

 // X AXIS
 this.ctx.beginPath();
 this.ctx.moveTo(0, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y);
 this.ctx.lineTo(this.data.dimension.w, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y);
 this.ctx.stroke();
 
 // X AXIS LABEL
 this.ctx.fillStyle = '#333';
 this.ctx.font = this.data.dimension.w/100*3.5 + 'px Monospace';
 this.ctx.fillText(this.data.label.x, this.data.dimension.w-(0+this.data.translate.x)*this.data.zoom.x, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y + this.data.dimension.w/100*3.5);
}



Box.prototype.showBudgetLine = function(m, px, py, colorstring) {

 let intercept = {
  'x':this.VAL2PIXEL({'x':m/px,'y':0}),
  'y':this.VAL2PIXEL({'x':0,'y':m/py})
 }

 this.ctx.strokeStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.moveTo(intercept.y.x, intercept.y.y);
 this.ctx.lineTo(intercept.x.x, intercept.x.y);
 this.ctx.stroke();

}

Box.prototype.calculateMarshallianDemandAllocation = function(alpha, m, px, py) {

 return {
  'x': alpha*m/px,
  'y': (1-alpha)*m/py,
  'u': (alpha*m/px)**alpha*((1-alpha)*m/py)**(1-alpha)
 }

}

Box.prototype.calculateHicksianDemandAllocation = function(alpha, u, px, py) {

 return {
  'x': u*(py*alpha/(px*(1-alpha)))**(1-alpha),
  'y': u*((px/py)*((1-alpha)/alpha))**(alpha),
  'm': px*(u*(py*alpha/(px*(1-alpha)))**(1-alpha)) + py*(u*((px/py)*((1-alpha)/alpha))**(alpha))
 }

}

Box.prototype.showAllocation = function(x, y, colorstring) {

 let pixel = this.VAL2PIXEL({'x':x,'y':y});

 this.ctx.fillStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.arc(pixel.x, pixel.y, 3, 0, 2*Math.PI);
 this.ctx.fill();

}

Box.prototype.showAllocationBox = function(x, y, colorstring) {

 let pixel1 = this.VAL2PIXEL({'x':0,'y':y});
 let pixel2 = this.VAL2PIXEL({'x':x,'y':y});
 let pixel3 = this.VAL2PIXEL({'x':x,'y':0});
 
 this.ctx.strokeStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.moveTo(pixel1.x, pixel1.y);
 this.ctx.lineTo(pixel2.x, pixel2.y);
 this.ctx.stroke();
 
 
 
 this.ctx.strokeStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.moveTo(pixel2.x, pixel2.y);
 this.ctx.lineTo(pixel3.x, pixel3.y);
 this.ctx.stroke(); 
}

Box.prototype.showUtility = function(u, alpha, colorstring) {
 
 for (let x = 0; x < this.data.dimension.w; x += 2) {
 
   let val1 =  this.PIXEL2VAL({'x':x,'y':0});
   let val2 =  this.PIXEL2VAL({'x':x+2,'y':0});
   val1.y = (u/val1.x**alpha)**(1/(1-alpha));
   val2.y = (u/val2.x**alpha)**(1/(1-alpha));
   let pixel1 = this.VAL2PIXEL(val1);
   let pixel2 = this.VAL2PIXEL(val2);
   
   this.ctx.strokeStyle = colorstring;
   this.ctx.beginPath();
   this.ctx.moveTo(pixel1.x, pixel1.y);
   this.ctx.lineTo(pixel2.x, pixel2.y);
   this.ctx.stroke();  
 }
}

Box.prototype.VAL2LOGVAL = function(val) {
  return {
    'x':Math.log(val.x,Math.E),
    'y':Math.log(val.y,Math.E)
  }
};

Box.prototype.showMarshallianDemandCurve = function(alpha, m, colorstring) {
 
 let mx = alpha*m;
 for (let x = 0; x < this.data.dimension.w; x += 2) {
 
   let val1 =  this.PIXEL2VAL({'x':x,'y':0});
   let val2 =  this.PIXEL2VAL({'x':x+2,'y':0});
   
   val1.y = mx/val1.x;
   val2.y = mx/val2.x;
   
   //let logval1 = this.VAL2LOGVAL(val1);
   //let logval2 = this.VAL2LOGVAL(val2);
   
   let pixel1 = this.VAL2PIXEL(val1);
   let pixel2 = this.VAL2PIXEL(val2);
   
   this.ctx.strokeStyle = colorstring;
   this.ctx.beginPath();
   this.ctx.moveTo(pixel1.x, pixel1.y);
   this.ctx.lineTo(pixel2.x, pixel2.y);
   this.ctx.stroke();   
   
 }

}

Box.prototype.showHicksianDemandCurve = function(alpha, u, px, py, colorstring) {

 for (let x = 0; x < this.data.dimension.w; x += 2) {
 
   let val1 =  this.PIXEL2VAL({'x':x,'y':0});
   let val2 =  this.PIXEL2VAL({'x':x+2,'y':0});
   
   val1.y = ((u/val1.x)*(py*alpha/(1-alpha))**(1-alpha))**(1/(1-alpha));
   val2.y = ((u/val2.x)*(py*alpha/(1-alpha))**(1-alpha))**(1/(1-alpha));
   
   let pixel1 = this.VAL2PIXEL(val1);
   let pixel2 = this.VAL2PIXEL(val2);
   
   this.ctx.strokeStyle = colorstring;
   this.ctx.beginPath();
   this.ctx.moveTo(pixel1.x, pixel1.y);
   this.ctx.lineTo(pixel2.x, pixel2.y);
   this.ctx.stroke();   
   
 }

}

Box.prototype.showCompare = function (alpha, m, px, py, alpha2, m2, px2, py2) {
 
 // INITIAL STATE
 this.showAxes();
 this.showBudgetLine(m, px, py, '#fc08');
 let bundle = this.calculateMarshallianDemandAllocation(alpha, m, px, py);
 this.showUtility(bundle.u, alpha, '#fc08');
 this.showAllocation(bundle.x, bundle.y, '#fc08');

 // RESPONSE : HICKSIAN
 let allocation_h = this.calculateHicksianDemandAllocation(alpha2, bundle.u, px2, py2);
 this.showBudgetLine(allocation_h.m, px2, py2, '#adc2eb');
 this.showAllocation(allocation_h.x, allocation_h.y, '#f00'); //'#adc2eb');
 let u2 = allocation_h.x**alpha*allocation_h.y**(1-alpha);

 // RESPONSE : MARSHALLIAN
 this.showBudgetLine(m, px2, py2, '#c2d6d6');
 let bundle3 = this.calculateMarshallianDemandAllocation(alpha2, m2, px2, py2);
 this.showUtility(bundle3.u, alpha2, '#c2d6d6');
 this.showAllocation(bundle3.x, bundle3.y, '#c2d6d6');
 
 document.getElementById('allocation-initial').innerHTML = '(' + (Math.floor(bundle.x*100)/100).toFixed(2) + ', ' + (Math.floor(bundle.y*100)/100).toFixed(2) + ')';
 document.getElementById('allocation-marshallian').innerHTML = '(' + Math.floor(bundle3.x*100)/100 + ', ' + Math.floor(bundle3.y*100)/100 + ')';
 document.getElementById('allocation-hicksian').innerHTML = '(' + Math.floor(allocation_h.x*100)/100 + ', ' + Math.floor(allocation_h.y*100)/100 + ')';
 
 document.getElementById('utility-initial').innerHTML = (Math.floor(bundle.u*100)/100).toFixed(2);
 document.getElementById('utility-marshallian').innerHTML = (Math.floor(bundle3.u*100)/100).toFixed(2);
 document.getElementById('utility-hicksian').innerHTML = (Math.floor(bundle.u*100)/100).toFixed(2);
}

Box.prototype.updateDemandCurves = function(alpha, m, px, py, alpha2, m2, px2, py2) {

 // INITIAL STATE
 this.showAxes();
 this.showMarshallianDemandCurve(alpha, m, '#fc08');

 
 let allocation = this.calculateMarshallianDemandAllocation(alpha, m, px, py);
 this.showAllocation(allocation.x, px, '#adc2eb');
 this.showAllocationBox(allocation.x, px, '#fc08');

 this.showHicksianDemandCurve(alpha, allocation.u, px, py, '#adc2eb');

 // RESPONSE : HICKSIAN
 let allocation_h = this.calculateHicksianDemandAllocation(alpha2, allocation.u, px2, py2);
 this.showAllocation(allocation_h.x, px2, '#f00'); //'#adc2eb');
 //this.showHicksianDemandCurve(alpha, allocation.u, px, py, '#adc2eb');

 // RESPONSE : MARSHALLIAN
 let allocation_m = this.calculateMarshallianDemandAllocation(alpha2, m2, px2, py2);
 this.showAllocation(allocation_m.x, px2, '#c2d6d6');
 
 let u = allocation_h.x**alpha*allocation_h.y**(1-alpha);
 
 this.showHicksianDemandCurve(alpha2, u, px2, py2, '#adc2eb');
 
}