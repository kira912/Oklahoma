var game;
$(document).ready(function() {
  var divP1 = $("#player-one");
  var divP2 = $("#player-two");
    var finish = $("#win");

  function display () {
    var attackPx = playerPx(game.attack);
    divP1.css("transform", "translate(" + attackPx.x + "," + attackPx.y + ")");
    var defensePx = playerPx(game.defense);
    divP2.css("transform", "translate(" + defensePx.x + "," + defensePx.y + ")");

    if (game.testCollision()) {
      finish.show();
      $("#message").text("Big hit defense !");
      $("#team-win").text("Defense");
      $("#gif").attr("src","css/gif/gifHit.gif");
      ongoing = false;
    }

    if (game.testSortie()) {
      finish.show();
      $("#message").text("Out of the field");
      $("#team-win").text("Defense");
      $("#gif").attr("src","css/gif/gifOut.gif");
      ongoing = false;
    }

    else if (game.testTouchdown()) {
      finish.show();
      $("#message").text("touchdown");
      $("#team-win").text("Attack");
      $("#gif").attr("src","css/gif/gifTD.gif");
      $("#sound-match").stop();
      ongoing = false;
    }
  }

  $("#restart").click(function() {
    game = new Oklahoma();
    finish.hide();
    ongoing = true;
    gameLoop();
  });

  $(document).keydown(moveListeners);
  $(document).keyup(unmoveListeners);
  game = new Oklahoma();
  display();
  var previousTime;
  var currentTime = Date.now();
  var ongoing = true;

  function gameLoop() {
    if (!ongoing)
    return;
    previousTime = currentTime;
    currentTime = Date.now();
    game.tick(currentTime - previousTime);
    display();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);

  finish.hide();
});


function playerPx(player) {
  return {
    x: String(player.x * 2) + 'px',
    y: String(player.y * 2) + 'px'
  };
}

function logkey(event){
  console.log(event.type + ' ' + event.keyCode);
}


function moveListeners (event) {
  var attackKeys = [37, 38, 39, 40];
  var defenseKeys = [68, 81, 83, 90];
  var keys = attackKeys.concat(defenseKeys);
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
     case 68: game.registerMoveDefense("right");
     break;
     case 81: game.registerMoveDefense("left");
     break;
     case 83: game.registerMoveDefense("down");
     break;
     case 90: game.registerMoveDefense("up");
     break;
  }
}
function unmoveListeners (event) {
  var attackKeys = [37, 38, 39, 40];
  var defenseKeys = [68, 81, 83, 90];
  var keys = attackKeys.concat(defenseKeys);
  if (keys.indexOf(event.keyCode) < 0) {
    return;
  }

  switch (event.keyCode) {
    case 37: game.unregisterMoveAttack("left");
    break;
    case 38: game.unregisterMoveAttack("up");
    break;
    case 39: game.unregisterMoveAttack("right");
    break;
    case 40: game.unregisterMoveAttack("down");
     break;
     case 68: game.unregisterMoveDefense("right");
     break;
     case 81: game.unregisterMoveDefense("left");
     break;
     case 83: game.unregisterMoveDefense("down");
     break;
     case 90: game.unregisterMoveDefense("up");
     break;
  }
}
