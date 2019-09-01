addSoDef({
  name: 'enemy',
  aTime: 0,
  pilot: function(ft,t) {
    if (this.aTime<=0) this.chooseAction();
    this.aTime-=ft;
  },
  chooseAction: function()
  {
     if (this.md==0) {//we're landed so take off

       this.rotdir=-1;
       this.spdir=1;
       this.aTime=rnd(200,300);
       return;
     }
     //otherwise we must be flying
     //If the player is in our firing line then its a good idea to pull the triiger
     this.trigG=within(this.pX(this.w*4,0),this.pY(this.w*4,0),_pp.x,_pp.y,this.w*2);
     //are we heading towards the player
     let xdiff=_pp.x-this.x;
     let ao=89;
     if (this.y>1000) ao=80;
     if (this.y<300) ao=100;
     let t=-90+sgn(xdiff)*ao;
     if (sgn(xdiff)!=sgn(this.rdx)) {    //if not lets u-turn
       this.rotdir=aDirTo(this.rot,t)
       this.spdir=-1;
       this.aTime=rnd(200,600);
       return;
     }
     //if we are lets try to hit the correct line
     if (Math.abs(aDist(this.rot,t))>10) {
       this.rotdir=aDirTo(this.rot,t)
       this.spdir=1;
       this.aTime=rnd(100,150);
       return;
     }

     this.rotdir=this.spdir=0;


   },
});
