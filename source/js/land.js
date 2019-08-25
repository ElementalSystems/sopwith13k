var _landAlt=
[
     0,  0,  0,  0,  0,  2,  5,  6, 11, 14, //0
    15, 16, 17, 16, 16, 14, 12, 12, 16, 16, //1
    16, 15, 12, 12, 12, 14, 14, 15, 14, 12, //2
    12, 12, 12, 15, 15, 16, 16, 16, 15, 14, //3
    14, 14, 14, 14, 14, 14, 14, 14, 15, 14, //4
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, //5
    12, 15, 15, 15, 16, 16, 16, 15, 14, 14, //6
    12, 12, 14, 16, 16, 16, 15, 14, 14, 16, //7
    16, 16, 16, 16, 16, 16, 15, 10, 10,  5, //8
     2,  0,  0,  0,  0,  0,  0,  0,  0,  0, //9
];

function getLa(x) {
  if (x<100) return _landAlt[0]*100;
  if (x>19600) return _landAlt[99]*100;
  let i=Math.floor(x/200);
  let r=(x-i*200)/200;
  return ((1-r)*_landAlt[i]+r*_landAlt[i+1])*100;
}

addSoDef({
  name: 'landb',
  w: 20000,
  h: 2000,

  onCreate: function() {
    //find the path and rewrite its d setAttribute
    var p="M 0 3000";
    for (var i=0;i<20000;i+=200) p+=' L '+i+' '+getLa(i);
    //var p="M 0 3000 Q 0 50 0 80";
    //for (var i=0;i<100;i+=1) p+=' T '+(200*i)+' '+(100*_landAlt[i]);
    p+=" V 3000 Z";
    this.e.querySelector('path').setAttribute('d',p);
  },
  tCol: function(x,y,x2,y2) {  //custom collision detection
    if (getLa(x)<y) return { x: x, y: getLa(x)}; //either end too low?
    if (getLa(x2)<y2) return { x: x, y: getLa(x)};
    return null;
  },
});
