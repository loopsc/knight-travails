// Code but with no console logs. Only result will be printed

function knightMoves(startSquare, endSquare) {
    // Stores list of paths
    let pathsQueue = [[startSquare]];
    // Initialise a set and add the coordinates of the starting square in string form
    // e.g '0,0'
    let visitedSquares = new Set();
    visitedSquares.add(`${startSquare[0]},${startSquare[1]}`);

    while (pathsQueue.length !== 0) {
        let currentPath = pathsQueue.shift();
        let currentSquare = currentPath[currentPath.length - 1]; //Last square in path

        // If we have found the end square then return
        if (
            currentSquare[0] === endSquare[0] &&
            currentSquare[1] === endSquare[1]
        ) {
            return currentPath;
        }

        // Push all valid moves from the current square into the queue
        let validMoves = checkMoves(getMoves(currentSquare));
        validMoves.forEach((coords) => {
            // String representation of a valid coordinate
            let key = `${coords[0]},${coords[1]}`;
            // If we have not visited the coordinate, add to the set.
            if (!visitedSquares.has(key)) {
                visitedSquares.add(key);
                pathsQueue.push([...currentPath, coords]);
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

// Only return valid moves
function checkMoves(moves) {
    return moves.filter((move) => {
        return move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7;
    });
}