addSoDef({
  name: 'player',
  ftick: function (ft) {
    lookAtW(this.x);
  },
  pilot: function(ft,t) {
    //elevator controls
    this.rotdir=(kbd(188)||kbd(37))?-1:((kbd(190)||kbd(39))?1:0);
  }
});
