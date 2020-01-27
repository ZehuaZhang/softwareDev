class TicTacToe {
    constructor(size) {
        this.size = size
        this.rows = createArray(0, 2, size)
        this.cols = createArray(0, 2, size)
        this.diag = createArray(0, 2)
        this.antiDiag = createArray(0, 2)
    }

    move(row, col, player) {
        ++this.rows[player - 1][row]
        ++this.cols[player - 1][col]

        if (row === col) {
            ++this.diag[player - 1]
        }

        if (row + col === this.size - 1) {
            ++this.antiDiag[player - 1]
        }

        if (
            this.rows[player - 1][row] === size ||
            this.cols[player - 1][col] === size ||
            this.antiDiag[player - 1] === size ||
            this.diag[player - 1] === size
        ) {
            return player
        }

        return 0
    }
}

function createArray(value, ...dimensions) {
    if (dimensions.length === 1) {
        return Array(dimensions[0]).fill(value)
    }

    return Array.from(
        {length: dimensions[0]},
        () => createArray(value, ...dimensions.slice(1))
    )
}