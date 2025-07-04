function knightMoves(startSquare, endSquare) {
    const queue = [[startSquare]];
    const visitedSquares = new Set();
    visitedSquares.add(JSON.stringify(startSquare));

    while (queue.length !== 0) {
        const currentPath = queue.shift();
        const currentSquare = currentPath[currentPath.length - 1];

        // Destructure 'currentSquare' into x and y for readability and ease of use
        const [x, y] = currentSquare;

        if (x === endSquare[0] && y === endSquare[1]) {
            return currentPath;
        }

        let validMoves = checkMoves(getMoves(currentSquare));
        validMoves.forEach((nextSquare) => {
            let key = JSON.stringify(nextSquare);
            if (!visitedSquares.has(key)) {
                visitedSquares.add(key);
                queue.push([...currentPath, nextSquare]);
            }
        });
    }
}

// Get all moves regardless of validity
function getMoves(square) {
    const moves = [];
    moves.push([square[0] - 2, square[1] + 1]);
    moves.push([square[0] - 1, square[1] + 2]);

    moves.push([square[0] + 1, square[1] + 2]);
    moves.push([square[0] + 2, square[1] + 1]);

    moves.push([square[0] + 2, square[1] - 1]);
    moves.push([square[0] + 1, square[1] - 2]);

    moves.push([square[0] - 1, square[1] - 2]);
    moves.push([square[0] - 2, square[1] - 1]);
    return moves;
}

function checkMoves(moves) {
    return moves.filter((move) => {
        return move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7;
    });
}

console.log(knightMoves([0, 0], [3, 3]));
