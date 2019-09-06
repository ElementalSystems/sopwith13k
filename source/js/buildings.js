addSoDef({
  name: 'stb', //standard building thing
  w: 200,
  h: 200,
  ded: 0,
  hit: function() {
    if (!this.ded) {
      this.ded=1;
      this.e.classList.add('ded');
      this.e.setAttribute('mask','url(#dedM)');
      if (this.shadow) this.shadow.e.classList.add('ded');
      //add score
      _pp.score+=this.scv;
    }
  }

});

addSoDef({
  name: 'fhut',
  template: 'hut',
  scv: -200,
  shadowId: 'fdot',
});

addSoDef({
  name: 'ehut',
  template: 'hut',
  dCls: 'enemy',
  scv: 200,
  shadowId: 'edot',
});

addSoDef({
  name: 'fblk',
  template: 'blk',
  scv: -200,
  shadowId: 'fdot',
});

addSoDef({
  name: 'eblk',
  template: 'blk',
  dCls: 'enemy',
  scv: 200,
  shadowId: 'edot',
});


addSoDef({
  name: 'ftk',
  template: 'tk',
  scv: -200,
  shadowId: 'fdot',
});

addSoDef({
  name: 'etk',
  template: 'tk',
  dCls: 'enemy',
  scv: 200,
  shadowId: 'edot',
});

addSoDef({
  name: 'etank',
  template: 'tank',
  dCls: 'enemy',
  w: 200,
  h: 100,
  scv: 500,
  shadowId: 'edot',
});

addSoDef({
  name: 'ftank',
  template: 'tank',
  w: 200,
  h: 100,
  scv: -200,
  shadowId: 'fdot',
});

addSoDef({
  name: 'fdot',
  template: 'dot',
  w: 200,
  h: 200,
});
addSoDef({
  name: 'edot',
  template: 'dot',
  dCls: 'enemy',
  w: 200,
  h: 200,
});
