function lim(v,b,t)
{
  return ((v<b)?b:((v>t)?t:v))
}

function li(p0_x,p0_y, p1_x,p1_y, p2_x, p2_y, p3_x, p3_y)
{
    var s1_x=p1_x - p0_x,
        s1_y=p1_y - p0_y,
        s2_x=p3_x - p2_x,
        s2_y=p3_y - p2_y;
    var dm=(-s2_x * s1_y + s1_x * s2_y);
    if (dm===0) dm=0.0000001;
    var s=(-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / dm;
    var t=( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / dm;

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
       return {
         x: p0_x + (t * s1_x),
         y:  p0_y + (t * s1_y),
       }
    }
    return null; // No collision
}

function rnd(s,e)
{ return Math.random()*(e-s)+s;}

function alim(a)
{
  a=(a+7200)%360;
  return (a>180)?a-360:a;  
}

function aDirTo(f,t)
{
  f=(f+t)%360;
  f=(f>180)?f-360:f;
  return (f>0)?1:-1;
}
