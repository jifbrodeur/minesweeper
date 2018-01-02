export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfRows = numberOfRows;
        this._numberOfColumnss = numberOfColumns;
        this._numberOfTiles = numberOfRows * numberOfColumns;

        this._playerBoard =
            Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard =
            Board.generateBombBoard(numberOfRows, numberOfColumns,
                numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            return;
        }
        if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] =
                this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfEmptySpaces--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [];
        // add 8 array element to the neighbor array
        for (let i = 0; i < 8; i++) {
            neighborOffsets.push([]);
        }
        let j = 0;
        while (j < 8) {
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (!(x == 0 && y == 0)) {
                        neighborOffsets[j] = [x, y];
                        j++;
                    }
                }
            }
        }
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;

        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
                neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    hasSafeTiles() {
        return (this._numberOfTiles !== this._numberOfBombs);
    }

    print() {
        console.log(this._playerBoard.map((row) => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        const board = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex <
                numberOfColumns; columnIndex++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        const board = [];

        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex <
                numberOfColumns; columnIndex++) {
                row.push(null);
            }
            board.push(row);
        }

        let numberOfBombsPlaced = 0;

        while (numberOfBombsPlaced < numberOfBombs) {
            const randomRowIndex = Math.floor(Math.random() * numberOfRows);
            const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
}