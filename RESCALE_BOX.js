function RESCALE_BASED_ON_CIRCUMCIRCLE(box, VERTICES) {

  // NOW, FIND THE CIRCUMCENTER OF OBJ
  let c = new CIRCUMCIRCLE(VERTICES.a, VERTICES.b, VERTICES.c);
  //let r = ((c.x - c.a.x)**2 + (c.y - c.a.y)**2)**0.5;

  //console.log(c);
  //console.log(r);

 // RESCALE
  if (c.r) {
   box.rangex(c.x-c.r*3, c.x+c.r*3);
   box.rangey(c.y-c.r*3, c.y+c.r*3);
  } 
  
}


// HOW ABOUT ON THE MINIMUM BOUNDING CIRCLE
// HOW ABOUT CENTER OF MASS? THE CENTROID

function RESCALE_BASED_ON_CENTROID(box, VERTICES) {

  // NOW, FIND THE CIRCUMCENTER OF OBJ
  let c = new CIRCUMCIRCLE(VERTICES.a, VERTICES.b, VERTICES.c);
  //let r = ((c.x - c.a.x)**2 + (c.y - c.a.y)**2)**0.5;

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

 // RESCALE
 box.rangex(cx-r*3, cx+r*3);
 box.rangey(cy-r*3, cy+r*3);
  
}