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
    this.defense = {
      name: 'D',
      row: 6,
      col: 1
    };
    this.attack = {
      name: 'A',
      row: 9,
      col: 1
    };
}
Oklahoma.prototype.display = function () {
  this.field.forEach(function(row) {
    console.log(row);
  });
};

Oklahoma.prototype.moveForwardAttack = function () {
  if (this.field[this.attack.row - 1][this.attack.col] === null) {
    this.field[this.attack.row - 1][this.attack.col] = this.attack.name;
    this.field[this.attack.row][this.attack.col] = null;
    this.attack.row--;
    this.display();
  }
  else if (this.field[this.attack.row-1][this.attack.col] === 'TD') {
    console.log("TOUCHDOOOOOOOOOOOOWN");
  }
};

Oklahoma.prototype.moveLeftAttack = function () {
  if (this.field[this.attack.row][this.attack.col - 1] === null) {
    this.field[this.attack.row][this.attack.col - 1] = this.attack.name;
    this.field[this.attack.row][this.attack.col] = null;
    this.attack.col--;
  }
  this.display();
};

Oklahoma.prototype.moveRightAttack = function () {
  if (this.field[this.attack.row][this.attack.col + 1] === null ) {
    this.field[this.attack.row][this.attack.col + 1] = this.attack.name;
    this.field[this.attack.row][this.attack.col] = null;
    this.attack.col ++;
  }
  this.display();
};

Oklahoma.prototype.moveBackwardAttack = function () {

};
