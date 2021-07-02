function RESCALE_BASED_ON_CIRCUMCIRCLE(box, VERTICES) {

 let r_min = 0.5;

 let c = new CIRCUMCIRCLE(VERTICES.a, VERTICES.b, VERTICES.c);

 // SOLUTION TO SKIPPING WHEN PX1=PX2 : IF YOU CANNOT GET 3 POINTS, TAKE THE AVERAGE OF THE 2 POINTS?
 // RECENTER, BUT DONT RESCALE

 // SOLUTION TO MOTION LOSS
 // MAKE GRID LINE COLOR A FUNCTION OF SIZE. ALL GRIDLINES BECOME DARKER AS SPAN SHRINKS
 

// if all 3 ponits are the same, then use that point as the center, with the radius set to the minimum
// when 2 points are the same, use a circle whose midpoint is the center, and distance to the midpoint the radius

  // IF ALL 3 POINTS ARE THE SAME
  if (VERTICES.a.x == VERTICES.b.x && VERTICES.b.x == VERTICES.c.x && VERTICES.a.x == VERTICES.c.x && VERTICES.a.y == VERTICES.b.y && VERTICES.b.y == VERTICES.c.y && VERTICES.a.y == VERTICES.c.y) {
    box.rangex(VERTICES.a.x-r_min, VERTICES.a.x+r_min);
    box.rangey(VERTICES.a.y-r_min, VERTICES.a.y+r_min);
    console.log('all 3 the same');
  }
  
  // IF 2 POINTS ARE THE SAME
  /*
  if (VERTICES.a.x == VERTICES.b.x && VERTICES.a.y == VERTICES.b.y) {
    // if a and b are the same
    // use a and c
    let cx = (VERTICES.a.x + VERTICES.c.x)/2;
    let cy = (VERTICES.a.y + VERTICES.c.y)/2; 
    let r = ((VERTICES.a.x-VERTICES.c.x)**2+(VERTICES.a.y-VERTICES.c.y)**2)**0.5;
    if (r < r_min) {
      r = r_min;
    }
    //box.rangex(cx-r, cx+r);
    //box.rangey(cy-r, cy+r);
    
    box.SHOWVALUE({'x':cx,'y':cy}, '#f00f', 2);
    
  } else {
    // if they are different
    // use a and b
    let cx = (VERTICES.a.x + VERTICES.b.x)/2;
    let cy = (VERTICES.a.y + VERTICES.b.y)/2; 
    let r = ((VERTICES.a.x-VERTICES.b.x)**2+(VERTICES.a.y-VERTICES.b.y)**2)**0.5;
    if (r < r_min) {
      r = r_min;
    }
    //box.rangex(cx-r, cx+r);
    //box.rangey(cy-r, cy+r);
    
    box.SHOWVALUE({'x':cx,'y':cy}, '#f00f', 2);
  }
  */
  
  // IF ALL 3 POINTS ARE DIFFERENT
  if (c.r) {
    let z = c.r*3;
    if (z < r_min) {
      z = r_min;
    }
    box.rangex(c.x-z, c.x+z);
    box.rangey(c.y-z, c.y+z);

    // DRAW THE CIRCUMCIRCLE
    box.SHOWVALUE(c, '#f00f', 2);
    let pixel = box.VAL2PIXEL(c);
    box.ctx.strokeStyle = '#f00f';
    box.ctx.lineWidth = 1;
    box.ctx.beginPath();
    box.ctx.arc(pixel.x, pixel.y, c.r*box.data.zoom.x, 0, 2 * Math.PI);
    box.ctx.stroke();
  }
  

}





// HOW ABOUT ON THE MINIMUM BOUNDING CIRCLE
// HOW ABOUT CENTER OF MASS? THE CENTROID

function RESCALE_BASED_ON_CENTROID(box, VERTICES) {

  let cx = (VERTICES.a.x + VERTICES.b.x + VERTICES.c.x)/3;
  let cy = (VERTICES.a.y + VERTICES.b.y + VERTICES.c.y)/3;
  
  let ra = ((VERTICES.a.x - cx)**2 + (VERTICES.a.y - cy)**2)**0.5;
  let rb = ((VERTICES.b.x - cx)**2 + (VERTICES.b.y - cy)**2)**0.5;
  let rc = ((VERTICES.c.x - cx)**2 + (VERTICES.c.y - cy)**2)**0.5;

  let r = 0;
  if (ra > rb) {
    r = ra;
  } else {
    r = rb;
  }
  if (rc > r) {
    r = rc;
  }
  
  if (VERTICES.a.x == VERTICES.b.x && VERTICES.b.x == VERTICES.c.x &&  VERTICES.a.y == VERTICES.b.y && VERTICES.b.y == VERTICES.c.y) {
    r = 0.1;
  }
  
  let z = r*3;
  if (z < 0.5) {
    z = 0.5;
  }

 // RESCALE
 box.rangex(cx-z, cx+z);
 box.rangey(cy-z, cy+z);
  
}