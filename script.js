class Gameboard {
    constructor(gameInstance) {
        this.array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        this.game = gameInstance;
    }

    reset() {
        this.array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        this.create_gameboard();
    }

    create_gameboard(currentPlayer = this.game.currentPlayer) {
        console.log("Creating gameboard...");
        const gameboard = document.getElementById('gameboard');
        gameboard.innerHTML = ''; // Clear the gameboard
        gameboard.style.display = 'grid';
        gameboard.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gameboard.style.gap = '10px'; // Adjust gap size as needed
        gameboard.style.backgroundColor = 'black'; // Make the background color black


        this.array.forEach((cellValue, i) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', `cell-${i}`);
            cell.textContent = cellValue; // Optional: Display cell value
            cell.addEventListener('click', () => this.cellClicked(i, currentPlayer));
            gameboard.appendChild(cell);
        });
    }

    cellClicked(i, currentPlayer) {
        console.log(`Cell ${i} clicked!`);
        if (this.array[i] === ' ') {
            this.array[i] = currentPlayer.symbol;
            this.checkWinner();
            this.game.togglePlayer();
            this.create_gameboard();
        } else{
            console.log('Cell already taken');
        }
    }

    checkWinner() {
        console.log('Checking winner...');
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (this.array[a] && this.array[a] === this.array[b] && this.array[a] === this.array[c] && this.array[a] !== ' ') {
                console.log(`Player ${this.game.currentPlayer.symbol} wins!`);
                this.game.currentPlayer.score++;
                this.updateScoreDisplay();
                this.game.ongoing = false;
                // display winner
                document.getElementById('winnerName').textContent = this.game.currentPlayer.name;
                document.getElementById('winPopup').style.display = 'flex'; // Show popup
                shootConfetti();
                break;
            }
        }
    
    }

    updateScoreDisplay() {
        document.getElementById('player1-score').textContent = this.game.player1.score;
        document.getElementById('player2-score').textContent = this.game.player2.score;
    }


}

function closePopup() {
    document.getElementById('winPopup').style.display = 'none'; // Hide popup
}

function shootConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

class Player{
    constructor(name, symbol){
        this.score = 0;
        this.name = name
        this.symbol = symbol
    }
}


class Game{
    constructor(){
        this.gameboard = new Gameboard(this);
        this.player1 = new Player('Player 1 👾', '👾');
        this.player2 = new Player('Player 2 🎮', '🎮');
        document.getElementById('player1-name').textContent = this.player1.name;
        document.getElementById('player2-name').textContent = this.player2.name;
        this.currentPlayer = this.player1;
        this.ongoing = true;
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
}

let game;
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(); // Now inside the DOMContentLoaded callback
    console.log(game);
    game.gameboard.create_gameboard(game.currentPlayer);
    // Add event listener for the reset button
    document.getElementById('resetGameButton').addEventListener('click', function() {
        game.gameboard.reset();
        game.player1.score = 0;
        game.player2.score = 0;
        game.gameboard.updateScoreDisplay();
    });

    // If you have another reset button in the popup, add an event listener for it as well
    document.getElementById('resetGamePopUpButton').addEventListener('click', function() {
        game.gameboard.reset();
    });
});


