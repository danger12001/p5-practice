var data;
var x;
var y;
var strokeColor;
function setup() {
  data = createDiv('');
  createCanvas(windowWidth, windowHeight);
  x = createDiv('X: ' + 0);
  y = createDiv('Y: ' + 0);
  x.parent(data);
  y.parent(data);
  x.position(50, 50);
  y.position(50, 80);
var slider = createSlider(100, 255 , 0);
  slider.position(50, 100);
  slider.parent(data);
  strokeColor = slider.value();
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

    ellipse(mouseX, mouseY, 10, 10).fill(strokeColor);

x.remove();
y.remove();
x = createDiv('X: ' + mouseX);
y = createDiv('Y: ' + mouseY);
x.position(50, 50);
y.position(50, 80);


}

function mouseDragged(){
ellipse(mouseX, mouseY, 10, 10);
x.remove();
y.remove();
x = createDiv('X: ' + mouseX);
y = createDiv('Y: ' + mouseY);
x.position(50, 50);
y.position(50, 80);

}
