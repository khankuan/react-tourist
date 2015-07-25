export function merge(obj1, obj2){
  const obj3 = {};
  for (let attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (let attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
