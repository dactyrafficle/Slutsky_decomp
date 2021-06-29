function GET_HICKSIAN_ALLOCATION(OBJ, UTILITY) {
 return {
  'x': UTILITY*(OBJ.py*OBJ.alpha/(OBJ.px*(1-OBJ.alpha)))**(1-OBJ.alpha),
  'y': UTILITY*((OBJ.px/OBJ.py)*((1-OBJ.alpha)/OBJ.alpha))**(OBJ.alpha),
  'e': OBJ.px*(UTILITY*(OBJ.py*OBJ.alpha/(OBJ.px*(1-OBJ.alpha)))**(1-OBJ.alpha)) + OBJ.py*(UTILITY*((OBJ.px/OBJ.py)*((1-OBJ.alpha)/OBJ.alpha))**(OBJ.alpha))
 };
};