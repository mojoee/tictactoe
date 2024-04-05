class Gameboard {
    constructor() {
        this.array = ["X", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    create_gameboard() {
        console.log("Creating gameboard...");
        const gameboard = document.getElementById('gameboard');
        gameboard.innerHTML = ''; // Clear the gameboard
        gameboard.style.display = 'grid';
        gameboard.style.gridTemplateColumns = 'repeat(3, 1fr)';
        gameboard.style.gap = '20px'; // Adjust gap size as needed

        this.array.forEach((cellValue, i) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', `cell-${i}`);
            cell.textContent = cellValue; // Optional: Display cell value
            cell.addEventListener('click', () => this.cellClicked(i, game.currentPlayer));
            gameboard.appendChild(cell);
        });
    }

    cellClicked(i, currentPlayer) {
        console.log(`Cell ${i} clicked!`);
        if (this.array[i] === ' ') {
            this.array[i] = currentPlayer.symbol;
            game.togglePlayer();
            this.create_gameboard();
        } else{
            console.log('Cell already taken');
        }
    }


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
        this.gameboard = new Gameboard();
        this.player1 = new Player('Player 1', 'X');
        this.player2 = new Player('Player 2', 'O');
        this.currentPlayer = this.player1;
    }

    togglePlayer() {
        game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;
    }
}

const game = new Game();
console.log(game);
function startGame() {
    game.gameboard.create_gameboard();
}
