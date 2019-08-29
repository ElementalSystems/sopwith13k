addSoDef({
  name: 'plane',
  w: 200,
  h: 100,
  sp: 1, //speed in units / ms
  spmax: 1.5, //max speed
  spmin: .7, //min speed
  spdir: 0, //direction to change speed
  acc: .002, //change to speed per ms
  md: 0, //fly mode 0 - home 1 - flying 2 - falling 3 - crashed 4 - stalled

  rotsp: .2, //rot change in deg / ms
  rotdir: 0, // 0 / +1 / -1 control setAttribute
  trigG: 0, // 0 or 1 to fire the guns
  trigB: 0, // 0 or 1 to fire the bomb

  nextFireG: 0,
  nextFireB: 0,
  nextFireS: 0,

  tick: function(ft, t) {
    this.tickM[this.md].bind(this)(ft, t);

    if (this.md != 3) { //check for world collisions at my new spot
      var col = tColW(this, this.pX(-this.w / 3, 0), this.pY(-this.w / 3, 0), this.pX(+this.w / 3, 0), this.pY(+this.w / 3, 0));
      if (col) {
        col.o.hit();
        if (col.o.isHard) { //hit the ground
          this.mEnd = t + 1000;
          this.md = 3;
        } else {
          this.md = 2; //we are falling
        }
      }
    }
  },

  tickM: { //tick function by mode
    0: function(ft, t) {
      this.pilot();
      if ((this.rotdir < 0) || (this.spdir)) // take off!
        this.md = 1;
    },
    1: function(ft, t) { //flying along mate
      this.pilot();
      this.sp = lim(this.sp + this.acc * this.spdir * ft, this.spmin, this.spmax);
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, this.rot + this.rotsp * this.rotdir * ft);
      //do we fire bullets?
      if ((this.trigG) && (t > this.nextFireG)) {
        fireWS('bullet', this.pX(this.w * .6, 0), this.pY(this.w * .6, 0), this.rot, this.sp);
        this.nextFireG = t + 100;
      }
      if ((this.trigB) && (t > this.nextFireB)) {
        fireWS('bomb', this.pX(0, this.h, 0), this.pY(0, this.h), this.rot, this.sp);
        this.nextFireB = t + 600;
      }

      //check for stall
      if (this.y < 5) {
        this.md = 4;
        this.mEnd = t + rnd(400, 700);
      }

    },
    2: function(ft, t) { //falling and smoking
      if (t > this.nextFireS) {
        fireWS('smoke', this.pX(-this.w * .6, 0), this.pY(-this.w * .6, 0), this.rot, this.sp);
        this.nextFireS = t + 100;
      }
      this.rotdir = .1;
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, this.rot + this.rotsp / 2 * aDirTo(this.rot, 90) * ft);
    },
    3: function(ft, t) { //crashed
      if (t > this.mEnd) {
        this.place(this.ix, this.iy, this.ir);
        this.md = 0; //start flying again
      }
    },
    4: function(ft, t) { //Stalled
      this.sp = rnd((this.spmin + this.spmax) / 2, this.spmax);
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, rnd(70, 120));
      if (t > this.mEnd) this.md = 1; //start flying again
    },
  },
  hit: function() {
    if (this.md==1)  this.md=2;
  },
  pilot: function(ft, t) {}
});
