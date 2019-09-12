if (!document.monetization)
  document.getElementById('coilb').classList.add('dis');

function start(gt)
{
  const aisol=[-3000,0,10000,5000,5000];
  aiso=aisol[gt];
  forcey=(gt==3)?84:((gt==4)?94:0);
  document.getElementById('meta').classList.add('ded');
  attachKb(document.getElementById('top'));
  stW();
}

function endG()
{
  endW();
  document.getElementById('meta').classList.remove('ded');
}
