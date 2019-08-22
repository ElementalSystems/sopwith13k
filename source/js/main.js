function start()
{
  //for real
  attachKb(document.getElementById('top'));
  createLevel();
}

function createLevel()
{
  create('plane','main',1800,0);
  create('plane','main',1800,200);
  create('plane','enemy',1800,300);
  setInterval(function() { document.getElementById('world').classList.toggle('y84',kbd(32))},500);
}

sobdefs={
  plane: {

  }
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
  if (_sodef[id]) Object.assign(ret,_sodef[id])
  if (ret.onCreate) ret.onCreate();
  return ret;

}
