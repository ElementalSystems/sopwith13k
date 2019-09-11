function start(gt)
{
  const aisol=[-3000,0,10000,1000];
  aiso=aisol[gt];
  forcey=(gt==3)?84:0;
  document.getElementById('meta').classList.add('ded');
  attachKb(document.getElementById('top'));
  stW();
}

function endG()
{
  endW();
  document.getElementById('meta').classList.remove('ded');
}
