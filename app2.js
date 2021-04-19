var boardDesc;
var chance = 0;
const player1 = "O";
const player2 = "X";
const winnerComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxes = document.querySelectorAll(".box");
document.querySelector(".turn").innerText = "Player-1 Turn";
startGame();

function startGame() {
  chance = 0;
  document.querySelector(".turn").innerText = "Player-1 Turn";
  document.querySelector(".endgame").style.display = "none";
  boardDesc = Array.from(Array(9).keys());
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerText = "";
    boxes[i].style.backgroundColor = "yellow";
    boxes[i].addEventListener("click", boxClick, false);
  }
}

function boxClick(square) {
  ++chance;
  if (chance % 2 == 1) {
    document.querySelector(".turn").innerText = "Player-2 Turn";
    turn(square.target.id, player1);
  } else {
    document.querySelector(".turn").innerText = "Player-1 Turn";
    turn(square.target.id, player2);
  }
}

function turn(blockID, player) {
  if (boardDesc[blockID] != "X" && boardDesc[blockID] != "O") {
    boardDesc[blockID] = player;
    document.getElementById(blockID).innerText = player;
  } else {
    --chance;
  }
  let playWon = checkWin(boardDesc, player);
  if (playWon) playOver(playWon);
  if (chance == 9 && !playWon) {
    for (let i = 0; i < 9; i++) {
      boxes[i].style.backgroundColor = "green";
      boxes[i].removeEventListener("click", boxClick, false);
    }
    declareWinner("Game Tied!");
  }
  boxes[blockID].removeEventListener("click", boxClick, false);
}

function checkWin(board, player) {
  let playWin = null;
  let index = -1;
  let flag = 0;
  if (board[4] == player) {
    if (board[0] == player && board[8] == player) {
      flag = 1;
      index = 6;
    }
    if (board[2] == player && board[6] == player) {
      flag = 1;
      index = 7;
    }
    if (board[1] == player && board[7] == player) {
      flag = 1;
      index = 4;
    }
    if (board[3] == player && board[5] == player) {
      flag = 1;
      index = 1;
    }
  }
  if (board[0] == player) {
    if (board[1] == player && board[2] == player) {
      flag = 1;
      index = 0;
    }
    if (board[3] == player && board[6] == player) {
      flag = 1;
      index = 3;
    }
  }
  if (board[8] == player) {
    if (board[5] == player && board[2] == player) {
      flag = 1;
      index = 5;
    }
    if (board[6] == player && board[7] == player) {
      flag = 1;
      index = 2;
    }
  }
  if (flag == 1) playWin = { index: index, player: player };

  return playWin;
}

function playOver(playWon) {
  for (let index of winnerComb[playWon.index]) {
    document.getElementById(index).style.backgroundColor =
      playWon.player == player1 ? "red" : "blue";
  }
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", boxClick, false);
  }
  declareWinner(
    playWon.player == player1 ? "Player-1 Wins!" : "Player-2 Wins!"
  );
}

function declareWinner(name) {
  document.querySelector(".turn").innerText = "";
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = name;
}
