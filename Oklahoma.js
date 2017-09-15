function Oklahoma() {
    this.field = [
      [null, null,null,null], // 0
      [null, null,null,null], // 1
      ['TD', 'TD','TD','TD'], // 2
      [null, null,null,null], // 3
      [null, null,null,null], // 4
      [null, null,null,null], // 5
      [null, 'D',null,null], // 6
      [null, null,null,null], // 7
      [null, null,null,null], // 8
      [null, 'A',null,null]  // 9
    ];
    // Joueur defenseur
    this.defense = {
      name: 'D',
      row: 6,
      col: 1
    };
    // Joueur attaquant
    this.attack = {
      name: 'A',
      row: 9,
      col: 1
    };
}

// Affichage du terrain
Oklahoma.prototype.display = function () {
  this.field.forEach(function(row) {
    console.log(row);
  });
};

// Fonction faire avancer un joueur
Oklahoma.prototype.moveForward = function (team, increment) {
  if (this.field[this[team].row + increment][this[team].col] === null) {
    this.field[this[team].row + increment][this[team].col] = this[team].name;
    this.field[this[team].row][this[team].col] = null;
  }
  this.display();

   if (this.field[this.attack.row-1][this.attack.col] === 'TD') {
    console.log("TOUCHDOOOOOOOOOOOOWN");
  }
};

// Fontion faire avancer joueur attaquant
Oklahoma.prototype.moveForwardAttack = function() {
  this.moveForward("attack",-1);
  this.attack.row--;
};

// Fonction faire avancer joueur defenseur
Oklahoma.prototype.moveForwardDefense = function () {
  this.moveForward("defense",1);
  this.defense.row++;
};

// Fonction deplacer joueur vers la gauche
Oklahoma.prototype.moveLeft = function (team, increment) {
  if (this.field[this[team].row][this[team].col + increment] === null) {
    this.field[this[team].row][this[team].col + increment] = this[team].name;
    this.field[this[team].row][this[team].col] = null;
  }

  this.display();
};

// Fonction faire deplacer le joueur attaquant
Oklahoma.prototype.moveLeftAttack = function () {
  this.moveLeft("attack", -1);
  this.attack.col--;
};

// Fonction faire deplacer le joueur defenseur sur la gauche
Oklahoma.prototype.moveLeftDefense = function() {
  this.moveLeft("defense", -1);
  this.defense.col--;
};

// Fonction faire deplacer un joueur vers la droite
Oklahoma.prototype.moveRight = function (team, increment) {
  if (this.field[this[team].row][this[team].col + increment] === null ) {
    this.field[this[team].row][this[team].col + increment] = this[team].name;
    this.field[this[team].row][this[team].col] = null;
  }
  this.display();
};

// Fonction faire deplacer le joueur attauqant vers la droite
Oklahoma.prototype.moveRightAttack = function () {
  this.moveRight("attack", 1);
  this.attack.col++;
};

// Fonction faire depalcer le joueur defenseur vers la droite
Oklahoma.prototype.moveRightDefense = function () {
  this.moveRight("defense", 1);
};

// Fonction faire reculer un joueur
Oklahoma.prototype.moveBackward = function (team, increment) {
  if (this.field[this[team].row + increment][this[team].col] === null){
      this.field[this[team].row + increment][this[team].col] = this[team].name;
      this.field[this[team].row][this[team].col] = null;
  }
  this.display();
};

// Fonction faire reculer le joueur attaquant
Oklahoma.prototype.moveBackwardAttack = function () {
  this.moveBackward("attack", 1);
  this.attack.row++;
};

// Fonction faire reculer le joueur defenseur
Oklahoma.prototype.moveBackwardDefense = function () {
  this.moveBackward("defense", -1);
  this.defense.col--;
};
