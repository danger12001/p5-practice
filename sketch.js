
var x;
var y;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = createDiv('X: ' + 0);
  y = createDiv('Y: ' + 0);
  x.position(50, 50);
  y.position(50, 80);

}
function mouseMoved() {
  x.remove();
  y.remove();
  x = createDiv('X: ' + mouseX);
  y = createDiv('Y: ' + mouseY);
  x.position(50, 50);
  y.position(50, 80);

}

function mousePressed(){
ellipse(mouseX, mouseY, 25, 25);
x.remove();
y.remove();
x = createDiv('X: ' + mouseX);
y = createDiv('Y: ' + mouseY);
x.position(50, 50);
y.position(50, 80);


}

function mouseDragged(){
ellipse(mouseX, mouseY, 25, 25);
x.remove();
y.remove();
x = createDiv('X: ' + mouseX);
y = createDiv('Y: ' + mouseY);
x.position(50, 50);
y.position(50, 80);

}
