function Oklahoma() {

    // x est compris entre 0 et 48.8
    var maxX = 170;
    var maxY = -270;
    // y est compris entre 0 et 110

    // Joueur defenseur
    this.defense = {
      name: 'D',
      x: maxX / 2,
      y: -100,
      radius: 12,
      move: null
    };
    // Joueur attaquant
    this.attack = {
      name: 'A',
      x: maxX / 2,
      y: -20,
      radius: 12,
      move: null
    };
}

// Mouvement joueur
Oklahoma.prototype.move = function () {

// Mouvement attaquant
  switch (this.attack.move) {
    case "up": this.attack.y -= 1.5; break;
    case "down": this.attack.y += 1.5; break;
    case "left": this.attack.x -= 1.5; break;
    case "right": this.attack.x += 1.5; break;
  }

// Mouvement defense
  switch (this.defense.move) {
    case "up": this.defense.y -= 1.8; break;
    case "down": this.defense.y += 1.8; break;
    case "left": this.defense.x -= 1.8; break;
    case "right": this.defense.x += 1.8; break;
  }
};

// Enregistre mouvement attaquant
Oklahoma.prototype.registerMove = function(move) {
  this.attack.move = move;
};

// Enregistre mouvement defenseur
Oklahoma.prototype.registerMoveDefense = function (move) {
  this.defense.move = move;
};

// Deenregistre le mouvement de l'attaquant
Oklahoma.prototype.unregisterMoveAttack = function (move) {
  if (this.attack.move === move) {
    this.attack.move = null;
  }
};

// Deenregistre le mouvement du defenseur
Oklahoma.prototype.unregisterMoveDefense = function (move) {
  if (this.defense.move === move) {
    this.defense.move = null;
  }
};

// Test si le defenseur rentre en collision avec l'attaquant
Oklahoma.prototype.testCollision = function () {
    var detectionX = (this.attack.x + this.attack.radius) - (this.defense.x + this.defense.radius);
    var detectionY = (this.attack.y + this.attack.radius) - (this.defense.y + this.defense.radius);
    var distance = Math.sqrt(detectionX * detectionX + detectionY * detectionY);

    if (distance < this.attack.radius + this.defense.radius) {
      return true;
    }
    return false;
};

// Test si l'attaquant sors du terrain
Oklahoma.prototype.testSortie = function () {
  if (this.attack.x > 185 || this.attack.x < 12) {
    return true;
  }
  if (this.attack.y > -9) {
    return true;
  }
  return false;
};

// Test si l'attaquant passe la ligne de touchdown
Oklahoma.prototype.testTouchdown = function () {
  if (this.attack.y < - (299)) {
    return true;
  }
  return false;
};

// Fonction "tick" pour la gameloop du jeu avec les test de fin de jeu
Oklahoma.prototype.tick = function (timeLapsted) {
  this.move();
  this.testCollision();
  this.testSortie();
  this.testTouchdown();
};
