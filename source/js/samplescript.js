function start()
{
  console.log('start up code');
  console.log('change soon');
  create('plane','main',800,100);
  create('plane','enemy',100,300);
  setInterval(function() { document.getElementById('world').classList.toggle('y84')},5000);
}

function create(id,cls,x,y)
{
  var df = document.importNode(document.querySelector('#'+id).content, true);
  var e=df.querySelector('g');
  var top=df.querySelector('svg');
  e.setAttribute('transform','translate('+x+','+y+') ')
  top.classList.add(cls);
  document.getElementById('world').appendChild(df);
  return {
    e: e,
    top: top
  }

}
