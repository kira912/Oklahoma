function Oklahoma() {

    // x est compris entre 0 et 48.8
    var maxX = 48.8;
    var maxY = 110.0;
    // y est compris entre à et 110

    // Joueur defenseur
    this.defense = {
      name: 'D',
      x: maxX / 2,
      y: maxY / 5,
      move: null
    };
    // Joueur attaquant
    this.attack = {
      name: 'A',
      x: maxX / 2,
      y: 0,
      move: null
    };
}

Oklahoma.prototype.move = function () {
  switch (this.attack.move) {
    case "up": this.attack.y -= 2.5; break;
    case "down": this.attack.y += 2.5; break;
    case "left": this.attack.x -= 2.5; break;
    case "right": this.attack.x += 2.5; break;
  }
  this.attack.move = null;

  switch (this.defense.move) {
    case "up": this.defense.y -= 2.5; break;
    case "down": this.defense.y += 2.5; break;
    case "left": this.defense.x -= 2.5; break;
    case "right": this.defense.x += 2.5; break;
  }
  this.defense.move = null;
};


Oklahoma.prototype.registerMove = function(move) {
  this.attack.move = move;
};
//
// Oklahoma.prototype.moveDefense = function () {
//   switch (this.defense.move) {
//     case "up": this.defense.y -= 2.5; break;
//     case "down": this.defense.y += 2.5; break;
//     case "left": this.defense.x -= 2.5; break;
//     case "right": this.defense.x += 2.5; break;
//   }
//   this.defense.move = null;
// };
//
Oklahoma.prototype.registerMoveDefense = function (move) {
  this.defense.move = move;
};

Oklahoma.prototype.tick = function (timeLapsted) {
  this.move();
};
