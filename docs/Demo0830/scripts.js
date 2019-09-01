addSoDef({name:"hut",w:200,h:200}),addSoDef({name:"tank",w:200,h:100});var _kbel,_kb={};function attachKb(el){el.onkeydown=function(e){e=e||window.event,_kb[e.keyCode]=!0},el.onkeyup=function(e){e=e||window.event,_kb[e.keyCode]=!1},_kbel=el,focusKb()}function focusKb(){_kbel.focus()}function kbd(c){return!!_kb[c]}var _landAlt=[0,0,0,0,0,2,5,6,11,14,15,16,17,16,16,14,12,12,16,16,16,15,12,12,12,14,14,15,14,12,12,12,12,15,15,16,16,16,15,14,14,14,14,14,14,14,14,14,15,14,12,12,12,12,12,12,12,12,12,12,12,15,15,15,16,16,16,15,14,14,12,12,14,16,16,16,15,14,14,16,16,16,16,16,16,16,15,10,10,5,2,0,0,0,0,0,0,0,0,0];function getLa(x){if(x<100)return 100*_landAlt[0];if(x>19600)return 100*_landAlt[99];let i=Math.floor(x/200),r=(x-200*i)/200;return 100*((1-r)*_landAlt[i]+r*_landAlt[i+1])}function start(){attachKb(document.getElementById("top")),stW()}function addSoDef(def){window._sodef||(window._sodef={}),window._sodef[def.name]=def}function mkSo(id,cls,x,y,r){var e=document.importNode(document.querySelector("#"+id).content,!0).querySelector("g");return e.classList.add(cls),ret={e:e,inG:e.querySelector("g"),ix:x,iy:y,ir:r},Object.assign(ret,window._sodef.so),window._sodef[id]&&Object.assign(ret,window._sodef[id]),window._sodef[cls]&&(ret=Object.assign(ret,window._sodef[cls])),ret.onCreate(),ret.place(x,y,r),ret}function lim(v,b,t){return v<b?b:v>t?t:v}function li(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y){var s1_x=p1_x-p0_x,s1_y=p1_y-p0_y,s2_x=p3_x-p2_x,s2_y=p3_y-p2_y,dm=-s2_x*s1_y+s1_x*s2_y;0===dm&&(dm=1e-7);var s=(-s1_y*(p0_x-p2_x)+s1_x*(p0_y-p2_y))/dm,t=(s2_x*(p0_y-p2_y)-s2_y*(p0_x-p2_x))/dm;return s>=0&&s<=1&&t>=0&&t<=1?{x:p0_x+t*s1_x,y:p0_y+t*s1_y}:null}function rnd(s,e){return Math.random()*(e-s)+s}function alim(a){return(a=(a+7200)%360)>180?a-360:a}function aDist(a,t){let f=(t-a+720)%360;return f=f>180?f-360:f}function aDirTo(a,t){return sgn(aDist(a,t))}function sgn(x){return x<0?-1:1}function within(x1,y1,x2,y2,r){return(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)<r*r}function addWS(n,ty,cls){var r=[];for(i=0;i<n;i+=1)r.push(addSo(ty,cls,-1e3,-1e3,0));return _ws[ty]=r,r}function fireWS(ty,x,y,r,sp){let ammo=_ws[ty];(ammo.find(e=>e.life<=0)||ammo[0]).fire(x,y,r,sp)}addSoDef({name:"landb",w:2e4,h:2e3,isHard:!0,onCreate:function(){for(var p="M 0 3000",i=0;i<2e4;i+=200)p+=" L "+i+" "+getLa(i);p+=" V 3000 Z",this.e.querySelector("path").setAttribute("d",p)},tCol:function(x,y,x2,y2){return getLa(x)<y?{x:x,y:getLa(x)}:getLa(x2)<y2?{x:x,y:getLa(x)}:null}}),addSoDef({name:"enemy",aTime:0,pilot:function(ft,t){this.aTime<=0&&this.chooseAction(),this.aTime-=ft},chooseAction:function(){if(0==this.md)return this.rotdir=-1,this.spdir=1,void(this.aTime=rnd(200,300));this.trigG=within(this.pX(4*this.w,0),this.pY(4*this.w,0),_pp.x,_pp.y,2*this.w);let xdiff=_pp.x-this.x,ao=89;this.y>1e3&&(ao=80),this.y<300&&(ao=100);let t=sgn(xdiff)*ao-90;return sgn(xdiff)!=sgn(this.rdx)?(this.rotdir=aDirTo(this.rot,t),this.spdir=-1,void(this.aTime=rnd(200,600))):Math.abs(aDist(this.rot,t))>10?(this.rotdir=aDirTo(this.rot,t),this.spdir=1,void(this.aTime=rnd(100,150))):void(this.rotdir=this.spdir=0)}}),addSoDef({name:"plane",w:200,h:100,sp:1,spmax:1.5,spmin:.7,spdir:0,acc:.002,md:0,rotsp:.2,rotdir:0,trigG:0,trigB:0,trigF:0,nextFireG:0,nextFireB:0,nextFireS:0,nextFireF:0,isFlip:0,tick:function(ft,t){if(this.tickM[this.md].bind(this)(ft,t),3!=this.md){var col=tColW(this,this.pX(-this.w/3,0),this.pY(-this.w/3,0),this.pX(+this.w/3,0),this.pY(+this.w/3,0));col&&(col.o.hit(),col.o.isHard?(this.mEnd=t+1e3,this.md=3):this.md=2)}},tickM:{0:function(ft,t){this.pilot(ft,t),(this.rotdir<0||this.spdir)&&(this.md=1)},1:function(ft,t){this.pilot(ft,t),this.sp=lim(this.sp+this.acc*this.spdir*ft,this.spmin,this.spmax);var flipR=this.isFlip?-1:1;this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*this.rotdir*flipR*ft),this.trigG&&t>this.nextFireG&&(fireWS("bullet",this.pX(.6*this.w,0),this.pY(.6*this.w,0),this.rot,this.sp),this.nextFireG=t+100),this.trigB&&t>this.nextFireB&&(fireWS("bomb",this.pX(0,this.h,0),this.pY(0,this.h),this.rot,this.sp),this.nextFireB=t+600),this.trigF&&t>this.nextFireF&&(this.flip(!this.isFlip),this.nextFireF=t+500),this.y<5&&(this.md=4,this.mEnd=t+rnd(400,700))},2:function(ft,t){t>this.nextFireS&&(fireWS("smoke",this.pX(.6*-this.w,0),this.pY(.6*-this.w,0),this.rot,this.sp),this.nextFireS=t+100),this.rotdir=.1,this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp/2*aDirTo(this.rot,90)*ft)},3:function(ft,t){t>this.mEnd&&(this.place(this.ix,this.iy,this.ir),this.flip(0),this.md=0)},4:function(ft,t){this.sp=rnd((this.spmin+this.spmax)/2,this.spmax),this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,rnd(70,120)),t>this.mEnd&&(this.md=1)}},hit:function(){1==this.md&&(this.md=2)},pilot:function(ft,t){},flip:function(to){this.isFlip=to,this.isFlip?this.inG.setAttribute("transform","translate(0,"+this.h+") scale(1,-1)"):this.inG.setAttribute("transform","translate(0,0)")}}),addSoDef({name:"player",ftick:function(ft){lookAtW(this.x)},pilot:function(ft,t){this.rotdir=kbd(188)||kbd(37)?-1:kbd(191)||kbd(39)?1:0,this.spdir=kbd(88)||kbd(65)?1:kbd(90)?-1:0,this.trigG=kbd(32),this.trigB=kbd(66),this.trigF=kbd(190)}}),addSoDef({name:"so",x:-1e3,y:-1e3,w:100,h:100,rot:0,rdx:1,rdy:0,pX:function(x,y){return this.x+this.rdx*x-this.rdy*y},pY:function(x,y){return this.y+this.rdx*y+this.rdy*x},tDirty:!0,place:function(nx,ny,nr){void 0!==nx&&(this.x=nx),void 0!==ny&&(this.y=ny),void 0!==nr&&(this.rot=alim(nr),this.rdx=Math.cos(this.rot*Math.PI/180),this.rdy=Math.sin(this.rot*Math.PI/180)),this.tDirty=!0},setT:function(){this.tDirty&&(this.e.setAttribute("transform","translate("+(this.x-this.w/2)+","+(this.y-this.h/2)+") rotate("+this.rot+","+this.w/2+","+this.h/2+")"),this.tDirty=!1)},onCreate:function(){},postCreate:function(){},tick:function(ft,t){},ftick:function(ft,t){},hit:function(ob,col){},tCol:function(x,y,x2,y2){return li(x,y,x2,y2,this.pX(-this.w/2,-this.h/2),this.pY(-this.w/2,-this.h/2),this.pX(this.w/2,this.h/2),this.pY(this.w/2,this.h/2))||li(x,y,x2,y2,this.pX(-this.w/2,this.h/2),this.pY(-this.w/2,this.h/2),this.pX(this.w/2,-this.h/2),this.pY(this.w/2,-this.h/2))}}),_ws={},addSoDef({name:"weapon",life:0,tCol:function(x,y,x2,y2){return null},fire:function(x,y,r,sp){this.usesp&&(this.sp=sp),this.place(x,y,r),this.life=this.lifeSpan},tick:function(ft,t){if(!(this.life<=0)){var col=tColW(this,this.x,this.y,this.x+this.rdx*(this.w/2+this.sp*ft),this.y+this.rdy*(this.w/2+this.sp*ft));col&&this.kill&&(this.life=0,col.o.hit(this,col)),this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*aDirTo(this.rot,90)*ft),this.life-=ft,this.life<=0&&this.place(-1e3,-1e3,0)}}}),addSoDef({name:"bullet",w:200,h:10,lifeSpan:500,sp:3,usesp:0,rotsp:0,kill:!0}),addSoDef({name:"bomb",w:50,h:50,lifeSpan:5e3,sp:0,usesp:1,rotsp:.02,kill:!0}),addSoDef({name:"smoke",w:50,h:50,lifeSpan:1e3,sp:.25,usesp:0,rotsp:0});var _so=[],_wel=document.getElementById("world"),_pp=null;function addSo(ty,cls,x,y,r){let so=mkSo(ty,cls,x,y,r);return _wel.appendChild(so.e),_so.push(so),so.postCreate(),so}function stW(){addWS(25,"bullet","weapon"),addWS(10,"bomb","weapon"),addWS(30,"smoke","weapon"),addSo("landb","std",1e4,1e3),_pp=addSo("plane","player",8200,1350,0),addSo("hut","std",4600,1120,0),addSo("tank","std",3300,1150,0),addSo("plane","enemy",8600,1350,0),addSo("plane","enemy",1400,200,0),addSo("plane","enemy",12e3,900,0),requestAnimationFrame(gl)}function lookAtW(x){_wel.setAttribute("viewBox",x-1e3+",0,20000,2000")}function tColW(ig,x,y,x2,y2){for(let i=0;i<_so.length;i+=1){if(ig===_so[i])continue;let res=_so[i].tCol(x,y,x2,y2);if(res)return res.o=_so[i],res}return null}var _st=0;function gl(t){let ft=10;_st&&(ft=t-_st),ft>100&&(ft=100),_st=t,_so.forEach(o=>{o.tick(ft,t)}),_so.forEach(o=>{o.ftick(ft,t),o.setT()}),requestAnimationFrame(gl)}