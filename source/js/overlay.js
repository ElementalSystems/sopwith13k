

function updateOLN(id,val,denom)
{
   document.getElementById(id+'txt').innerHTML=Math.floor(val);
   if (denom) {
     let p=100-(val/denom)*100;
     document.getElementById(id+'f').style.top=p+'%';
   }
}

function updateOL() //update the figures and stuff on the overlay
{
   updateOLN('sc',_pp.score);
   updateOLN('l',_pp.lCnt,5);
   updateOLN('b',_pp.bCnt,5);
   updateOLN('g',_pp.gCnt,100);
   updateOLN('f',_pp.fCnt,100);
}

var OLT=[
  "Use [Left Arrow] to take off!",//0
  "Use [Left] and [Right] arrows to fly the plane!",//1
  "Use [A] and [Z] to control your speed",//2
  "[Space Bar] to Fire Guns or [B] to drop a bomb",//3
  "[B] to drop a bomb",//4
  "Use [Down Arrow] to flip your plane.",//5
  "GAME OVER", //6
  "** VICTORY **",  //7
  "Destroy all 17 enemy buildings to win.", //8
];

var _lolt=-1;
var _loltId=0;
function OLShowT(i)
{
   if (i==_lolt) return; //already doont that
   _lolt=i;
   document.getElementById('ottxt').innerHTML=OLT[i];
   document.getElementById('ottxt').classList.toggle("flash",true);
   if (_loltId) clearTimeout(_loltId);
   _loltId=setTimeout(()=>{
     document.getElementById('ottxt').classList.toggle("flash",false);
     _loltId=0;
   },3000);

}
