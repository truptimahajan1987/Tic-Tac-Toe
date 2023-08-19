const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alertBox = document.querySelector(".alertBox");

// Making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

const startGame = () => {
    gameCells.forEach((cell) => {
        cell.addEventListener('click', handleClick);
    })
}
// function handleclick

const handleClick = (e) => {
    if (e.target.textContent == '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            // console.log(`${playerTurn} is Winner`);
            showAlert(`${playerTurn} is Winner`);
            disableCells();
        }
        else if (checkTie()) {
            // console.log(`It's a Tie `);
            showAlert(`It's a Tie! `);
            disableCells();

        }
        else {
            changePlayerTurn();
            // showAlert(`Turn for Player : ${playerTurn} `);}
        }
    }
}

// function to change playerturn

const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
}

// function to check win
const checkWin = () => {
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winCondition.length; i++) {
        const [pos1, pos2, pos3] = winCondition[i];
        // console.log('${pos1} ${pos2} ${pos3}')
        if (gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

// function to check to tie
const checkTie = () => {
    let emptyCellCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellCount++;
        }

    })
    return emptyCellCount === 0 && !checkWin();

}
// function to disable cell after win and tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    })
}

// function to restart
const restartGame = () => {

    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
        alertBox.style.display = "none";

    })
    startGame();
}

// add event on restart button
restartBtn.addEventListener('click', restartGame);

// function to alert

const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
}

startGame();
