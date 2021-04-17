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
startGame();

function startGame() {
  chance = 0;
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
  if (chance % 2 == 1) turn(square.target.id, player1);
  else turn(square.target.id, player2);
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
  boxes[blockID].removeEventListener("click", boxClick, false);
}

function checkWin(board, player) {
  let game = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let playWon = null;
  for (let [index, won] of winnerComb.entries()) {
    if (won.every((ele) => game.indexOf(ele) >= 0)) {
      playWon = { index: index, player: player };
      break;
    }
  }
  return playWon;
}

function playOver(playWon) {
  for (let index of winnerComb[playWon.index]) {
    document.getElementById(index).style.backgroundColor =
      playWon.player == player1 ? "red" : "blue";
  }
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", boxClick, false);
  }
}
