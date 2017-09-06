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
  console.log( 'odds: ', odds, '\nroll: ', roll, '\nresult: ', (roll < odds) );
  return roll < odds
    ? true
    : false
}


// numbers
var width = 1024;
var height = 512;
var minPaths = 1;
var maxPaths = 8;
var numberOfHorizontalLines = getRandomInt(minPaths, maxPaths);


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
  newpath.setAttributeNS(null, 'filter', 'url(#turbulence2)');
  wrapper.appendChild(newpath);
}

function insertGlitchyPath(index, ypos) {
  newpath = document.createElementNS(document.rootElement.namespaceURI, "path");
  newpath.setAttributeNS(null, "id", `glitchyPath${index}`);
  newpath.setAttributeNS(null, "d", `M -2 ${ypos} h ${getRandomInt(20, 800)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)} v ${getRandomInt(0, 20)} h ${getRandomInt(20, 800)}`);
  newpath.setAttributeNS(null, "stroke", dark);
  newpath.setAttributeNS(null, "stroke-width", getRandom(.8, 2.1));
  // newpath.setAttributeNS(null, "stroke-width", getRandom(2, 8));
  newpath.setAttributeNS(null, "stroke-linecap", "round");
  // newpath.setAttributeNS(null, "stroke-dasharray", "5,5");
  newpath.setAttributeNS(null, "opacity", 1);
  newpath.setAttributeNS(null, "fill", "none");
  newpath.setAttributeNS(null, 'filter', 'url(#turbulence1)');
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
  newText.setAttributeNS(null, 'filter', 'url(#turbulence2)');
  var textNode = document.createTextNode(text);
  newText.appendChild(textNode);
  wrapper.appendChild(newText);
}

function insertImage(className, imageLink, blendMode, xpos, ypos, width) {
  var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
  // svgimg.setAttributeNS(null,'height','200');
  // svgimg.setAttributeNS(null,'width','200');
  svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', imageLink);
  svgimg.setAttributeNS(null,'x', xpos);
  svgimg.setAttributeNS(null,'y', ypos);
  svgimg.setAttributeNS(null,'width', width);
  svgimg.setAttributeNS(null, 'style', 'mix-blend-mode: multiply');
  // svgimg.setAttributeNS(null, 'visibility', 'visible');
  // $('svg').append(svgimg);
  wrapper.appendChild(svgimg);
}


function initialization(event) {

  svgDocument = event.target.ownerDocument
  wrapper = document.getElementById("wrapper")

  for (var i = 1; i <= numberOfHorizontalLines; i++) {
    insertCurvyPath(i, getRandomInt(10, height - 100));
    insertGlitchyPath(i, getRandomInt(10, height - 100));
    // insertGlitchyPath(i, i/maxPaths * 512);
  }

  var textXPos = getRandomInt(0, width / 2);
  var textYPos = getRandomInt(40, height - 100);
  insertText("firstLine", "Cyborgs love ", textXPos, textYPos);
  var text2XPos = textXPos - getRandomInt(0, width / 6);
  if (text2XPos < 0) text2XPos = 0;
  insertText("secondLine", "stereoscopic tingles.", text2XPos, textYPos + getRandomInt(40, height / 6));

  // insert paper texture
  if(randomChance(.5)) insertImage('.overlay', 'http://i.imgur.com/2LhcHBX.png', 'overlay', 0, 0, '100%')

  if(randomChance(.065))wrapper.setAttributeNS(null, 'filter', 'url(#blurMe2)');
  if(randomChance(.1)) wrapper.setAttributeNS(null, 'filter', 'url(#blurMe1)');
  // document.getElementById('blurMe').querySelector('feGaussianBlur').setAttribute(null, 'stdDeviation', 5)
}
