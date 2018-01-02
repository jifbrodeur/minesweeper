// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`
/**
 * Game class that will create a playerBoard for the player move
 * and a bombBoard of the same size that will contain the randomly generated
 * bombs
 * @param {int} numberOfRows number of rows for the board
 * @param {int} numberOfColumns number of columns for the board
 * @param {int} numberOfBombs number of bomb to put on the board
 */
import { Board } from './board';
class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game Over');
            this._board.print();
        } else {
            if (!this._board.hasSafeTiles) {
                console.log('You Win!');
            } else {
                console.log('Current Board:');
                this._board.print();
            }
        }
    }
}