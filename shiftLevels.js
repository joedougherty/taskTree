function ascendLevels( el, numOfLevels ) {  

  var el = el;

  for (var i=0; i<numOfLevels; i++) {
    el = el.parent();
  }

  return el;

}
