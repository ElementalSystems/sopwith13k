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
  isHard: true,

  onCreate: function() {
    this.e.querySelector('path.l1').setAttribute('d',mkLd(0));
    this.e.querySelector('path.l2').setAttribute('d',mkLd(1));
    this.e.querySelector('path.l3').setAttribute('d',mkLd(2));
  },
  tCol: function(x,y,x2,y2) {  //custom collision detection
    if (getLa(x)<y) return { x: x, y: getLa(x)}; //either end too low?
    if (getLa(x2)<y2) return { x: x, y: getLa(x)};
    return null;
  },
});

function mkLd(t){
  var p="M 0 3000 V 0";
  var j=200;
  switch (t) {
    case 0:
      for (var i=0;i<20000;i+=20) p+=' h 10 V '+getLa(i)+' h 10';
      break;
    case 1:
      for (var i=0;i<20000;i+=200) p+=' L '+i+' '+getLa(i);
      break;
    case 2:
      for (var i=0;i<20000;i+=j) p+=' S '+(i-j/2)+' '+(getLa(i)+(getLa(i-j)-getLa(i+j))/4)+' '
                                        +i+' '+getLa(i);
      break;
  }
  p+=" V 3000 Z";
  return p;
}
