addSoDef({
  name: 'plane',
  sp: 1, //speed in units / ms
  rotsp: .2, //rot change in deg / ms
  rotdir: 0, // 0 / +1 / -1 control setAttribute

  tick: function (ft,t) {
    this.pilot();
    this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*this.rotdir*ft);
  },
  pilot: function(ft,t) {}
});
