var _kbel,_kb={};function attachKb(el){el.onkeydown=function(e){e=e||window.event,_kb[e.keyCode]=!0},el.onkeyup=function(e){e=e||window.event,_kb[e.keyCode]=!1},_kbel=el,focusKb()}function focusKb(){_kbel.focus()}function kbd(c){return!!_kb[c]}var _landAlt=[0,0,0,0,0,2,5,6,11,14,15,16,17,16,16,14,12,12,16,16,16,15,12,12,12,14,14,15,14,12,12,12,12,15,15,16,16,16,15,14,14,14,14,14,14,14,14,14,15,14,12,12,12,12,12,12,12,12,12,12,12,15,15,15,16,16,16,15,14,14,12,12,14,16,16,16,15,14,14,16,16,16,16,16,16,16,15,10,10,5,2,0,0,0,0,0,0,0,0,0];function start(){attachKb(document.getElementById("top")),stW()}function addSoDef(def){window._sodef||(window._sodef={}),window._sodef[def.name]=def}function mkSo(id,cls,x,y,r){var e=document.importNode(document.querySelector("#"+id).content,!0).querySelector("g");return e.classList.add(cls),ret={e:e},Object.assign(ret,window._sodef.so),window._sodef[id]&&Object.assign(ret,window._sodef[id]),window._sodef[cls]&&(ret=Object.assign(ret,window._sodef[cls])),ret.onCreate(),ret.place(x,y,r),ret}addSoDef({name:"landb",onCreate:function(){for(var p="M 0 3000",i=0;i<100;i+=1)p+=" L "+200*i+" "+100*_landAlt[i];p+=" V 3000 Z",this.e.querySelector("path").setAttribute("d",p),console.log("reset path!")}}),addSoDef({name:"plane",sp:1,rotsp:.2,rotdir:0,tick:function(ft,t){this.pilot(),this.place(this.x+this.rdx*this.sp*ft,this.y+this.rdy*this.sp*ft,this.rot+this.rotsp*this.rotdir*ft)},pilot:function(ft,t){}}),addSoDef({name:"player",ftick:function(ft){lookAtW(this.x)},pilot:function(ft,t){this.rotdir=kbd(188)||kbd(37)?-1:kbd(190)||kbd(39)?1:0}}),addSoDef({name:"so",x:-1e3,y:-1e3,rot:0,rdx:1,rdy:0,tDirty:!0,place:function(nx,ny,nr){void 0!==nx&&(this.x=nx),void 0!==ny&&(this.y=ny),void 0!==nr&&(this.rot=nr,this.rdx=Math.cos(nr*Math.PI/180),this.rdy=Math.sin(nr*Math.PI/180)),this.tDirty=!0},setT:function(){this.tDirty&&(this.e.setAttribute("transform","translate("+this.x+","+this.y+") rotate("+this.rot+")"),this.tDirty=!1)},onCreate:function(){},tick:function(ft,t){},ftick:function(ft,t){}});var _so=[],_wel=document.getElementById("world");function addSo(ty,cls,x,y,r){let so=mkSo(ty,cls,x,y,r);_wel.appendChild(so.e),_so.push(so)}function stW(){addSo("plane","player",1300,350,0),addSo("plane","enemy",1300,200,5),addSo("plane","enemy",1300,600,-5),addSo("landb","std",0,0),setInterval(function(){document.getElementById("world").classList.toggle("y84",kbd(32))},500),requestAnimationFrame(gl)}function lookAtW(x){_wel.setAttribute("viewBox",x-1e3+",0,20000,2000")}var _st=0;function gl(t){let ft=10;_st&&(ft=t-_st),ft>100&&(ft=100),_st=t,console.log("fps: "+(1e3/ft).toFixed(0)),_so.forEach(o=>{o.tick(ft,t)}),_so.forEach(o=>{o.ftick(ft,t),o.setT()}),requestAnimationFrame(gl)}