var _so = [];
var _wel = document.getElementById('world');
var _swel = document.getElementById('map');
var _pp = null;
var _ended = true;
var forcey=0;
function addSo(ty, cls, x, y, r) {
  let so = mkSo(ty, cls, x, y, r);
  _wel.appendChild(so.e); //add it to the DOM element
  _so.unshift(so); //and to the Ob array
  so.postCreate();

  //now add the shadow element
  if (so.shadow) {
    _swel.appendChild(so.shadow.e); //add it to the DOM element
  }

  return so;
}


function stW() {
  //clear stuff
  _so = [];
  _swel.innerHTML = '';
  _wel.innerHTML = '';
  _ended = false;

  addWS(25, 'bullet', 'weapon');
  addWS(10, 'bomb', 'weapon');
  addWS(30, 'smoke', 'weapon');
  addWS(10, 'shrap', 'weapon');
  addSo('landb', 'std', 10000, 1000);

  addSo('stb', 'eblk', 1300, 500, 0);
  addSo('stb', 'etank', 1850, 1400, 0);
  addSo('stb', 'ehut', 2700, 1520, 0);
  addSo('stb', 'ehut', 3300, 1120, 0);
  addSo('plane', 'enemy', 3690, 1550, 0);

  addSo('stb', 'etank', 4200, 1500, 0);


  addSo('stb', 'ehut', 4500, 1120, 0);
  addSo('stb', 'eblk', 6000, 1120, 0);


  _pp = addSo('plane', 'player', 8400, 1350, 0);
  addSo('stb', 'ftk', 8000, 1320, 0);
  addSo('stb', 'fhut', 8200, 1320, 0);

  //display
  // addSo('stb','ehut',8600,1320,0);
  // addSo('stb','eblk',8800,1320,0);
  // addSo('stb','fblk',9000,1320,0);


  addSo('stb', 'ftank', 9500, 1400, 0);

  addSo('stb', 'etank', 10100, 1150, 0);
  addSo('plane', 'enemy', 11100, 1150, 0);
  addSo('stb', 'ehut', 11700, 1120, 0);
  addSo('stb', 'etk', 11900, 1120, 0);
  addSo('stb', 'eblk', 13200, 1520, 0);
  addSo('stb', 'eblk', 14300, 1250, 0);
  addSo('stb', 'etank', 15000, 1560, 0);
  addSo('stb', 'etank', 15850, 1560, 0);
  addSo('plane', 'enemy', 16200, 1560, 0);
  addSo('stb', 'ehut', 17000, 1520, 0);
  addSo('stb', 'ehut', 17500, 920, 0);
  addSo('stb', 'eblk', 18100, 120, 0);

  requestAnimationFrame(gl);
}

function endW() {
  _ended = true;
}


var laa = [
  5500, 94,
  8420, 92, //array of pairs - look point and world year
  11000, 88,
  14000, 84,
  7100, 5, //text prpmpts
  8400, 0, //text prpmpts
  8460, 1,
  11000, 3,
  14000, 2,
];


var _wy = 92;

function lookAtW(x) {
  _wel.setAttribute('viewBox', (x - 2000) + ',0,20000,2000');
  let nwy = _wy;
  for (let i = 0; i < laa.length; i += 2)
    if (Math.abs(laa[i] - x) < 50) { //found one!
      let v = laa[i + 1];
      if (v < 80)
        OLShowT(v);
      else
        nwy = v;
    }
  if (forcey) nwy=forcey;
  if (nwy != _wy) {
    _wy = nwy;
    var cl = document.getElementById('top').classList;
    cl.toggle('y84', _wy == 84);
    cl.toggle('y88', _wy == 88);
    cl.toggle('y92', _wy == 92);
    cl.toggle('y04', _wy == 94);
    switch (_wy) {
      case 84: document.getElementById('gmtxt').innerHTML="<b>1984</b> CGA 4 Colours 320 x 200"; break;
      case 88: document.getElementById('gmtxt').innerHTML="<b>1988</b> EGA 16 Colours 640 x 350"; break;
      case 92: document.getElementById('gmtxt').innerHTML="<b>1994</b> SVGA 256 Colours 800 x 600"; break;
      case 94: document.getElementById('gmtxt').innerHTML="<b>2004</b> GPU 16,777,216 Colours 1024+ x 800"; break;
    }
    document.getElementById('gmtxt').classList.toggle('active',true);
    setTimeout(()=>{document.getElementById('gmtxt').classList.toggle('active',false);},3000);

  }
}

function tColW(ig, x, y, x2, y2) {
  for (let i = 0; i < _so.length; i += 1) {
    if (ig === _so[i]) continue; //can't collide with yourself
    let res = _so[i].tCol(x, y, x2, y2);
    if (res) {
      res.o = _so[i];
      return res;
    }
  }
  return null;
}

var _st = 0;
//the graphics loop!
function gl(t) {
  let ft = 10;
  if (_st) ft = (t - _st);
  if (ft > 100) ft = 100; //we don't believe in longer frames than 1/10 of a second.
  _st = t;
  //console.log('fps: '+(1000/ft).toFixed(0));
  //do the ticks for each object
  _so.forEach((o) => {
    o.tick(ft, t);
  });
  //do the fticks and set for each object
  _so.forEach((o) => {
    o.ftick(ft, t);
    o.setT();
  });
  //update the overlay
  updateOL();

  if (!_ended) requestAnimationFrame(gl);
}
