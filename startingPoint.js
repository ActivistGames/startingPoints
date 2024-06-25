let buttons = [];

let posX = 300;
let posY = 50;
let marg = 10;
let shiftY = 180;

let latoReg;
let latoBold;

function preload() {
  latoReg = loadFont('Lato/Lato-Regular.ttf');
  latoBold = loadFont('Lato/Lato-Bold.ttf');
}

function setup() {
  createCanvas(1920, 1080);
  
  buttons.push(new Button(posX, shiftY+posY+marg, 'Skrzynka z tajemnicami', 'http://example.com/1'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*2, 'Connect the dots', 'http://example.com/2'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*4, '5 etapów żałoby', 'http://example.com/3'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*5, 'Unsuscribe', 'http://example.com/4'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*6, 'Formularz migracyjny', 'http://example.com/5'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*8, 'School of Form experience', 'http://example.com/6'));
}

function draw() {
  background(255);
  for (let btn of buttons) {
    btn.display();
    if (btn.checkCursor() && mouseIsPressed) {
      //     window.location.href = btn.url;
      print(btn.url);
    }
  }
  textAlign(CENTER, CENTER);
  textFont(latoReg);
  noStroke();
  fill(0);
  textSize(30);
  text("Projektowanie interakcji", posX, 50);
  text("Interaction design", posX, 100);

textFont(latoBold);
  textAlign(LEFT);
  textSize(30);
  text('NST', 40, shiftY+marg+marg+5);
  text('ST', 40, shiftY+(posY+marg)*3+marg+5);
  text('ENG', 40, shiftY+(posY+marg)*7+marg+5);

  stroke(0);
  strokeWeight(2);
  line(120, shiftY+marg+marg, width, shiftY+marg+marg);
  line(120, shiftY+(posY+marg)*3+marg, width, shiftY+(posY+marg)*3+marg);
  line(120, shiftY+(posY+marg)*7+marg, width, shiftY+(posY+marg)*7+marg);
}

class Button {
  constructor(x, y, txt, url) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.url = url;
    this.w = 300;
    this.h = 40;
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
    if (this.checkCursor()) {
      fill(200);
    } else {
      fill(255);
    }
    stroke(0);
    strokeWeight(2);
    rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h, 10);

    textAlign(CENTER, CENTER);
    textSize(17);
    fill(0);
    noStroke();
    text(this.txt, this.x, this.y);
    pop();
  }
}
