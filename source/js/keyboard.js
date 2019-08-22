var _kb = {};
var _kbel;

function attachKb(el) { //set up and attach the keyboard
  el.onkeydown = function(e) {
    e = e || window.event;
    _kb[e.keyCode] = true;
  }
  el.onkeyup = function(e) {
    e = e || window.event;
    _kb[e.keyCode] = false;
  }
  _kbel=el;
  focusKb();
}

function focusKb()
{
  _kbel.focus();
}

//use to check at any time if a key is down by keycode
function kbd(c) { return !!_kb[c]; }
