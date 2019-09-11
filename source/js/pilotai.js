var aiso=0;

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
       if (_pp.md==0) return; //we don't take off if he is on the ground
       if (rnd(0,5000)>(_pp.score+aiso)) { //hesitate 2 seconds  second
         this.aTime=2000;
         return;
       }
       this.rotdir=-1;
       this.spdir=1;
       this.aTime=rnd(500,800);
       return;
     }
     //otherwise we must be flying
     //If the player is in our firing line then its a good idea to pull the triiger
     this.trigG=within(this.pX(this.w*4,0),this.pY(this.w*4,0),_pp.x,_pp.y,this.w*2)&&
         (rnd(0,10000)<(_pp.score+aiso));
     //are we heading towards the player
     let xp=(_pp.md==1)?_pp.x:this.ix; //we head home or to the player
     let xdiff=xp-this.x;
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
     this.aTime=rnd(200,250);

   },
   scv: 200,
   shadowId: 'edot',
});
