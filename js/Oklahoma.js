function Oklahoma() {

    // x est compris entre 0 et 48.8
    var maxX = 48.8;
    var maxY = 110.0;
    // y est compris entre 0 et 110

    // Joueur defenseur
    this.defense = {
      name: 'D',
      x: maxX / 2,
      y: maxY / 5,
      radius: 10,
      move: null
    };
    // Joueur attaquant
    this.attack = {
      name: 'A',
      x: maxX / 2,
      y: 0,
      radius: 10,
      move: null
    };
}

// Mouvement joueur
Oklahoma.prototype.move = function () {

// Mouvement attaquant
  switch (this.attack.move) {
    case "up": this.attack.y -= 2.5; break;
    case "down": this.attack.y += 2.5; break;
    case "left": this.attack.x -= 2.5; break;
    case "right": this.attack.x += 2.5; break;
  }
  this.attack.move = null;

// Mouvement defense
  switch (this.defense.move) {
    case "up": this.defense.y -= 2.5; break;
    case "down": this.defense.y += 2.5; break;
    case "left": this.defense.x -= 2.5; break;
    case "right": this.defense.x += 2.5; break;
  }
  this.defense.move = null;
};

// Enregistre mouvement attaquant
Oklahoma.prototype.registerMove = function(move) {
  this.attack.move = move;
};

// Enregistre mouvement defenseur
Oklahoma.prototype.registerMoveDefense = function (move) {
  this.defense.move = move;
};

Oklahoma.prototype.testCollision = function () {
    var detectionX = (this.attack.x + this.attack.radius) - (this.defense.x + this.defense.radius);
    var detectionY = (this.attack.y + this.attack.radius) - (this.defense.y + this.defense.radius);
    var distance = Math.sqrt(detectionX * detectionX + detectionY * detectionY);

    if (distance < this.attack.radius + this.defense.radius) {
      console.log("collision");
    }
};

Oklahoma.prototype.testSortie = function () {
  if (this.attack.x > 118 || this.attack.x < 2) {
    console.log("OUT");
  }
};

Oklahoma.prototype.tick = function (timeLapsted) {
  this.move();
  this.testCollision();
  this.testSortie();
};
