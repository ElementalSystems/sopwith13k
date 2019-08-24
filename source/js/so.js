function addSoDef(def)
{
  if (!window._sodef) window._sodef={}
  window._sodef[def.name]=def;
}

//Create base so object parameters
addSoDef({
  name:'so',
  x: -1000,
  y: -1000,
  rot: 0,
  rdx: 1,
  rdy: 0,
  tDirty: true,
  place: function(nx,ny,nr) {
    if (nx!==undefined) this.x=nx;
    if (ny!==undefined) this.y=ny;
    if (nr!==undefined) {
      this.rot=nr;
      this.rdx=Math.cos(nr*Math.PI/180);
      this.rdy=Math.sin(nr*Math.PI/180);
    }
    this.tDirty=true;
  },
  setT: function() {
    if (!this.tDirty) return;
    this.e.setAttribute('transform','translate('+this.x+','+this.y+') rotate('+this.rot+')')
    this.tDirty=false;
  },
  onCreate: function() {},
  tick: function(ft,t) {},
  ftick: function(ft,t) {}
})

function mkSo(id,cls,x,y,r)
{
  var df = document.importNode(document.querySelector('#'+id).content, true);
  var e=df.querySelector('g');
  e.classList.add(cls);
  ret={
    e: e,
  };
  Object.assign(ret,window._sodef['so']);
  if (window._sodef[id]) Object.assign(ret,window._sodef[id]);
  if (window._sodef[cls]) ret=Object.assign(ret,window._sodef[cls]);
  ret.onCreate();
  ret.place(x,y,r);
  return ret;
}
