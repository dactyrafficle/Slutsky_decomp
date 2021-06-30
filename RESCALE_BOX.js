function RESCALE_BASED_ON_CIRCUMCIRCLE(box, VERTICES) {

 let c = new CIRCUMCIRCLE(VERTICES.a, VERTICES.b, VERTICES.c);
  console.log(c);
 // RESCALE
 
 
 
 // WHEN R IS ACTUALLY REALLY SMALL, I THINK I SHUD make z bigger, bc at r*3 the points are quite far 
  if (c.r) {
   let z = 3;
   box.rangex(c.x-c.r*z, c.x+c.r*z);
   box.rangey(c.y-c.r*z, c.y+c.r*z);
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

 // RESCALE
 box.rangex(cx-r*3, cx+r*3);
 box.rangey(cy-r*3, cy+r*3);
  
}