function GET_MARSHALLIAN_ALLOCATION(OBJ) {
 return {
  'x': OBJ.alpha*OBJ.budget/OBJ.px,
  'y': (1-OBJ.alpha)*OBJ.budget/OBJ.py,
  'u': (OBJ.alpha*OBJ.budget/OBJ.px)**OBJ.alpha*((1-OBJ.alpha)*OBJ.budget/OBJ.py)**(1-OBJ.alpha)
 };
};