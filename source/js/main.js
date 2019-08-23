function start()
{
  //for real
  attachKb(document.getElementById('top'));
  createLevel();
}

function createLevel()
{
  create('plane','player',2800,350);
  create('plane','main',2300,200);
  create('plane','enemy',3500,600);
  create('landb','std',0,0);
  setInterval(function() { document.getElementById('world').classList.toggle('y84',kbd(32))},500);
}

function addSoDef(def)
{
  if (!window._sodef) window._sodef={}
  window._sodef[def.name]=def;
}

function create(id,cls,x,y)
{
  var df = document.importNode(document.querySelector('#'+id).content, true);
  var e=df.querySelector('g');
  e.setAttribute('transform','translate('+x+','+y+')')
  e.classList.add(cls);
  //assign class bits by function
  document.getElementById('world').appendChild(e);
  ret={
    e: e,
  };

  if (window._sodef[id]) Object.assign(ret,window._sodef[id]);
  if (window._sodef[cls]) ret=Object.assign(ret,window._sodef[cls]);
  if (ret.onCreate) ret.onCreate();
  return ret;
}
