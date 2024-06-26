let buttons = [];
let particles = [];

let posX = 650;
let posY = 50;
let marg = 15;
let shiftY = 290;
let lineW = 220;

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
  //posX = width/2;
  beige = color(204, 173, 143);
  lightBlue = color(126, 163, 204);
  lapisLazuli = color(37, 92, 153);
  eerieBlack = color(38, 38, 38);
  corneliRed = color(179, 0, 27);

  buttons.push(new Button(posX, shiftY+posY+marg, 'Skrzynka z tajemnicami', 'https://domciaioliwcia.github.io/Start-page'));
  buttons.push(new Button(posX, shiftY+(posY+marg)*2, 'Connect the dots', 'https://juleczkasurwilka.github.io/swag'));
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
  push();
  stroke(corneliRed);
  line(posX-lineW/2, shiftY-130, posX+lineW/2, shiftY-130);

  textAlign(CENTER, CENTER);
  textFont(latoReg);
  noStroke();
  fill(beige);
  textSize(30);
  text("Projektowanie interakcji", posX, shiftY-174);
  text("Interaction design", posX, shiftY-100);

  fill(lapisLazuli);
  textFont(latoBold);
  textAlign(LEFT);
  textSize(30);
  text('NST', posX-lineW-2, shiftY+30);
  text('ST', posX-lineW-2, shiftY+(posY+marg)*3+30);
  text('ENG', posX-lineW-2, shiftY+(posY+marg)*7+30);

  stroke(beige);
  strokeWeight(1.5);
  line(posX-lineW, shiftY+marg, posX+lineW, shiftY+marg);
  line(posX-lineW, shiftY+(posY+marg)*3+marg, posX+lineW, shiftY+(posY+marg)*3+marg);
  line(posX-lineW, shiftY+(posY+marg)*7+marg, posX+lineW, shiftY+(posY+marg)*7+marg);
  pop();

  drawProjectInfo();

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function drawProjectInfo() {
  let xOffset = 1050; // Możesz dostosować tę wartość, aby zmienić położenie tekstu
  let textBoxWidth = 510; // Szerokość obszaru tekstu
  let lineSpacing = 2; // Dodatkowy odstęp między liniami, możesz to dostosować

  push();
  textAlign(LEFT, TOP);
  textFont(latoReg);
  fill(beige);
  textSize(20);
 
  
  let yOffset = 150;
  let lineHeight = 18 + lineSpacing;
  
  function drawText(txt, x, y, maxWidth) {
    let words = txt.split(' ');
    let line = '';
    let testLine = '';
    let testWidth = 0;

    for (let i = 0; i < words.length; i++) {
      testLine = line + words[i] + ' ';
      testWidth = textWidth(testLine);
      if (testWidth > maxWidth && i > 0) {
        text(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    text(line, x, y);
    return y + lineHeight;
  }
  text("Projekt", xOffset, yOffset-40);
  
  
  textSize(14);
  
  yOffset = drawText("Zadanie projektowe polegało na przygotowaniu kilkuetapowego doświadczenia interaktywnego, które:", xOffset, yOffset, textBoxWidth);
  yOffset += lineSpacing;//lineHeight;
  
  let bulletPoints = [
    "jest zaprogramowane za pomocą odmiany p5.js języka processing",
    "korzysta z mikrointerakcji",
    "ma charakter narracyjny",
    "może mieć charakter formularza konwersacyjnego",
    "korzysta z elementów logiki gry",
    "dąży do wciągnięcia osoby odbiorczej w interakcje, do immersji, albo też korzysta z manipulacyjnych (ciemnych) wzorców projektowych, by je stematyzować",
    "wchodzi w grę z emocjami osoby odbiorczej, wywołując radość, zaciekawienie, rozbawienie, frustracje, etc., w zależności od intencji zespołu projektowego."
  ];
  
  for (let point of bulletPoints) {
    yOffset = drawText("• " + point, xOffset + 10, yOffset, textBoxWidth - 10);
    yOffset += lineSpacing; // Dodatkowy odstęp między punktami
  }
  
  yOffset += lineHeight;
  yOffset = drawText("Osoby uczestniczące w zajęciach korzystały z wiedzy zdobytej w trakcie konwersatorium i warsztatów, a także z inspiracji zebranych samodzielnie oraz zaproponowanych przez prowadzących zajęcia.", xOffset, yOffset, textBoxWidth);
  
  yOffset += lineHeight * 2;
  textSize(20);
  text("Zasady", xOffset, yOffset);
  
  yOffset += lineHeight * 2;
  textSize(14);
  let rules = [
    "Grupy podzielono na zespoły projektowe po maksymalnie 5 osób",
    "Każda grupa rozwijała własny projekt",
    "Każdy projekt liczył sobie co najmniej tyle ekranów, ile jest osób w zespole",
    "Całość zespołu była odpowiedzialna za ogólną wymowę, spójność, treści i narrację projektu",
    "Każda osoba uczestnicząca w pracach zespołu była odpowiedzialna za co najmniej jeden ekran, gdzie zaprogramowała co najmniej jedną – przemyślaną, będącą niezbędną częścią całego projektu – interakcję",
    "Zanim przystąpił do prac wdrożeniowych, każdy zespół przygotował scenariusz doświadczenia i interakcji w aplikacji Figma (wraz z tablicą inspiracji)"
  ];
  
  for (let rule of rules) {
    yOffset = drawText("• " + rule, xOffset + 10, yOffset, textBoxWidth - 10);
    yOffset += lineSpacing; // Dodatkowy odstęp między punktami
  }
  
  yOffset += lineHeight;
  drawText("Ocenie podlega interakcja przygotowana przez daną osobę, a także jej udział w całości projektu", xOffset, yOffset, textBoxWidth);
  
  pop();
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

    text(this.txt, this.x, this.y-1);
    pop();
  }
}



class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.size = random(2, 6);
    this.color = color(random([beige, lightBlue, lapisLazuli, corneliRed]));
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
