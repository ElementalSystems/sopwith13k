

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
