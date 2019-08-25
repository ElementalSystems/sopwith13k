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
  addSo('plane','player',2000,350,0);
  addSo('plane','enemy',1600,600,0);
  addSo('plane','enemy',1400,200,0);
  addSo('landb','std',10000,1000);
  setInterval(function() { document.getElementById('world').classList.toggle('y84',kbd(32))},500);
  requestAnimationFrame(gl);
}

function lookAtW(x) {
  _wel.setAttribute('viewBox',(x-1000)+',0,20000,2000');
}

function tColW(ig,x,y,x2,y2)
{
  console.log(x,y,x2,y2)
  for (let i=0;i<_so.length;i+=1)
  {
     if (ig===_so[i]) continue; //can't collide with yourself
     let res=_so[i].tCol(x,y,x2,y2);
     if (res) {
       res.o=_so[i];
       return res;
     }
  }
  return null;
}

var _st=0;
//the graphics loop!
function gl(t) {
  let ft = 10;
  if (_st) ft = (t - _st) ;
  if (ft > 100) ft = 100; //we don't believe in longer frames than 1/10 of a second.
  _st = t;
  //console.log('fps: '+(1000/ft).toFixed(0));
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
