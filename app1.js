var boardDesc;
var chance = 0;
const humanPlayer = "O";
const aiPlayer = "X";
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
  turn(square.target.id, humanPlayer);
  let playWon = checkWin(boardDesc, humanPlayer);
  if (!playWon && !checkTie(playWon, chance)) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardDesc[i] != "X" && boardDesc[i] != "O") {
        boardDesc[i] = aiPlayer;
        let checkScore = minimax(boardDesc, chance, false);
        boardDesc[i] = "";
        if (checkScore > bestScore) {
          bestScore = checkScore;
          bestMove = i;
        }
      }
    }
    ++chance;
    turn(bestMove, aiPlayer);
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
  if (checkTie(playWon, chance)) {
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

function checkTie(playWon, xchance) {
  if (xchance == 9 && !playWon) return true;
  else return false;
}

function minimax(board, height, isMaxi) {
  if (height % 2 === 1) {
    let result = checkWin(board, aiPlayer);
    if (result != null) {
      return 1;
    } else {
      if (checkTie(result, height + 1)) {
        return 0;
      }
    }
  } else {
    let result = checkWin(board, humanPlayer);
    if (result != null) {
      return -1;
    } else {
      if (checkTie(result, height + 1)) {
        return 0;
      }
    }
  }

  if (isMaxi) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] != "X" && board[i] != "O") {
        board[i] = aiPlayer;
        let score = minimax(board, height + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] != "X" && board[i] != "O") {
        board[i] = humanPlayer;
        let score = minimax(board, height + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function playOver(playWon) {
  for (let index of winnerComb[playWon.index]) {
    document.getElementById(index).style.backgroundColor =
      playWon.player == humanPlayer ? "blue" : "red";
  }
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", boxClick, false);
  }
  declareWinner(playWon.player == humanPlayer ? "You Win! :)" : "You lose! :(");
}

function declareWinner(name) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = name;
}
