addSoDef({name:"stb",w:200,h:200,ded:0,hit:function(){if(!this.ded){this.ded=1;this.e.classList.add("ded");this.e.setAttribute("mask","url(#dedM)");if(this.shadow)this.shadow.e.classList.add("ded");_pp.score+=this.scv;if(this.scv>0){_pp.vicCnt+=1;if(_pp.vicCnt==5||_pp.vicCnt==12){OLShowT(8)}if(_pp.vicCnt==17){OLShowT(7);setTimeout(endG,5e3)}}fireWS("shrap",this.pX(0,-this.h/4),this.pY(0,-this.h/4),rnd(-60,-120),0);fireWS("shrap",this.pX(0,-this.h/4),this.pY(0,-this.h/4),rnd(-60,-120),0);fireWS("shrap",this.pX(0,-this.h/4),this.pY(0,-this.h/4),rnd(-60,-120),0)}}});addSoDef({name:"fhut",template:"hut",scv:-200,shadowId:"fdot"});addSoDef({name:"ehut",template:"hut",dCls:"enemy",scv:200,shadowId:"edot"});addSoDef({name:"fblk",template:"blk",scv:-200,shadowId:"fdot"});addSoDef({name:"eblk",template:"blk",dCls:"enemy",scv:200,shadowId:"edot"});addSoDef({name:"ftk",template:"tk",scv:-200,shadowId:"fdot"});addSoDef({name:"etk",template:"tk",dCls:"enemy",scv:200,shadowId:"edot"});addSoDef({name:"etank",template:"tank",dCls:"enemy",w:200,h:100,scv:500,shadowId:"edot"});addSoDef({name:"ftank",template:"tank",w:200,h:100,scv:-200,shadowId:"fdot"});addSoDef({name:"fdot",template:"dot",w:200,h:200});addSoDef({name:"edot",template:"dot",dCls:"enemy",w:200,h:200});var _kb={};var _kbel;function attachKb(el){el.onkeydown=function(e){e=e||window.event;_kb[e.keyCode]=true};el.onkeyup=function(e){e=e||window.event;_kb[e.keyCode]=false};_kbel=el;focusKb()}function focusKb(){_kbel.focus()}function kbd(c){return!!_kb[c]}var _landAlt=[0,0,0,0,0,2,5,6,11,14,15,16,17,16,16,14,12,12,16,16,16,15,12,12,12,14,14,15,14,12,12,12,12,15,15,16,16,16,15,14,14,14,14,14,14,14,14,14,15,14,12,12,12,12,12,12,12,12,12,12,12,15,15,15,16,16,16,15,14,14,12,12,14,16,16,16,15,14,14,16,16,16,16,16,16,16,15,10,10,5,2,0,0,0,0,0,0,0,0,0];function getLa(x){if(x<100)return _landAlt[0]*100;if(x>19600)return _landAlt[99]*100;let i=Math.floor(x/200);let r=(x-i*200)/200;return((1-r)*_landAlt[i]+r*_landAlt[i+1])*100}addSoDef({name:"landb",w:2e4,h:2e3,isHard:true,onCreate:function(){this.e.querySelector("path.l1").setAttribute("d",mkLd(0));this.e.querySelector("path.l2").setAttribute("d",mkLd(1));this.e.querySelector("path.l3").setAttribute("d",mkLd(2))},tCol:function(x,y,x2,y2){if(getLa(x)<y)return{x:x,y:getLa(x)};if(getLa(x2)<y2)return{x:x,y:getLa(x)};return null},shadowId:"lmap"});addSoDef({name:"lmap",w:2e4,h:2e3,onCreate:function(){this.e.querySelector("path").setAttribute("d",mkLd(1))}});function mkLd(t){var p="M 0 3000 V 0";var j=200;switch(t){case 0:for(var i=0;i<2e4;i+=20)p+=" h 10 V "+getLa(i)+" h 10";break;case 1:for(var i=0;i<2e4;i+=200)p+=" L "+i+" "+getLa(i);break;case 2:for(var i=0;i<2e4;i+=j)p+=" S "+(i-j/2)+" "+(getLa(i)+(getLa(i-j)-getLa(i+j))/4)+" "+i+" "+getLa(i);break}p+=" V 3000 Z";return p}if(!document.monetization)document.getElementById("coilb").classList.add("dis");function start(gt){const aisol=[-3e3,0,1e4,2e4,2e4];aiso=aisol[gt];forcey=gt==3?84:gt==4?94:0;document.getElementById("meta").classList.add("ded");attachKb(document.getElementById("top"));stW()}function endG(){endW();document.getElementById("meta").classList.remove("ded")}function updateOLN(id,val,denom){document.getElementById(id+"txt").innerHTML=Math.floor(val);if(denom){let p=100-val/denom*100;document.getElementById(id+"f").style.top=p+"%"}}function updateOL(){updateOLN("sc",_pp.score);updateOLN("l",_pp.lCnt,5);updateOLN("b",_pp.bCnt,5);updateOLN("g",_pp.gCnt,100);updateOLN("f",_pp.fCnt,100)}var OLT=["Use [Left Arrow] to take off!","Use [Left] and [Right] arrows to fly the plane!","Use [A] and [Z] to control your speed","[Space Bar] to Fire Guns or [B] to drop a bomb","[B] to drop a bomb","Use [Down Arrow] to flip your plane.","GAME OVER","** VICTORY **","Destroy all 17 enemy buildings to win."];var _lolt=-1;var _loltId=0;function OLShowT(i){if(i==_lolt)return;_lolt=i;document.getElementById("ottxt").innerHTML=OLT[i];document.getElementById("ottxt").classList.toggle("flash",true);if(_loltId)clearTimeout(_loltId);_loltId=setTimeout(()=>{document.getElementById("ottxt").classList.toggle("flash",false);_loltId=0},3e3)}var aiso=0;addSoDef({name:"enemy",aTime:0,pilot:function(ft,t){if(this.aTime<=0)this.chooseAction();this.aTime-=ft},chooseAction:function(){if(this.md==0){if(_pp.md==0)return;if(rnd(0,5e3)>_pp.score+aiso){this.aTime=2e3;return}this.rotdir=-1;this.spdir=1;this.aTime=rnd(500,800);return}this.trigG=within(this.pX(this.w*4,0),this.pY(this.w*4,0),_pp.x,_pp.y,this.w*2)&&rnd(0,1e4)<_pp.score+aiso;let xp=_pp.md==1?_pp.x:this.ix;let xdiff=xp-this.x;let ao=89;if(this.y>1e3)ao=80;if(this.y<300)ao=100;let t=-90+sgn(xdiff)*ao;if(sgn(xdiff)!=sgn(this.rdx)){this.rotdir=aDirTo(this.rot,t);this.spdir=-1;this.aTime=rnd(200,600);return}if(Math.abs(aDist(this.rot,t))>10){this.rotdir=aDirTo(this.rot,t);this.spdir=1;this.aTime=rnd(100,150);return}this.rotdir=this.spdir=0;this.aTime=rnd(200,250)},scv:200,shadowId:"edot"});addSoDef({name:"plane",w:200,h:100,sp:.8,spmax:1.5,spmin:.5,spdir:0,acc:.001,md:0,rotsp:.2,rotdir:0,trigG:0,trigB:0,trigF:0,nextFireG:0,nextFireB:0,nextFireS:0,nextFireF:0,nextLand:0,isFlip:0,flipR:1,bCnt:5,gCnt:99,fCnt:99,lCnt:99,tick:function(ft,t){this.tickM[this.md].bind(this)(ft,t);if(this.md!=3){var col=tColW(this,this.pX(-this.w/3,0),this.pY(-this.w/3,0),this.pX(+this.w/3,0),this.pY(+this.w/3,0));if(col){col.o.hit();if(col.o.isHard){this.mEnd=t+1e3;this.ded=true;_pp.score+=this.scv;this.lCnt-=1;this.sp=0;if(this!=_pp)this.mEnd+=5e3;if(!this.lCnt){this.mEnd+=1e4;OLShowT(6)}this.md=3;fireWS("shrap",this.pX(0,-this.h),this.pY(0,-this.h),rnd(-60,-120),0);fireWS("shrap",this.pX(0,-this.h),this.pY(0,-this.h),rnd(-60,-120),0);fireWS("shrap",this.pX(0,-this.h),this.pY(0,-this.h),rnd(-60,-120),0)}else{this.md=2}}}this.e.classList.toggle("b1",this.sp>.7&&this.sp<1.1);this.e.classList.toggle("b2",this.sp>=1.1)},tickM:{0:function(ft,t){this.pilot(ft,t);this.bCnt=5;this.fCnt=this.gCnt=99;this.ded=false;this.sp=0;if(this.rotdir<0||this.spdir){this.md=1;this.sp=.7;this.nextLand=t+3e3}},1:function(ft,t){this.pilot(ft,t);this.sp=lim(this.sp+this.acc*this.spdir*ft,this.spmin,this.spmax);this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*this.rotdir*this.flipR*ft);this.fCnt-=this.sp*2*ft/1e3;if(this.fCnt<0){this.md=2}if(this.trigG&&this.gCnt>0&&t>this.nextFireG){fireWS("bullet",this.pX(this.w*.6,0),this.pY(this.w*.6,0),this.rot,this.sp);this.gCnt-=1;this.nextFireG=t+100}if(this.trigB&&t>this.nextFireB&&this.bCnt>0){fireWS("bomb",this.pX(0,this.h*this.flipR,0),this.pY(0,this.h*this.flipR),this.rot,this.sp);this.bCnt-=1;this.nextFireB=t+600}if(this.trigF&&t>this.nextFireF){this.flip(!this.isFlip);this.nextFireF=t+500}if(this.y<5){this.md=4;this.mEnd=t+rnd(400,700)}if(t>this.nextLand&&within(this.x,this.y,this.ix,this.iy,120)){this.md=0;this.flip(0);this.place(this.ix,this.iy,this.ir)}},2:function(ft,t){if(t>this.nextFireS){fireWS("smoke",this.pX(-this.w*.2,0),this.pY(-this.w*.2,0),this.rot,this.sp);this.nextFireS=t+100}this.rotdir=.1;this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp/2*aDirTo(this.rot,90)*ft)},3:function(ft,t){if(t>this.mEnd){this.place(this.ix,this.iy,this.ir);this.flip(0);this.md=0;if(_pp.lCnt==0){endG()}}},4:function(ft,t){this.sp=rnd((this.spmin+this.spmax)/2,this.spmax);this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,rnd(70,120));if(t>this.mEnd)this.md=1}},hit:function(){if(this.md<=1)this.md=2},pilot:function(ft,t){},flip:function(to){this.isFlip=to;this.flipR=this.isFlip?-1:1;if(this.isFlip)this.inG.setAttribute("transform","translate(0,"+this.h+") scale(1,-1)");else this.inG.setAttribute("transform","translate(0,0)")}});addSoDef({name:"player",ftick:function(ft){lookAtW(this.x)},pilot:function(ft,t){this.rotdir=kbd(188)||kbd(37)?-1:kbd(191)||kbd(39)?1:0;this.spdir=kbd(88)||kbd(65)?1:kbd(90)?-1:0;this.trigG=kbd(32);this.trigB=kbd(66);this.trigF=kbd(190)||kbd(40)},score:0,vicCnt:0,lCnt:5,scv:-200,shadowId:"fdot"});function addSoDef(def){if(!window._sodef)window._sodef={};window._sodef[def.name]=def}addSoDef({name:"so",x:-1e3,y:-1e3,w:100,h:100,rot:0,rdx:1,rdy:0,pX:function(x,y){return this.x+this.rdx*x-this.rdy*y},pY:function(x,y){return this.y+this.rdx*y+this.rdy*x},tDirty:true,dCls:"sod",place:function(nx,ny,nr){if(nx!==undefined)this.x=nx;if(ny!==undefined)this.y=ny;if(nr!==undefined){this.rot=alim(nr);this.rdx=Math.cos(this.rot*Math.PI/180);this.rdy=Math.sin(this.rot*Math.PI/180)}this.tDirty=true;if(this.shadow)this.shadow.place(nx,ny,nr)},setT:function(){if(!this.tDirty)return;this.e.setAttribute("transform","translate("+(this.x-this.w/2)+","+(this.y-this.h/2)+") rotate("+this.rot+","+this.w/2+","+this.h/2+")");this.tDirty=false;if(this.shadow)this.shadow.setT()},onCreate:function(){},postCreate:function(){},tick:function(ft,t){},ftick:function(ft,t){},hit:function(ob,col){},tCol:function(x,y,x2,y2){if(this.ded)return null;return li(x,y,x2,y2,this.pX(-this.w/2,-this.h/2),this.pY(-this.w/2,-this.h/2),this.pX(this.w/2,this.h/2),this.pY(this.w/2,this.h/2))||li(x,y,x2,y2,this.pX(-this.w/2,this.h/2),this.pY(-this.w/2,this.h/2),this.pX(this.w/2,-this.h/2),this.pY(this.w/2,-this.h/2))}});function mkSo(id,cls,x,y,r){let ret={template:id,ix:x,iy:y,ir:r};Object.assign(ret,window._sodef["so"]);Object.assign(ret,window._sodef[id]);Object.assign(ret,window._sodef[cls]);let df=document.importNode(document.querySelector("#"+ret.template).content,true);let e=df.querySelector("g");e.classList.add(id);e.classList.add(cls);e.classList.add(ret.template);e.classList.add(ret.dCls);ret.e=e;ret.inG=e.querySelector("g"),ret.onCreate();if(ret.shadowId)ret.shadow=mkSo(ret.shadowId,"shadow",x,y,r);ret.place(x,y,r);return ret}function lim(v,b,t){return v<b?b:v>t?t:v}function li(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y){var s1_x=p1_x-p0_x,s1_y=p1_y-p0_y,s2_x=p3_x-p2_x,s2_y=p3_y-p2_y;var dm=-s2_x*s1_y+s1_x*s2_y;if(dm===0)dm=1e-7;var s=(-s1_y*(p0_x-p2_x)+s1_x*(p0_y-p2_y))/dm;var t=(s2_x*(p0_y-p2_y)-s2_y*(p0_x-p2_x))/dm;if(s>=0&&s<=1&&t>=0&&t<=1){return{x:p0_x+t*s1_x,y:p0_y+t*s1_y}}return null}function rnd(s,e){return Math.random()*(e-s)+s}function alim(a){a=(a+7200)%360;return a>180?a-360:a}function aDist(a,t){let f=(t-a+720)%360;f=f>180?f-360:f;return f}function aDirTo(a,t){return sgn(aDist(a,t))}function sgn(x){return x<0?-1:1}function within(x1,y1,x2,y2,r){return(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)<r*r}_ws={};function addWS(n,ty,cls){var r=[];for(i=0;i<n;i+=1)r.push(addSo(ty,cls,-1e3,-1e3,0));_ws[ty]=r;return r}function fireWS(ty,x,y,r,sp){let ammo=_ws[ty];(ammo.find(e=>e.life<=0)||ammo[0]).fire(x,y,r,sp)}addSoDef({name:"weapon",life:0,tCol:function(x,y,x2,y2){return null},fire:function(x,y,r,sp){if(this.usesp)this.sp=sp;this.place(x,y,r);this.life=this.lifeSpan},tick:function(ft,t){if(this.life<=0)return;var col=tColW(this,this.x,this.y,this.x+this.rdx*(this.w/2+this.sp*ft),this.y+this.rdy*(this.w/2+this.sp*ft));if(col&&this.kill){this.life=0;col.o.hit(this,col)}this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*aDirTo(this.rot,90)*ft);this.life-=ft;if(this.life<=0){this.place(-1e3,-1e3,0)}}});addSoDef({name:"bullet",w:200,h:10,lifeSpan:700,sp:2,usesp:0,rotsp:0,kill:true});addSoDef({name:"bomb",w:50,h:50,lifeSpan:1e4,sp:0,usesp:1,rotsp:.05,kill:true});addSoDef({name:"shrap",w:15,h:15,lifeSpan:600,sp:.3,usesp:0,rotsp:.2,kill:true});addSoDef({name:"smoke",w:50,h:50,lifeSpan:1e3,sp:.25,usesp:0,rotsp:0});var _so=[];var _wel=document.getElementById("world");var _swel=document.getElementById("map");var _pp=null;var _ended=true;var forcey=0;function addSo(ty,cls,x,y,r){let so=mkSo(ty,cls,x,y,r);_wel.appendChild(so.e);_so.unshift(so);so.postCreate();if(so.shadow){_swel.appendChild(so.shadow.e)}return so}function stW(){_so=[];_swel.innerHTML="";_wel.innerHTML="";_ended=false;addWS(25,"bullet","weapon");addWS(10,"bomb","weapon");addWS(30,"smoke","weapon");addWS(10,"shrap","weapon");addSo("landb","std",1e4,1e3);addSo("stb","eblk",1300,500,0);addSo("stb","etank",1850,1400,0);addSo("stb","ehut",2700,1520,0);addSo("stb","ehut",3300,1120,0);addSo("plane","enemy",3690,1550,0);addSo("stb","etank",4200,1500,0);addSo("stb","ehut",4500,1120,0);addSo("stb","eblk",6e3,1120,0);_pp=addSo("plane","player",8400,1350,0);addSo("stb","ftk",8e3,1320,0);addSo("stb","fhut",8200,1320,0);addSo("stb","ftank",9500,1400,0);addSo("stb","etank",10100,1150,0);addSo("plane","enemy",11100,1150,0);addSo("stb","ehut",11700,1120,0);addSo("stb","etk",11900,1120,0);addSo("stb","eblk",13200,1520,0);addSo("stb","eblk",14300,1250,0);addSo("stb","etank",15e3,1560,0);addSo("stb","etank",15850,1560,0);addSo("plane","enemy",16200,1560,0);addSo("stb","ehut",17e3,1520,0);addSo("stb","ehut",17500,920,0);addSo("stb","eblk",18100,120,0);requestAnimationFrame(gl)}function endW(){_ended=true}var laa=[5500,94,8420,92,11e3,88,14e3,84,7100,5,8400,0,8460,1,11e3,3,14e3,2];var _wy=92;function lookAtW(x){_wel.setAttribute("viewBox",x-2e3+",0,20000,2000");let nwy=_wy;for(let i=0;i<laa.length;i+=2)if(Math.abs(laa[i]-x)<50){let v=laa[i+1];if(v<80)OLShowT(v);else nwy=v}if(forcey)nwy=forcey;if(nwy!=_wy){_wy=nwy;var cl=document.getElementById("top").classList;cl.toggle("y84",_wy==84);cl.toggle("y88",_wy==88);cl.toggle("y92",_wy==92);cl.toggle("y04",_wy==94);switch(_wy){case 84:document.getElementById("gmtxt").innerHTML="1984: CGA 4 Colours 320 x 200";break;case 88:document.getElementById("gmtxt").innerHTML="1988: EGA 16 Colours 640 x 350";break;case 92:document.getElementById("gmtxt").innerHTML="1994: SVGA 256+ Colours 800 x 600";break;case 94:document.getElementById("gmtxt").innerHTML="2004: GPU 16,777,216 Colours 1024+ x 800";break}document.getElementById("gmtxt").classList.toggle("active",true);setTimeout(()=>{document.getElementById("gmtxt").classList.toggle("active",false)},3e3)}}function tColW(ig,x,y,x2,y2){for(let i=0;i<_so.length;i+=1){if(ig===_so[i])continue;let res=_so[i].tCol(x,y,x2,y2);if(res){res.o=_so[i];return res}}return null}var _st=0;function gl(t){let ft=10;if(_st)ft=t-_st;if(ft>100)ft=100;_st=t;_so.forEach(o=>{o.tick(ft,t)});_so.forEach(o=>{o.ftick(ft,t);o.setT()});updateOL();if(!_ended)requestAnimationFrame(gl)}