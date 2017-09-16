var dark = '#414141';
var blue = '#2328ff';
var blueFaded = '#f7f7ff';
var pink = '#9f81b3';
var pinkFaded = '#fbf0f8';


var width = 1024;
var height = 512;
var minPaths = 1;
var maxPaths = 8;
var numberOfHorizontalLines;
var sketchy = false;


var wrapper;



function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChance(odds) {
  var roll = Math.random();
  return odds > roll
    ? true
    : false
}



function insertCurvyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, 'path');
  newpath.setAttributeNS(null, 'id', `curvyPath${index}`);
  newpath.setAttributeNS(null, 'd', `M -2,${ypos} C ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)}`);
  newpath.setAttributeNS(null, 'stroke', pink);
  newpath.setAttributeNS(null, 'stroke-width', getRandom(.1, 1));
  newpath.setAttributeNS(null, 'opacity', getRandom(.3, .8));
  newpath.setAttributeNS(null, 'fill', 'none');
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence2)');
  wrapper.appendChild(newpath);
}


function insertGlitchyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, 'path');
  newpath.setAttributeNS(null, 'id', `glitchyPath${index}`);
  newpath.setAttributeNS(null, 'd', `M -2 ${ypos} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 650)}`);
  newpath.setAttributeNS(null, 'stroke', dark);
  newpath.setAttributeNS(null, 'stroke-width', getRandom(.8, 2.1));
  newpath.setAttributeNS(null, 'stroke-linecap', 'round');
  newpath.setAttributeNS(null, 'opacity', 1);
  newpath.setAttributeNS(null, 'fill', 'none');
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
  wrapper.appendChild(newpath);
  return newpath
}


function insertReachingyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, 'path');

  newpath.setAttributeNS(null, 'id', `reachingPath${index}`);
  newpath.setAttributeNS(null, 'd', `M -2 ${ypos} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)}`);
  newpath.setAttributeNS(null, 'stroke', dark);
  newpath.setAttributeNS(null, 'stroke-width', getRandom(.8, 2.1));
  newpath.setAttributeNS(null, 'stroke-linecap', 'round');
  newpath.setAttributeNS(null, 'opacity', 1);
  newpath.setAttributeNS(null, 'fill', 'none');
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
  wrapper.appendChild(newpath);
}


function insertText(className, text, xpos, ypos, ) {
  var newText = document.createElementNS(document.rootElement.namespaceURI, 'text');
  newText.setAttributeNS(null, 'x', xpos);
  newText.setAttributeNS(null, 'y', ypos);
  newText.setAttributeNS(null, 'class', className);
  if(sketchy) newText.setAttributeNS(null, 'filter', 'url(#turbulence2)');
  var textNode = document.createTextNode(text);
  newText.appendChild(textNode);
  wrapper.appendChild(newText);
  return newText
}

function insertImage(className, imageLink, blendMode, xpos, ypos, width) {
  var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
  svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', imageLink);
  svgimg.setAttributeNS(null,'x', xpos);
  svgimg.setAttributeNS(null,'y', ypos);
  svgimg.setAttributeNS(null,'width', width);
  svgimg.setAttributeNS(null, 'style', 'mix-blend-mode: multiply');

  svgimg.setAttributeNS(null, 'filter', 'url(#turbulence0)');
  svgimg.setAttributeNS(null, 'opacity', '.2');

  if(randomChance(.3)) {
    svgimg.setAttributeNS(null,'transform', `rotate(${getRandom(-10,10)})`);
    svgimg.setAttributeNS(null,'x', `${getRandom(-120,120)}`);
    svgimg.setAttributeNS(null,'y', `${getRandom(-120,120)}`);
  }
  wrapper.appendChild(svgimg);
}




function initialization() {
  wrapper = document.getElementById('wrapper');

  if(randomChance(.4)) sketchy = true;
  if(sketchy) wrapper.setAttributeNS(null, 'class', 'sketchy');

  numberOfHorizontalLines = getRandomInt(minPaths, maxPaths);
  for (var i = 1; numberOfHorizontalLines >= i ; i++) {
    insertCurvyPath(i, getRandomInt(10, height - 100));
    insertGlitchyPath(i, getRandomInt(10, height - 100));
  }

  var firstPhrase = 'Robots crave'
  var secondPhrase = 'autonomous portraits.'
  var textXPos = getRandomInt(0, width / 2 - 100);
  var textYPos = getRandomInt(40, height - 100);
  var firstLine = insertText('firstLine', firstPhrase, textXPos, textYPos);
  var text2XPos = textXPos + getRandomInt(-(width / 6), width / 6);
  var text2YPos =  textYPos + getRandomInt(23, height / 6);
  if (0 > text2XPos) text2XPos = 0;
  if (text2XPos > width/3+40) text2XPos = width/3+40;
  var secondLine = insertText('secondLine', secondPhrase, text2XPos, text2YPos);

  if(randomChance(.34)) {
    var newYPos = text2YPos;
    while(512 > newYPos ) {
      newYPos += text2YPos - textYPos;
      var repeated = insertText('secondLine', secondPhrase, text2XPos, newYPos);

      if(randomChance(.5)) {
        secondLine.setAttributeNS(null, 'stroke', dark);
        secondLine.setAttributeNS(null, 'stroke-width', 2);
        secondLine.setAttributeNS(null, 'fill', 'transparent');
        repeated.setAttributeNS(null, 'stroke', dark);
        repeated.setAttributeNS(null, 'stroke-width', 2);
        repeated.setAttributeNS(null, 'fill', 'transparent');
      } else {
        repeated.setAttributeNS(null, 'opacity', (512-newYPos) / 512);
        repeated.setAttributeNS(null, 'filter', 'url(#turbulence2)');
      }

      var line = insertGlitchyPath(newYPos,newYPos)
      line.setAttributeNS(null, 'opacity', .35)
    }

  }

  if(randomChance(.5)) insertImage('.overlay', 'http://i.imgur.com/2LhcHBX.png', 'overlay', 0, 0, '100%')

  if(randomChance(.065))wrapper.setAttributeNS(null, 'filter', 'url(#blurMe2)');
  if(randomChance(.1)) wrapper.setAttributeNS(null, 'filter', 'url(#blurMe1)');
}

initialization();
