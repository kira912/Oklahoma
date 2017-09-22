var game;

function directionToDeg(direction) {
  if(direction === "up") {  return 0;}
  if(direction === "right") {return 90;}
  if(direction === "down") {return 180;}
  if(direction === "left") {return 270;}
}

$(document).ready(function() {
  $("#ambienceSound").get(0).pause();
  var divP1 = $("#player-one");
  var divP2 = $("#player-two");
  var finish = $("#win");
  var start = $("#info");

// Event click lancement du jeu
  $("#start").click(function() {
    game = new Oklahoma();
    ongoing = true;
    gameLoop();
    start.hide();
    $("#ambienceSound").get(0).play();
  });

// Fonction display pour faire avancer les joueurs
  function display () {
    function displayPlayer(role, div, defaultDirection) {
      var px = playerPx(game[role]);
      var translation = "translate(" + px.x + "," + px.y + ")";
      var angle = directionToDeg(game[role].move === null ? defaultDirection : game[role].move);
      var rotation = "rotate(" + angle + "deg)";
      div.css("transform", translation + " " + rotation);
    }
    displayPlayer("attack", divP1, "up");
    displayPlayer("defense", divP2, "down");
// Si le defenseur rentre dans l'attaquant, message de victoire et changement de musique
    if (game.testCollision()) {
      finish.show();
      $("#message").text("Big hit defense !");
      $("#team-win").text("Defense");
      $("#gif").attr("src","css/gif/gifHit.gif");
      $("#ambienceSound").get(0).pause();
      $("#defenseSound").get(0).play();
      ongoing = false;
    }

// Si le joueur attaquant sort du terrain, message de victoire et changement de musique
    if (game.testSortie()) {
      finish.show();
      $("#message").text("Out of the field");
      $("#team-win").text("Defense");
      $("#gif").attr("src","css/gif/gifOut.gif");
      $("#ambienceSound").get(0).pause();
      $("#defenseSound").get(0).play();
      ongoing = false;
    }

// Si le joueur attaquant passe la ligne de TD, message de victoire et changement de musique
    else if (game.testTouchdown()) {
      finish.show();
      $("#message").text("touchdown");
      $("#team-win").text("Attack");
      $("#gif").attr("src","css/gif/gifTD.gif");
      $("#ambienceSound").get(0).pause();
      $("#touchdownSound").get(0).play();
      ongoing = false;
    }
  }

// Click event pour relancer une partie
  $("#restart").click(function() {
    game = new Oklahoma();
    finish.hide();
    ongoing = true;
    gameLoop();
    $("#ambienceSound").get(0).play();
  });

  $(document).keydown(moveListeners);
  $(document).keyup(unmoveListeners);
  game = new Oklahoma();
  display();
  var previousTime;
  var currentTime = Date.now();
  var ongoing = false;
  finish.hide();

//  Fonction "loop" pour faire avancer le jeu en temp réel
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

});

// Fonction deplacement des joueurs convertis en px
function playerPx(player) {
  return {
    x: String(player.x * 2) + 'px',
    y: String(player.y * 2) + 'px'
  };
}

//Event keydown mouvement joueurs
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

// Event keyup mouvement joueurs
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
