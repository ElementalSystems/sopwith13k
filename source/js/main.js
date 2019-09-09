function start(gt)
{
  aiso=(gt==0)?0:10000;
  forcey=(gt==2)?84:0;
  document.getElementById('meta').classList.add('ded');
  attachKb(document.getElementById('top'));
  stW();
}

function endG()
{
  endW();
  document.getElementById('meta').classList.remove('ded');
}
