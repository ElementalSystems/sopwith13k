var _so=[];
var _wel=document.getElementById('world');

function addSo(ty,cls,x,y,r)
{
  let so=mkSo(ty,cls,x,y,r);
  _wel.appendChild(so.e); //add it to the DOM element
  _so.push(so);  //and to the Ob array
}

function stW()
{
  addSo('plane','player',1300,350,0);
  addSo('plane','enemy',1300,200,5);
  addSo('plane','enemy',1300,600,-5);
  addSo('landb','std',0,0);
  setInterval(function() { document.getElementById('world').classList.toggle('y84',kbd(32))},500);
  requestAnimationFrame(gl);
}

function lookAtW(x) {
  _wel.setAttribute('viewBox',(x-1000)+',0,20000,2000');
}

var _st=0;
//the graphics loop!
function gl(t) {
  let ft = 10;
  if (_st) ft = (t - _st) ;
  if (ft > 100) ft = 100; //we don't believe in longer frames than 1/10 of a second.
  _st = t;
  console.log('fps: '+(1000/ft).toFixed(0));
  //do the ticks for each object
  _so.forEach((o)=>{
    o.tick(ft,t);
  });
  //do the fticks and set for each object
  _so.forEach((o)=>{
    o.ftick(ft,t);
    o.setT();
  });
  requestAnimationFrame(gl);
}
