
// this function is taken from https://gist.github.com/mutoo/5617691 on 2021-06-28

function CIRCUMCIRCLE(a, b, c) {

    this.a = a;
    this.b = b;
    this.c = c;

    var EPSILON = 1.0 / 1048576.0;
    var ax = a.x,
        ay = a.y,
        bx = b.x,
        by = b.y,
        cx = c.x,
        cy = c.y,
        fabsy1y2 = Math.abs(ay - by),
        fabsy2y3 = Math.abs(by - cy),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
        return;  // ADDED 2021-06-30 : KEEP IT FROM BUGGING OUT IF ERROR

    if(fabsy1y2 < EPSILON) {
        m2  = -((cx - bx) / (cy - by));
        mx2 = (bx + cx) / 2.0;
        my2 = (by + cy) / 2.0;
        xc  = (bx + ax) / 2.0;
        yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
        m1  = -((bx - ax) / (by - ay));
        mx1 = (ax + bx) / 2.0;
        my1 = (ay + by) / 2.0;
        xc  = (cx + bx) / 2.0;
        yc  = m1 * (xc - mx1) + my1;
    }

    else {
        m1  = -((bx - ax) / (by - ay));
        m2  = -((cx - bx) / (cy - by));
        mx1 = (ax + bx) / 2.0;
        mx2 = (bx + cx) / 2.0;
        my1 = (ay + by) / 2.0;
        my2 = (by + cy) / 2.0;
        xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        yc  = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = bx - xc;
    dy = by - yc;
    this.x = xc;
    this.y = yc;
    this.r = (dx * dx + dy * dy)**0.5;  // ADDED 2021-06-29 : CODE WAS MISSING **0.5 
    

}