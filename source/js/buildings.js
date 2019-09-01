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
      //add score
    }
  }

});

addSoDef({
  name: 'fhut',
  template: 'hut',
});

addSoDef({
  name: 'ehut',
  template: 'hut',
  dCls: 'enemy',
});

addSoDef({
  name: 'fblk',
  template: 'blk',
});

addSoDef({
  name: 'eblk',
  template: 'blk',
  dCls: 'enemy',
});


addSoDef({
  name: 'ftk',
  template: 'tk',
});

addSoDef({
  name: 'etk',
  template: 'tk',
  dCls: 'enemy',
});

addSoDef({
  name: 'etank',
  template: 'tank',
  dCls: 'enemy',
  w: 200,
  h: 100,
});

addSoDef({
  name: 'ftank',
  template: 'tank',
  w: 200,
  h: 100,
});
