// player can't permute the same position

var turn = 1; // turn 1 to player one and so on
var hasPlayed = false; // has the player chosen a position?

// whenever you throw one or two dices it changes the color of the possible pawns and positions to play.
function changeColor(value1, value2) {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (
        playGround.board[i][j] == value1 ||
        playGround.board[i][j] == value2
      ) {
        if (playGround.board[i][j] == value1) ground.fillStyle = "#e8ad25";
        // orange
        else ground.fillStyle = "#adce29"; // vert
        ground.beginPath();
        ground.rect(75 * j, 75 * i, 75, 75);
        ground.closePath();
        ground.fill();
      }
    }
  }
}
// events when clicking
window.addEventListener("click", whatKey, true);
function whatKey(evt) {
  var hasChosen = false;
  var scoreTemp = 0;
  // chosen a token on the board
  if (evt.clientX <= 550 && evt.clientY <= 500 && notLucky == true) {
    notLucky = false;
    nextTurn();
  } // the two dices have the same value
  console.log(evt.clientY + " ," + evt.clientX);
  y = Math.floor(evt.clientY / 75);
  x = Math.floor(evt.clientX / 75);
  // if the click is in the board (player wants to choose a position)
  if (evt.clientX <= 375 && evt.clientY <= 375) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        // if a player has already chosen a position or pawn then when clicking we permute the two pawns in this case
        if (
          playGround.isChosen[i][j] == true &&
          (playGround.isPossible[y][x] != 0 &&
            playGround.isPossible[i][j] != 0) &&
          playGround.isPossible[i][j] != playGround.isPossible[y][x]
        ) {
          var temp = playGround.board[i][j];
          playGround.board[i][j] = playGround.board[y][x];
          playGround.board[y][x] = temp;
          scoreTemp = addScore(y, x);
          if (playGround.board[i][j] != 6) scoreTemp += addScore(i, j);
          scoreJoueurs[turn - 1] += scoreTemp;
          console.log(scoreTemp);
          nextTurn();
        }
      }
    }
    // if the player has not chosen yet (this is his first choice) we assign a color to this position (ground.fill();)
    if (hasChosen == false) {
      if (playGround.isPossible[y][x] != 0) {
        playGround.isChosen[y][x] = true;
        ground.fillStyle = "#f7657b"; // rouge
        ground.beginPath();
        ground.rect(75 * x, 75 * y, 75, 75);
        ground.closePath();
        ground.fill();
        console.log(
          "(" +
            evt.clientY / 75 +
            "," +
            evt.clientX / 75 +
            playGround.isChosen[y][x]
        );
      }
    }
  }
  // if the player has not yet thrown a dice and he clicked in either one or two dices we generate a random number between 1 and 6 and assign them to dice1Res and dice2Res
  if (hasPlayed == false) {
    if (
      evt.clientX >= 405 &&
      evt.clientX <= 455 &&
      evt.clientY >= 180 &&
      evt.clientY <= 200
    ) {
      rectState = 1;
      dice1Res = Math.floor(Math.random() * 6 + 1);
      hasPlayed = true;
    } // 1 dés
    if (
      evt.clientX >= 475 &&
      evt.clientX <= 535 &&
      evt.clientY >= 180 &&
      evt.clientY <= 200
    ) {
      rectState = 2;
      dice1Res = Math.floor(Math.random() * 6 + 1);
      dice2Res = Math.floor(Math.random() * 6 + 1);
      hasPlayed = true;
    }
  }
}
// this function shows the player the result that the dices gave
function makeChoice(value) {
  if (
    (dice1Res == dice2Res && dice1Res != -1 && dice2Res != -1) ||
    dice1Res == 6
  ) {
    //
    text.font = "30px Tahoma";
    text.fillText(dice1Res + " ", 440, 225);
    if (dice2Res != -1) text.fillText(dice2Res, 465, 225);
    text.font = "16px Tahoma";
    text.fillText("Pas chanceux!!", 405, 245);
    text.fillText("click pour continuer", 390, 265);
    notLucky = true;
  } else {
    if (value == 0) {
      ground.fillStyle = "#ffffff";
      ground.clearRect(0, 0, 375, 375);
      ground.beginPath();
      ground.rect(0, 0, 375, 375);
      ground.closePath();
      ground.fill();
      ground.stroke();
    }
    // if the player chose one dice
    else if (value == 1) {
      if (dice1Res != -1) {
        changeColor(dice1Res, 6);
        text.font = "60px Tahoma";
        text.fillText(dice1Res, 440, 255);
        MakePossible(dice1Res, 6);
      }
    }
    // if the player chose two dices
    else {
      if (dice1Res != -1 && dice2Res != -1) {
        changeColor(dice1Res, dice2Res);
        text.font = "60px Tahoma";
        text.fillText(dice1Res + " ", 420, 255);
        text.fillText(dice2Res, 470, 255);
        MakePossible(dice1Res, dice2Res);
      }
    }
  }
}
// make a position possible to play
function MakePossible(value1, value2) {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (
        playGround.board[i][j] == value1 ||
        playGround.board[i][j] == value2
      ) {
        playGround.isPossible[i][j] = 1;
      }
      if (playGround.board[i][j] == value1) {
        playGround.isPossible[i][j] = 2;
      }
    }
  }
}
// Change everything to default to start the next turn (make the board and everything as it was before the player played)
// except time and score
function nextTurn() {
  if (turn == 2) turn = 1;
  else turn++;
  hasPlayed = false;
  scoreBoard.fillStyle = "#b8c2d3";
  scoreBoard.clearRect(375, 0, 500, 375);
  scoreBoard.beginPath();
  scoreBoard.rect(375, 0, 500, 375);
  scoreBoard.closePath();
  scoreBoard.stroke();
  scoreBoard.fill();
  ground.fillStyle = "#ffffff";
  ground.clearRect(0, 0, 375, 375);
  ground.beginPath();
  ground.rect(0, 0, 375, 375);
  ground.closePath();
  ground.fill();
  ground.stroke();
  text.fillStyle = "#000000";
  text.font = "20px Tahoma";
  text.fillText("Tour du joueur", 395, 40);
  text.fillText("[" + turn + "]", 445, 70);
  text.fillText("1 Dé", 400, 190);
  text.fillText("2 Dés", 470, 190);
  text.fillText("Score", 430, 290);
  text.fillText("J1 |", 425, 320);
  text.fillText("J2", 465, 320);
  text.fillText(scoreJoueurs[0] + "  |", 430, 350);
  text.fillText(scoreJoueurs[1], 470, 350);
  rectState = 0;
  dice1Res = -1;
  dice2Res = -1;
  twenty = Math.floor(new Date().getTime() + 20 * 1000);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      playGround.isPossible[i][j] = 0;
      playGround.isChosen[i][j] = false;
    }
  }
}
// 8 minutes timer
var minutes = 7;
function Timer() {
  var now = Math.floor(new Date().getTime()); // now in seconds
  var distance = eightMinutes - now;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //if(--seconds < 0)	minutes--;
  text.font = "20px Tahoma";
  text.fillStyle = "#000000";
  text.fillText(minutes + ":" + seconds, 380, 440);
}

// 20 seconds timer
function TimerT() {
  var now = Math.floor(new Date().getTime());
  var distance = twenty - now;
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  text.fillText(seconds, 120, 440);
  if (--distance < 0) {
    nextTurn();
  }
}
function getTable(rowOrCol, value) {
  if (rowOrCol == 1) {
    return playGround.board[value];
  } // ligne
  var tab = [0, 0, 0, 0, 0];
  var i;
  var j;
  if (rowOrCol == 2) {
    //col
    for (i = 0; i < 5; i++) {
      tab[i] = playGround.board[i][value];
    }
    return tab;
  }
  if (rowOrCol == 3) {
    // diag droite
    for (i = 0, j = 4; i < 5; i++, j--) {
      tab[i] = playGround.board[i][j];
    }
    return tab;
  }
  if (rowOrCol == 4) {
    // diag gauche
    for (i = 0; i < 5; i++) {
      tab[i] = playGround.board[i][i];
    }
    return tab;
  }
  return null;
}
function verifTableau(tab, begin, max) {
  var i, j;
  for (i = begin; i < max; i++) {
    for (j = i + 1; j <= max; j++) {
      if (tab[i] == 6 || tab[j] == 6 || tab[i] == tab[j]) return false;
    }
  }
  return true;
}
function assignScore(tab) {
  var score = 0;
  if (verifTableau(tab, 0, 2)) {
    if (verifTableau(tab, 0, 3)) {
      if (verifTableau(tab, 0, 4)) window.alert("Le Joueur" + turn + "a gangé");
      //won the game
      else score = 4;
    } else {
      if (verifTableau(tab, 1, 4)) score = 4;
      else score = 3;
    }
  } else {
    // 0 2 non differents
    if (verifTableau(tab, 1, 3)) {
      if (verifTableau(tab, 1, 4)) score = 4;
      else score = 3;
    } else {
      // 1 3 non differents
      if (verifTableau(tab, 2, 4)) score = 3; // won 3
    }
  }
  return score;
}
function addScore(line, col) {
  var score = 0;
  var tab;
  tab = getTable(1, line);
  console.log(tab);
  score += assignScore(getTable(1, line)); //ligne
  console.log("ligne " + score);
  score += assignScore(getTable(2, col)); //col
  console.log("colomne" + score);
  console.log(getTable(2, col));
  if (line == col) {
    console.log(getTable(4, line));
    score += assignScore(getTable(4, col));
    console.log("diaDroite" + score);
  }
  if (line + col == 4) {
    console.log(getTable(3, line));
    score += assignScore(getTable(3, col));
    console.log("diaGauche" + score);
  }
  return score;
}
