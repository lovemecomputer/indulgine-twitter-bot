// color scheme
var dark = "#414141";
var blue = "#2328ff";
var blueFaded = "#f7f7ff";
var pink = "#9f81b3";
var pinkFaded = "#fbf0f8";


// helper functions

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChance(odds) {
  var roll = Math.random();
  return roll < odds
    ? true
    : false
}


// numbers
var width = 1024;
var height = 512;
var minPaths = 1;
var maxPaths = 8;
var numberOfHorizontalLines;
var sketchy = false;


// elements
var svgDocument,
  wrapper;

var glyphs = ["∅", "∆", "∢", "∡", "⨚", "∴", "∻", "⩥", "⫰", "⫯", "⫮", "⟜", "⟢", "⟣", "⦚", "⧬", "☼", "⧘", "☌", "☍", "⚯", "☊", "☭", "⚐"];


// functions

function insertCurvyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, "path");
  newpath.setAttributeNS(null, "id", `curvyPath${index}`);
  newpath.setAttributeNS(null, "d", `M -2,${ypos} C ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)}`);
  // newpath.setAttributeNS(null, "d", "M " + ypos + " C ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)} ${getRandomInt(20, 800)},${getRandomInt(20, 800)}");
  newpath.setAttributeNS(null, "stroke", pink);
  newpath.setAttributeNS(null, "stroke-width", getRandom(.1, 1));
  newpath.setAttributeNS(null, "opacity", getRandom(.3, .8));
  newpath.setAttributeNS(null, "fill", "none");
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence2)');
  wrapper.appendChild(newpath);
}


function insertGlitchyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, "path");
  newpath.setAttributeNS(null, "id", `glitchyPath${index}`);
  newpath.setAttributeNS(null, "d", `M -2 ${ypos} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 650)}`);
  newpath.setAttributeNS(null, "stroke", dark);
  newpath.setAttributeNS(null, "stroke-width", getRandom(.8, 2.1));
  // newpath.setAttributeNS(null, "stroke-width", getRandom(2, 8));
  newpath.setAttributeNS(null, "stroke-linecap", "round");
  // newpath.setAttributeNS(null, "stroke-dasharray", "5,5");
  newpath.setAttributeNS(null, "opacity", 1);
  newpath.setAttributeNS(null, "fill", "none");
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
  wrapper.appendChild(newpath);
  return newpath
}


function insertReachingyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, "path");

  newpath.setAttributeNS(null, "id", `reachingPath${index}`);
  newpath.setAttributeNS(null, "d", `M -2 ${ypos} h ${getRandomInt(20, 650)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)}`);
  newpath.setAttributeNS(null, "stroke", dark);
  newpath.setAttributeNS(null, "stroke-width", getRandom(.8, 2.1));
  // newpath.setAttributeNS(null, "stroke-width", getRandom(2, 8));
  newpath.setAttributeNS(null, "stroke-linecap", "round");
  // newpath.setAttributeNS(null, "stroke-dasharray", "5,5");
  newpath.setAttributeNS(null, "opacity", 1);
  newpath.setAttributeNS(null, "fill", "none");
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
  wrapper.appendChild(newpath);
}


function insertText(className, text, xpos, ypos, ) {
  // var newText = document.createElementNS(svgNS,"text");
  var newText = document.createElementNS(document.rootElement.namespaceURI, "text");
  newText.setAttributeNS(null, "x", xpos);
  newText.setAttributeNS(null, "y", ypos);
  newText.setAttributeNS(null, "class", className);
  // newText.setAttributeNS(null,"font-size","100");
  // newText.setAttributeNS(null, 'filter', 'url(#dropShadow)');
  // newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
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

  // image effects/filtering
  svgimg.setAttributeNS(null, 'filter', 'url(#turbulence0)');
  svgimg.setAttributeNS(null, 'opacity', '.2');

  // offset image background
  if(randomChance(.3)) {
    svgimg.setAttributeNS(null,'transform', `rotate(${getRandom(-10,10)})`);
    svgimg.setAttributeNS(null,'x', `${getRandom(-120,120)}`);
    svgimg.setAttributeNS(null,'y', `${getRandom(-120,120)}`);
  }
  wrapper.appendChild(svgimg);
}


// start image generation


function initialization(event) {
  svgDocument = event.target.ownerDocument
  wrapper = document.getElementById("wrapper")

  if(randomChance(.4)) sketchy = true;
  if(sketchy) wrapper.setAttributeNS(null, 'class', 'sketchy');

  numberOfHorizontalLines = getRandomInt(minPaths, maxPaths);
  for (var i = 1; i <= numberOfHorizontalLines; i++) {
    insertCurvyPath(i, getRandomInt(10, height - 100));
    insertGlitchyPath(i, getRandomInt(10, height - 100));
    // insertGlitchyPath(i, i/maxPaths * 512);
  }

  // insert text
  var textXPos = getRandomInt(0, width / 2 - 80);
  var textYPos = getRandomInt(40, height - 100);
  var firstLine = insertText("firstLine", "What do machines want?", textXPos, textYPos);
  var text2XPos = textXPos + getRandomInt(-(width / 6), width / 6);
  var text2YPos =  textYPos + getRandomInt(23, height / 6);
  if (text2XPos < 0) text2XPos = 0;
  if (text2XPos > width/3+40) text2XPos = width/3+40;
  var secondLine = insertText("secondLine", "stereoscopic tingles.", text2XPos, text2YPos);

  // chance repeat text from second line
  if(randomChance(.34)) {
    var newYPos = text2YPos;
    while(newYPos < 512) {
      newYPos += text2YPos - textYPos;
      var repeated = insertText("secondLine", "stereoscopic tingles.", text2XPos, newYPos);

      // outline or opacity adjustment
      if(randomChance(.5)) {
        secondLine.setAttributeNS(null, "stroke", dark);
        secondLine.setAttributeNS(null, "stroke-width", 2);
        secondLine.setAttributeNS(null, "fill", 'transparent');
        repeated.setAttributeNS(null, "stroke", dark);
        repeated.setAttributeNS(null, "stroke-width", 2);
        repeated.setAttributeNS(null, "fill", 'transparent');
      } else {
        repeated.setAttributeNS(null, "opacity", (512-newYPos) / 512);
        repeated.setAttributeNS(null, 'filter', 'url(#turbulence2)');
      }

      // insert path for each new line
      var line = insertGlitchyPath(newYPos,newYPos)
      line.setAttributeNS(null, 'opacity', .35)
    }

  }

  // insert paper texture
  if(randomChance(.5)) insertImage('.overlay', 'http://i.imgur.com/2LhcHBX.png', 'overlay', 0, 0, '100%')

  if(randomChance(.065))wrapper.setAttributeNS(null, 'filter', 'url(#blurMe2)');
  if(randomChance(.1)) wrapper.setAttributeNS(null, 'filter', 'url(#blurMe1)');
  // document.getElementById('blurMe').querySelector('feGaussianBlur').setAttribute(null, 'stdDeviation', 5)
}
