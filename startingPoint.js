let buttons = [];
let particles = [];

let posX = 300;
let posY = 50;
let marg = 15;
let shiftY = 180;

let over = 0;

let latoReg;
let latoBold;

let beige;
let lightBlue;
let lapisLazuli;
let eerieBlack;
let corneliRed;

function preload() {
  latoReg = loadFont('Lato/Lato-Regular.ttf');
  latoBold = loadFont('Lato/Lato-Bold.ttf');
}

function setup() {
  createCanvas(1920, 1080);
  posX = width/2;
  beige = color(204, 173, 143);
  lightBlue = color(126, 163, 204);
  lapisLazuli = color(37, 92, 153);
  eerieBlack = color(38, 38, 38);
  corneliRed = color(179, 0, 27);

  buttons.push(new Button(posX, shiftY+posY+marg, 'Skrzynka z tajemnicami', ''));
  buttons.push(new Button(posX, shiftY+(posY+marg)*2, 'Connect the dots', ''));
  buttons.push(new Button(posX, shiftY+(posY+marg)*4, '5 etapów żałoby', 'https://aszulcc.github.io/title-screen'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*5, 'Dark patterns', 'https://glink-182.github.io/first-page'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*6, 'Formularz imigracyjny', 'https://kacperrrrr5.github.io/imigrant-witamy'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*8, 'School of Forms', 'https://jakubzawadzkiswps.github.io/School-of-Forms'));
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(eerieBlack);
  
  over = 0;

  for (let btn of buttons) {
    btn.display();

    if (btn.checkCursor() == true && btn.url != '') {
      over++;
      if (mouseIsPressed ) {
        window.location.href = btn.url;
        //print(btn.url);
      }
    }

    if (over>0) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }
  textAlign(CENTER, CENTER);
  textFont(latoReg);
  noStroke();
  fill(beige);
  textSize(30);
  text("Projektowanie interakcji", posX, 50);
  text("Interaction design", posX, 120);

  fill(lapisLazuli);
  textFont(latoBold);
  textAlign(LEFT);
  textSize(30);
  text('NST', 700-2, shiftY+30);
  text('ST', 700-2, shiftY+(posY+marg)*3+30);
  text('ENG', 700-2, shiftY+(posY+marg)*7+30);

  stroke(beige);
  strokeWeight(1.5);
  line(700, shiftY+marg, width-700, shiftY+marg);
  line(700, shiftY+(posY+marg)*3+marg, width-700, shiftY+(posY+marg)*3+marg);
  line(700, shiftY+(posY+marg)*7+marg, width-700, shiftY+(posY+marg)*7+marg);

  stroke(corneliRed);
  line(width/2-130, 90, width/2+130, 90);
  
  
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Button {
  constructor(x, y, txt, url) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.url = url;
    this.w = 260;
    this.h = 50;
  }

  checkCursor() {
    let over = false;
    if (mouseX > this.x-this.w/2 && mouseX < this.x+this.w/2 && mouseY > this.y-this.h/2 && mouseY < this.y+this.h/2) {
      over = true;
    }
    return over;
  }

  display() {
    push();

    strokeWeight(1.5);
    textAlign(CENTER, CENTER);
    textSize(17);
    let s = 0;
    if (this.checkCursor()) {
      fill(lightBlue);
      stroke(lightBlue);
      rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h, 18);
      fill(eerieBlack);
    } else {
      stroke(beige);
      fill(eerieBlack);
      rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h, 18);
      fill(beige);
    }

    if (this.url == '') {
      stroke(100);
      fill(eerieBlack);
      rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h, 18);
      fill(100);
    }

    noStroke();

    text(this.txt, this.x, this.y-3);
    pop();
  }
}



class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.size = random(2, 6);
    this.color = color(random([beige, lightBlue, lapisLazuli,corneliRed]));
    this.maxSpeed = random(1, 2);
    this.acceleration = 0.05;
  }
  
  update() {
    this.position.add(this.velocity);
    
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -0.7; // Zmniejszamy prędkość o 20% przy odbiciu
      this.position.x = constrain(this.position.x, 0, width);
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -0.7; // Zmniejszamy prędkość o 20% przy odbiciu
      this.position.y = constrain(this.position.y, 0, height);
    }
    
    // Stopniowo przyspieszamy cząsteczkę do jej maksymalnej prędkości
    this.velocity.setMag(min(this.velocity.mag() + this.acceleration, this.maxSpeed));
    
    let mouseDistance = dist(mouseX, mouseY, this.position.x, this.position.y);
    if (mouseDistance < 100) {
      let repelForce = p5.Vector.sub(this.position, createVector(mouseX, mouseY));
      repelForce.setMag(0.5);
      this.velocity.add(repelForce);
      this.velocity.limit(this.maxSpeed);
    }
  }
  
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);
  }
}
