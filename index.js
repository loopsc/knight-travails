function knightMoves(startSquare, endSquare) {
    // Stores list of paths
    let pathsQueue = [[startSquare]];
    // Initialise a set and add the coordinates of the starting square in string form
    // e.g '0,0'
    let visitedSquares = new Set();
    visitedSquares.add(`${startSquare[0]},${startSquare[1]}`);

    console.log(`Starting knightMoves from [${startSquare}] to [${endSquare}]\n`);

    while (pathsQueue.length !== 0) {
        let currentPath = pathsQueue.shift();
        let currentSquare = currentPath[currentPath.length - 1]; // Last square in path

        console.log(`Current path dequeued: ${JSON.stringify(currentPath)}`);
        console.log(`Current square: [${currentSquare}]`);

        // If we have found the end square then return
        if (
            currentSquare[0] === endSquare[0] &&
            currentSquare[1] === endSquare[1]
        ) {
            console.log(`Reached the end square! Path found:\n${JSON.stringify(currentPath)}`);
            return currentPath;
        }

        // Get all valid moves from the current square
        let validMoves = checkMoves(getMoves(currentSquare));
        console.log(`Valid moves from [${currentSquare}]: ${validMoves.map(m => `[${m}]`).join(', ')}`);

        validMoves.forEach((coords) => {
            // String representation of a valid coordinate
            let key = `${coords[0]},${coords[1]}`;

            // If we have not visited the coordinate, add to the set and enqueue new path
            if (!visitedSquares.has(key)) {
                visitedSquares.add(key);
                let newPath = [...currentPath, coords];
                pathsQueue.push(newPath);
                console.log(`  Enqueued new path: ${JSON.stringify(newPath)}`);
            } else {
                console.log(`  Already visited: [${coords}]`);
            }
        });

        console.log(`Queue length is now: ${pathsQueue.length}\n`);
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

console.log(knightMoves([0, 0], [3, 3]));
