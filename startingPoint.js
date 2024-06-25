let buttons = [];

let posX = 300;
let posY = 50;
let marg = 10;

function setup() {
  createCanvas(1920, 1080);
  buttons.push(new Button(posX, posY+marg, 'Skrzynka z tajemnicami', 'http://example.com/1'));
  buttons.push(new Button(posX, (posY+marg)*2, 'Connect the dots', 'http://example.com/2'));
  buttons.push(new Button(posX, (posY+marg)*4, '5 etapów żałoby', 'http://example.com/3'));
  buttons.push(new Button(posX, (posY+marg)*5, 'Unsuscribe', 'http://example.com/4'));
  buttons.push(new Button(posX, (posY+marg)*6, 'Formularz migracyjny', 'http://example.com/5'));
  buttons.push(new Button(posX, (posY+marg)*8, 'School of Form experience', 'http://example.com/6'));
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
