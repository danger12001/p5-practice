var x;
var herbivours = [];
var y;
var plants = [];
var carnivours = [];
var mouseMode;
//
//
var plantbut = function(){
plants.push(new plant(random(width), random(height)));
};
var herbivour = function(){
herbivours.push(new herb(random(width), random(height)));
};
var carnivour = function(){
  carnivours.push(new carn(random(width), random(height)));

};
//
//
var MouseLocation = function(){
  x.remove();
  y.remove();
  x = createDiv('X: ' + mouseX);
  y = createDiv('Y: ' + mouseY);
  x.position(50, 50);
  y.position(50, 80);
};
//
function setup() {
  createCanvas(windowWidth, windowHeight);

  x = createDiv('X: ' + 0);
  y = createDiv('Y: ' + 0);
  x.position(50, 50);
  y.position(50, 80);



  var plant = createButton('Plant');
  plant.position(50, 100);
  plant.mousePressed(function(){
    mouseMode = 0;
  });

  var herbivour = createButton('herbivour');
  herbivour.position(50, 130);
  herbivour.mousePressed(function(){
    mouseMode = 1;
  });

  var carnivour = createButton('carnivour');
  carnivour.position(50, 160);
  carnivour.mousePressed(function(){
    mouseMode = 2;
  });
}
//mouse controls
function mouseMoved() {
MouseLocation();
}

function mousePressed(){
MouseLocation();
if(mouseMode === 0){
  plantbut();
}
else if(mouseMode == 1){
  herbivour();
}
else if(mouseMode == 2){
  carnivour();
}
}
function mouseDragged(){
MouseLocation();
}




function draw() {
  background(51);
  // Run all the boids
  for (var y = 0; y < plants.length; y++) {
    plants[y].run(plants);
  }
  for (var i = 0; i < herbivours.length; i++) {
    herbivours[i].run(herbivours);
  }
  for (var x = 0; x < carnivours.length; x++) {
    carnivours[x].run(carnivours);
  }
}


function carn(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}
function herb(x, y) {

  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}
function plant(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}
herb.prototype.run = function(herbivours) {
  this.flock(plants);
  this.update();
  this.borders();
  this.render();
};
carn.prototype.run = function(carnivours) {
  this.flock(herbivours);
  this.update();
  this.borders();
  this.render();
};
plant.prototype.run = function(plants) {
  this.render();
};

carn.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};
herb.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};
carn.prototype.flock = function(carnivours) {
  var sep = this.separate(carnivours); // Separation
  var ali = this.align(carnivours);    // Alignment
  var coh = this.cohesion(carnivours); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
};
herb.prototype.flock = function(herbivours) {
  var sep = this.separate(herbivours); // Separation
  var ali = this.align(herbivours);    // Alignment
  var coh = this.cohesion(herbivours); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
};

// Method to update location
carn.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
};
herb.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
};

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
carn.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
};
herb.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
};
// Draw boid as a circle

herb.prototype.render = function() {
  stroke(50);
    fill(65,105,225);
    ellipse(this.position.x, this.position.y, 24, 24);
};
plant.prototype.render = function() {
  stroke(50);
    fill(34,139,34);
    ellipse(this.position.x, this.position.y, random(10, 24), random(5,24));
};
carn.prototype.render = function() {
  stroke(50);
    fill(139,0,0);
    ellipse(this.position.x, this.position.y, 35, 35);
};
// Wraparound

herb.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
};
carn.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
};

// Separation
// Method checks for nearby boids and steers away
carn.prototype.separate = function(carnivours) {
  var desiredseparation = 25.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < carnivours.length; i++) {
    var d = p5.Vector.dist(this.position, carnivours[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, carnivours[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
};
herb.prototype.separate = function(herbivours) {
  var desiredseparation = 25.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < herbivours.length; i++) {
    var d = p5.Vector.dist(this.position, herbivours[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, herbivours[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
};

// Alignment
// For every nearby boid in the system, calculate the average velocity
carn.prototype.align = function(carnivours) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < carnivours.length; i++) {
    var d = p5.Vector.dist(this.position, carnivours[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(carnivours[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};
herb.prototype.align = function(herbivours) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < herbivours.length; i++) {
    var d = p5.Vector.dist(this.position, herbivours[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(herbivours[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};
// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
carn.prototype.cohesion = function(carnivours) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < carnivours.length; i++) {
    var d = p5.Vector.dist(this.position, carnivours[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(carnivours[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
};

herb.prototype.cohesion = function(herbivours) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < herbivours.length; i++) {
    var d = p5.Vector.dist(this.position, herbivours[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(herbivours[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
};
