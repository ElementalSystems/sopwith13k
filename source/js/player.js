addSoDef({
  name: 'player',
  ftick: function (ft) {
    lookAtW(this.x);
  },
  pilot: function(ft,t) {
    //elevator controls
    this.rotdir=(kbd(188)||kbd(37))?-1:((kbd(191)||kbd(39))?1:0);
    //thottle controls
    this.spdir=(kbd(88)||kbd(65))?1:((kbd(90))?-1:0);
    this.trigG=kbd(32);
    this.trigB=kbd(66);
    this.trigF=kbd(190);
  }
});
