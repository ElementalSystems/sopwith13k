addSoDef({
  name: 'plane',
  w: 200,
  h: 100,
  sp: 1, //speed in units / ms
  spmax: 1.8, //max speed
  spmin: .7, //min speed
  spdir: 0, //direction to change speed
  acc:  .002, //change to speed per ms
  md: 0, //fly mode 0 - flying 1 - falling 2 - crashed

  rotsp: .2, //rot change in deg / ms
  rotdir: 0, // 0 / +1 / -1 control setAttribute


  tick: function (ft,t) {

    this.pilot();
    this.sp=lim(this.sp+this.acc*this.spdir*ft,this.spmin,this.spmax);
    this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*this.rotdir*ft);
    //check for world collisions at my new spot
    var col=tColW(this,this.pX(-this.w/2,0),this.pY(-this.w/2,0),this.pX(+this.w/2,0),this.pY(+this.w/2,0));
    if (col) {
      // alert('dead');
    }


  },
  pilot: function(ft,t) {}
});
