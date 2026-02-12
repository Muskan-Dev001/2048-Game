let scoreDisplay = document.querySelector(".score-number");
let gridDisplay = document.querySelector(".grid");
let resetGameBtn = document.querySelector(".resetGame");
let score = 0;
let divArray = [];
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// create game board
function createBoard() {
  for (let i = 0; i < 16; i++) {
    let div = document.createElement("div");
    div.classList.add("gridEl");
    div.innerText = 0;
    gridDisplay.appendChild(div);
    divArray.push(div);
  }
  generate();
  generate();
}

createBoard();


// generate new number
function generate() {
  let emptytiles = divArray.filter((div) => parseInt(div.innerText) === 0);

  if (emptytiles.length === 0) return;

  let randomNum = Math.floor(Math.random() * divArray.length);
  if (divArray[randomNum].innerText == 0) {
    divArray[randomNum].innerText = "2";
  } else generate();
  bgColor();
}

/* --------- ANIMATION------- */

function animateMerge(tile) {
  tile.classList.add("merge");
  tile.addEventListener(
    "animationend",
    () => tile.classList.remove("merge"),
    { once: true }
  );
}

/*---------------Move Logic -------------*/ 

// move right
function moveRight() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = divArray[i].innerText;
      let totalTwo = divArray[i + 1].innerText;
      let totalThree = divArray[i + 2].innerText;
      let totalFour = divArray[i + 3].innerText;

      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filterRow = row.filter((Number) => Number !== 0);
      let missing = 4 - filterRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = zeros.concat(filterRow);

      divArray[i].innerText = newRow[0];
      divArray[i + 1].innerText = newRow[1];
      divArray[i + 2].innerText = newRow[2];
      divArray[i + 3].innerText = newRow[3];
    }
  }
}

// Move Left
function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = divArray[i].innerText;
      let totalTwo = divArray[i + 1].innerText;
      let totalThree = divArray[i + 2].innerText;
      let totalFour = divArray[i + 3].innerText;

      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filterRow = row.filter((Number) => Number !== 0);
      let missing = 4 - filterRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = filterRow.concat(zeros);

      divArray[i].innerText = newRow[0];
      divArray[i + 1].innerText = newRow[1];
      divArray[i + 2].innerText = newRow[2];
      divArray[i + 3].innerText = newRow[3];
    }
  }
}


// Move Up
function moveUP() {
  for (let i = 0; i < 4; i++) {
    let totalOne = divArray[i].innerText;
    let totalTwo = divArray[i + 4].innerText;
    let totalThree = divArray[i + 8].innerText;
    let totalFour = divArray[i + 12].innerText;

    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filterColumn = column.filter((num) => num !== 0);
    let missingNum = 4 - filterColumn.length;
    let columnZeros = Array(missingNum).fill(0);
    let newColumn = filterColumn.concat(columnZeros);

    divArray[i].innerText = newColumn[0];
    divArray[i + 4].innerText = newColumn[1];
    divArray[i + 8].innerText = newColumn[2];
    divArray[i + 12].innerText = newColumn[3];
  }
}

// Move Down
function moveDown() {
  for (let i = 0; i < 4; i++) {
    let totalOne = divArray[i].innerText;
    let totalTwo = divArray[i + 4].innerText;
    let totalThree = divArray[i + 8].innerText;
    let totalFour = divArray[i + 12].innerText;

    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filterColumn = column.filter((num) => num !== 0);
    let missingNum = 4 - filterColumn.length;
    let columnZeros = Array(missingNum).fill(0);
    let newColumn = columnZeros.concat(filterColumn);

    divArray[i].innerText = newColumn[0];
    divArray[i + 4].innerText = newColumn[1];
    divArray[i + 8].innerText = newColumn[2];
    divArray[i + 12].innerText = newColumn[3];
  }
}

/*---------- Combine Logic --------------*/

// Combine Row to Right
function combineRowRight() {
  for (let i = 0; i < 16; i += 4) {
    for (let j = i + 3; j > i; j--) {
      let current = parseInt(divArray[j].innerText);
      let left = parseInt(divArray[j - 1].innerText);

      if (current === left && current !== 0) {
        let combined = current + left;

        divArray[j].innerText = combined;
        animateMerge(divArray[j]);
        divArray[j - 1].innerText = 0;

        score += combined;
        scoreDisplay.innerText = score;

        j--;
      }
    }
  }
}

// Combine Row to Right
function combineRowLeft() {
    for (let i = 0; i < 16; i += 4) {
    for (let j = i; j < i + 3; j++) {
      let current = parseInt(divArray[j].innerText);
      let left = parseInt(divArray[j + 1].innerText);

      if (current === left && current !== 0) {
        let combined = current + left;

        divArray[j].innerText = combined;
        animateMerge(divArray[j]);
        divArray[j + 1].innerText = 0;

        score += combined;
        scoreDisplay.innerText = score;

        j++;
      }
    }
  }
}


// Combine column upward
function combineColumnUp() {
  for (let col = 0; col < 4; col++) {
    for (let row = col; row < col + 12; row += 4) {
      if (
        divArray[row].innerText === divArray[row + 4].innerText &&
        divArray[row].innerText != 0
      ) {
        let combineNumber =
          parseInt(divArray[row].innerText) +
          parseInt(divArray[row + 4].innerText);

        divArray[row].innerText = combineNumber;
        animateMerge(divArray[row]);
        divArray[row + 4].innerText = 0;
        score += combineNumber;
        scoreDisplay.innerText = score;
      }
    }
  }
}


// Combine column Downward
function combineColumnDown() {
  for (let col = 0; col < 4; col++) {
    for (let row = 12 + col; row > col; row -= 4) {
      if (
        divArray[row].innerText === divArray[row - 4].innerText &&
        divArray[row].innerText != 0
      ) {
        let combineNumber =
          parseInt(divArray[row].innerText) +
          parseInt(divArray[row - 4].innerText);

        divArray[row].innerText = combineNumber;
        animateMerge(divArray[row]);
        divArray[row - 4].innerText = 0;
        score += combineNumber;
        scoreDisplay.innerText = score;
      }
    }
  }
}



function bgColor() {
  for (let i = 0; i < divArray.length; i++) {
    if (divArray[i].innerText == 0) {
      divArray[i].style.backgroundColor = "rgb(180 160 123)";
      divArray[i].style.color = "rgb(180 160 123)";
    } else if (divArray[i].innerText == 2) {
      divArray[i].style.backgroundColor = "#eedcc2";
      divArray[i].style.color = "#484133";
    } else if (divArray[i].innerText == 4) {
      divArray[i].style.backgroundColor = "#f3e0b5";
      divArray[i].style.color = "#484133";
    } else if (divArray[i].innerText == 8) {
      divArray[i].style.backgroundColor = "#fba762";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 16) {
      divArray[i].style.backgroundColor = "#f18950";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 32) {
      divArray[i].style.backgroundColor = "#fa623c";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 64) {
      divArray[i].style.backgroundColor = "#e64128";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 128) {
      divArray[i].style.backgroundColor = "#ff2a2a";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 256) {
      divArray[i].style.backgroundColor = "#ff6b00";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 512) {
      divArray[i].style.backgroundColor = "#f03c00";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 1024) {
      divArray[i].style.backgroundColor = "#920e0e";
      divArray[i].style.color = "#ffffff";
    } else if (divArray[i].innerText == 2048) {
      divArray[i].style.backgroundColor = "#b40808";
      divArray[i].style.color = "#ffffff";
    }
  }
}

// check for winner

function checkForWin() {
  for (let i = 0; i < divArray.length; i++) {
    if (divArray[i].innerText == 2048) {
      let result = document.createElement("div");
      result.innerText = "You WIN!";
      result.classList.add("game-win");
      document.body.appendChild(result);
      document.removeEventListener("keyup", control);
    }
  }
}

// check for loser
function checkForLoser() {

   let loseGame = true;

  // Check for empty cells
  for (let i = 0; i < divArray.length; i++) {
    if (parseInt(divArray[i].innerText) === 0) {
      return; 
    }
  }

  // Check for possible horizontal merges
  for (let i = 0; i < divArray.length; i++) {
    if (
      i % 4 !== 3 && 
      divArray[i].innerText === divArray[i + 1].innerText
    ) {
      return;
    }
  }

  // Check for possible vertical merges
  for (let i = 0; i < 12; i++) {
    if (divArray[i].innerText === divArray[i + 4].innerText) {
      return;
    }
  }
 

  // If none of the above returned, player loses
  if(loseGame){
let result = document.createElement("div");
  result.innerText = "You LOSE!";
  result.classList.add("game-over");
  document.body.appendChild(result);
  document.removeEventListener("keyup", control);
  loseGame = false;
  }
  
}

function keyUp() {
  moveUP();
  combineColumnUp();
  moveUP();
  checkForWin();
  generate();
  checkForLoser();
}

function keyDown() {
  moveDown();
  combineColumnDown();
  moveDown();
  checkForWin();
  generate();
  checkForLoser();
}

function keyRight() {
  moveRight();
  combineRowRight();
  moveRight();
  checkForWin();
  generate();
  checkForLoser();
}

function keyLeft() {
  moveLeft();
  combineRowLeft();
  moveLeft();
  checkForWin();
  generate();
  checkForLoser();
}

function control(e) {
  if (e.key === "ArrowLeft") {
    keyLeft();
  } else if (e.key === "ArrowRight") {
    keyRight();
  } else if (e.key === "ArrowUp") {
    keyUp();
  } else if (e.key === "ArrowDown") {
    keyDown();
  }
}

// handleSwipe Function

function handleSwipe() {
  let diffX = endX - startX;
  let diffY = endY - endX;
  let minThreshold = 30;

  if(Math.abs(diffX) < minThreshold && Math.abs(diffY) < minThreshold) return;

  //check for horizontal swipe
  if(Math.abs(diffX) > Math.abs(diffY)){
    if(diffX>0){
      keyRight();
    }else{
      keyLeft();
    }
  }else{
    if(diffY>0){
      keyDown();
    }else{
      keyUp();
    }
  }
}

// userTouchScreen Action

gridDisplay.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
})

gridDisplay.addEventListener("touchend",(e) => {
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
  handleSwipe();
})

// reset Game function
function resetGame() {

  divArray.forEach(tile => {
    tile.innerText = 0;
  });

  score = 0;
  scoreDisplay.innerText = score;

  document.querySelectorAll(".game-win, .game-over")
    .forEach(el => el.remove());

  bgColor();
  generate();
  generate();
}


resetGameBtn.addEventListener("click", resetGame);
document.addEventListener("keyup", control);
