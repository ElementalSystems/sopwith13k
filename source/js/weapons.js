_ws = {

};

function addWS(n, ty, cls) {
  var r = [];
  for (i = 0; i < n; i += 1)
    r.push(addSo(ty, cls, -1000, -1000, 0))
  _ws[ty] = r;
  return r;
}

function fireWS(ty, x, y, r,sp) {
  let ammo = _ws[ty];
  (ammo.find((e) => e.life <= 0) || ammo[0]).fire(x, y, r,sp);
}


addSoDef({
  name: 'weapon',
  life: 0,
  tCol: function(x,y,x2,y2) {  return null; }, //no collidable
  fire: function(x, y, r, sp) {
    if (this.usesp) this.sp=sp;
    this.place(x, y, r);
    this.life = this.lifeSpan;
  },
  tick: function(ft, t) {
    if (this.life <= 0) return;
    //check collission

    var col = tColW(this, this.x, this.y, this.x + this.rdx * (this.w/2+this.sp * ft), this.y + this.rdy*(this.w/2+this.sp * ft));
    if (col&&this.kill) {
      //hit something
      this.life=0; //I'm dead
      col.o.hit(this,col);
    }
    this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft,this.rot + this.rotsp * aDirTo(this.rot,90) * ft)
    this.life -= ft;

    if (this.life <= 0) { //dead now
      this.place(-1000, -1000, 0);
    }
  }
});

addSoDef({
  name: 'bullet',
  w: 200,
  h: 10,
  lifeSpan: 500,
  sp: 3,
  usesp: 0,
  rotsp: 0,
  kill: true,
});


addSoDef({
  name: 'bomb',
  w: 50,
  h: 50,
  lifeSpan: 10000,
  sp: 0,
  usesp: 1,
  rotsp: 0.02,
  kill: true,
});


addSoDef({
  name: 'smoke',
  w: 50,
  h: 50,
  lifeSpan: 1000,
  sp: 0.25,
  usesp: 0,
  rotsp: 0,
});
