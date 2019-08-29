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
  w: 100,
  h: 100,
  rot: 0,
  rdx: 1,
  rdy: 0,
  pX: function(x,y) { return this.x+this.rdx*x-this.rdy*y},
  pY: function(x,y) { return this.y+this.rdx*y+this.rdy*x},
  tDirty: true,
  place: function(nx,ny,nr) {
    if (nx!==undefined) this.x=nx;
    if (ny!==undefined) this.y=ny;
    if (nr!==undefined) {
      this.rot=alim(nr);
      this.rdx=Math.cos(this.rot*Math.PI/180);
      this.rdy=Math.sin(this.rot*Math.PI/180);
    }
    this.tDirty=true;
  },
  setT: function() {
    if (!this.tDirty) return;
    this.e.setAttribute('transform','translate('+(this.x-this.w/2)+','+(this.y-this.h/2)+') rotate('+this.rot+','+(this.w/2)+','+(this.h/2)+')');
    this.tDirty=false;
  },

  onCreate: function() {}, //called when object is first built before it is added to the DOM
  postCreate: function() {}, //called after object is added to the DOM
  tick: function(ft,t) {}, //called every frame
  ftick: function(ft,t) {}, //final actions each frame
  hit: function(ob,col) {}, //called if something hard hits your object
  tCol: function(x,y,x2,y2) {  //check if this hits you and where - default uses a cross across the object
    return li(x,y,x2,y2,this.pX(-this.w/2,-this.h/2),this.pY(-this.w/2,-this.h/2),this.pX(this.w/2,this.h/2),this.pY(this.w/2,this.h/2))||
           li(x,y,x2,y2,this.pX(-this.w/2,this.h/2),this.pY(-this.w/2,this.h/2),this.pX(this.w/2,-this.h/2),this.pY(this.w/2,-this.h/2))
  },
})

function mkSo(id,cls,x,y,r)
{
  var df = document.importNode(document.querySelector('#'+id).content, true);
  var e=df.querySelector('g');
  e.classList.add(cls);
  ret={
    e:  e,
    inG: e.querySelector('g'), //sets the internal group handle if the object has one
    ix: x, //store initial position
    iy: y,
    ir: r,
  };
  Object.assign(ret,window._sodef['so']);
  if (window._sodef[id]) Object.assign(ret,window._sodef[id]);
  if (window._sodef[cls]) ret=Object.assign(ret,window._sodef[cls]);
  ret.onCreate();
  ret.place(x,y,r);
  return ret;
}
