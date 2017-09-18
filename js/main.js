var game;
$(document).ready(function() {
  $(document).keydown(moveListeners);
  game = new Oklahoma();
  display();
  var previousTime;
  var currentTime = Date.now();
  var ongoing = true;
  function gameLoop() {
    if (!ongoing) return;
    previousTime = currentTime;
    currentTime = Date.now();
    game.tick(currentTime - previousTime);
    display();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
});

// Affichage du terrain
function display () {
  game.field.forEach(function(row) {
    console.log(row);
  });
}

function moveListeners (event) {
  var keys = [37, 38, 39, 40];
  if (keys.indexOf(event.keyCode) < 0) {
    return;
  }

  switch (event.keyCode) {
    case 37: game.registerMove("left");
      var poneLeft = parseInt($("#player-one").css("right"));
      $("#player-one").css("right", poneLeft + 10);
    break;

    case 38: game.registerMove("up");
      var poneUp = parseInt($("#player-one").css("bottom"));
      $("#player-one").css("bottom", poneUp + 10);
    break;

    case 39: game.registerMove("right");
      var poneRight = parseInt($("#player-one").css("left"));
      $("#player-one").css("left", poneRight + 10);
    break;
    case 40: game.registerMove("down");
      var poneDown = parseInt($("#player-one").css("top"));
      $("#player-one").css("top", poneDown + 10);
     break;
  }
}
