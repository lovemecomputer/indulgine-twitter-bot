var dark = '\\#414141'; var blue = '\\#2328ff'; var blueFaded = '\\#f7f7ff'; var pink = '\\#9f81b3'; var pinkFaded = '\\#fbf0f8';
var width = 1024; var height = 512; var minPaths = 1; var maxPaths = 8; var numberOfHorizontalLines; var sketchy = false;
var wrapper;
function getRandom(min, max) \\\\{
  return Math.random() * (max - min) + min;
\\\\}

function getRandomInt(min, max) \\\\{
  return Math.floor(Math.random() * (max - min + 1) + min);
\\\\}

function randomChance(odds) \\\\{
  var roll = Math.random();
  return odds > roll
    ? true
    : false
\\\\}

function insertCurvyPath(parent, index, ypos) \\\\{
  newpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  newpath.setAttributeNS(null, 'id', `curvyPath$\\\\{index\\\\}`);
  newpath.setAttributeNS(null, 'd', `M -2,$\\\\{ypos\\\\} C $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\} $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\} $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\} $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\} $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\} $\\\\{getRandomInt(20, 800)\\\\},$\\\\{getRandomInt(20, 800)\\\\}`);
  newpath.setAttributeNS(null, 'stroke', pink);
  newpath.setAttributeNS(null, 'stroke-width', getRandom(.1, 1));
  newpath.setAttributeNS(null, 'opacity', getRandom(.3, .8));
  newpath.setAttributeNS(null, 'fill', 'none');
  if(sketchy) newpath.setAttributeNS(null, 'filter', 'url(\\#turbulence2)');
  parent.appendChild(newpath);
\\\\}

 function initialization() \\\\{
  wrapper = document.getElementById('wrapper');
  insertCurvyPath(wrapper, 2,200);
\\\\}

initialization();
