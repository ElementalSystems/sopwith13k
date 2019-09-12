addSoDef({
  name: 'plane',
  w: 200,
  h: 100,
  sp: .8, //speed in units / ms
  spmax: 1.5, //max speed
  spmin: .5, //min speed
  spdir: 0, //direction to change speed
  acc: .001, //change to speed per ms
  md: 0, //fly mode 0 - home 1 - flying 2 - falling 3 - crashed 4 - stalled

  rotsp: .2, //rot change in deg / ms
  rotdir: 0, // 0 / +1 / -1 control setAttribute
  trigG: 0, // 0 or 1 to fire the guns
  trigB: 0, // 0 or 1 to fire the bomb
  trigF: 0, // 0 or 1 to fire the bomb

  nextFireG: 0,
  nextFireB: 0,
  nextFireS: 0,
  nextFireF: 0,
  nextLand: 0,
  isFlip: 0,
  flipR: 1,

  bCnt: 5,
  gCnt: 99,
  fCnt: 99,
  lCnt: 99,

  tick: function(ft, t) {
    this.tickM[this.md].bind(this)(ft, t);
    if (this.md != 3) { //check for world collisions at my new spot
      var col = tColW(this, this.pX(-this.w / 3, 0), this.pY(-this.w / 3, 0), this.pX(+this.w / 3, 0), this.pY(+this.w / 3, 0));
      if (col) {
        col.o.hit();
        if (col.o.isHard) { //hit the ground
          this.mEnd = t + 1000;
          this.ded=true;
          _pp.score+=this.scv;
          this.lCnt-=1;
          this.sp=0;
          if (this!=_pp) this.mEnd+=5000; //not the player dies for ages
          if (!this.lCnt) {
            this.mEnd+=10000;
            OLShowT(6);
          }
          this.md = 3;
          fireWS('shrap', this.pX(0, -this.h), this.pY(0, -this.h), rnd(-60,-120), 0);
          fireWS('shrap', this.pX(0, -this.h), this.pY(0, -this.h), rnd(-60,-120), 0);
          fireWS('shrap', this.pX(0, -this.h), this.pY(0, -this.h), rnd(-60,-120), 0);
        } else {
          this.md = 2; //we are falling
        }
      }
    }
    //set plane blur level
    this.e.classList.toggle('b1',(this.sp>.7)&&(this.sp<1.1));
    this.e.classList.toggle('b2',(this.sp>=1.1));
  },

  tickM: { //tick function by mode
    0: function(ft, t) {
      this.pilot(ft,t);
      this.bCnt=5;
      this.fCnt=this.gCnt=99;
      this.ded=false;
      this.sp=0;
      if ((this.rotdir < 0) || (this.spdir)) {// take off!
        this.md = 1;
        this.sp=.7;
        this.nextLand=t+3000;
      }
    },
    1: function(ft, t) { //flying along mate
      this.pilot(ft,t);
      this.sp = lim(this.sp + this.acc * this.spdir * ft, this.spmin, this.spmax);
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, this.rot + this.rotsp * this.rotdir * this.flipR * ft);
      //are we out of fuel?
      this.fCnt-=this.sp*2*ft/1000;
      if (this.fCnt<0) {
        this.md=2;
      }
      //do we fire bullets?
      if ((this.trigG) && (this.gCnt>0)&&(t > this.nextFireG)) {
        fireWS('bullet', this.pX(this.w * .6, 0), this.pY(this.w * .6, 0), this.rot, this.sp);
        this.gCnt-=1;
        this.nextFireG = t + 100;
      }
      //do we fire bombs
      if ((this.trigB) && (t > this.nextFireB)&& (this.bCnt>0)) {
        fireWS('bomb', this.pX(0, this.h*this.flipR, 0), this.pY(0, this.h*this.flipR), this.rot, this.sp);
        this.bCnt-=1;
        this.nextFireB = t + 600;
      }
      //do we flip
      if ((this.trigF) && (t > this.nextFireF)) {
        this.flip(!this.isFlip);
        this.nextFireF = t + 500;
      }

      //check for stall
      if (this.y < 5) {
        this.md = 4;
        this.mEnd = t + rnd(400, 700);
      }
      //maybe we can land?
      if ((t>this.nextLand)&&within(this.x,this.y,this.ix,this.iy,120)) {
        this.md=0;
        this.flip(0); //put upright
        this.place(this.ix,this.iy,this.ir);
      }
    },
    2: function(ft, t) { //falling and smoking
      if (t > this.nextFireS) {
        fireWS('smoke', this.pX(-this.w * .2, 0), this.pY(-this.w * .2, 0), this.rot, this.sp);
        this.nextFireS = t + 100;
      }
      this.rotdir = .1;
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, this.rot + this.rotsp / 2 * aDirTo(this.rot, 90) * ft);
    },
    3: function(ft, t) { //crashed
      if (t > this.mEnd) {
        this.place(this.ix, this.iy, this.ir);
        this.flip(0); //put upright
        this.md = 0; //start flying again
        if (_pp.lCnt==0) {
          endG();
        }
      }
    },
    4: function(ft, t) { //Stalled
      this.sp = rnd(this.spmin,(this.spmin + this.spmax) / 2);
      this.place(this.x + this.rdx * this.sp * ft, this.y + this.rdy * this.sp * ft, rnd(70, 120));
      if (t > this.mEnd) this.md = 1; //start flying again
    },
  },
  hit: function() {
    if (this.md<=1)  this.md=2;
  },
  pilot: function(ft, t) {},
  flip: function(to) {
    this.isFlip=to;
    this.flipR=this.isFlip?-1:1;
    if (this.isFlip)
      this.inG.setAttribute('transform','translate(0,'+(this.h)+') scale(1,-1)');
    else
      this.inG.setAttribute('transform','translate(0,0)');
  }
});
