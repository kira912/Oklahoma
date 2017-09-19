var game;
$(document).ready(function() {
  var divP1 = $("#player-one");
  var divP2 = $("#player-two");

  function display () {
    var attackPx = playerPx(game.attack);
    divP1.css("transform", "translate(" + attackPx.x + "," + attackPx.y + ")");
    var defensePx = playerPx(game.defense);
    divP2.css("transform", "translate(" + defensePx.x + "," + defensePx.y + ")");
  }

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

function playerPx(player) {
  return {
    x: String(player.x * 2) + 'px',
    y: String(player.y * 2) + 'px'
  };
}


function moveListeners (event) {
  var keys = [37, 38, 39, 40];
  if (keys.indexOf(event.keyCode) < 0) {
    return;
  }

  switch (event.keyCode) {
    case 37: game.registerMove("left");
    break;
    case 38: game.registerMove("up");
    break;
    case 39: game.registerMove("right");
    break;
    case 40: game.registerMove("down");
     break;
  }
}
