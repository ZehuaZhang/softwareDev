/*
Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

 

Example 1:


Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
In each diagonal all elements are the same, so the answer is True.
Example 2:


Input: matrix = [[1,2],[2,2]]
Output: false
Explanation:
The diagonal "[1, 2]" has different elements.
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 20
0 <= matrix[i][j] <= 99
 

Follow up:

What if the matrix is stored on disk, and the memory is limited such that you can only load at most one row of the matrix into the memory at once?
What if the matrix is so large that you can only load up a partial row into the memory at once?
*/

function isToeplitzMatrix(grid) {
    for (let i = 0; i < grid.length - 1; ++i) {
        for (let j = 0; j < grid[i].length - 1; ++j) {
            if (grid[i][j] !== grid[i + 1][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

// Load one row each time
function isToeplitzMatrix(grid) {
    const [rows, cols] = [grid.length, grid[0].length]
    const q = [];
    for (let j = cols - 1; j >= 0; --j) {
        q.push(grid[0][j]);
    }
    for (let i = 1; i < rows; ++i) {
        q.shift();
        for (let j = cols - 1; j > 0; --j) {
            if (grid[i][j] === q.shift()) {
                q.push(grid[i][j]);
            } else {
                return false;
            }
        }
        q.push(grid[i][0]);
    }
    return true;
}

// Load a partial row/column each time
function isToeplitzMatrix(grid, chunk) {
    const [rows, cols] = [grid.length, grid[0].length]
    let size = 1;
    let index = cols - 1;
    for (; index >= 0; index -= chunk) {
        size = Math.min(index + 1, chunk);
        const cache = Array(size).fill(0);
        for (let i = 0; i < size; ++i) {
            cache[size - i - 1] = grid[0][index - i];
        }
        for (let j = 1; j < Math.min(rows, cols); ++j) {
            let right = Math.min(index + j, cols - 1);
            let left = Math.max(index - chunk + 1 + j, j);
            for (let ci = 0, k = left; ci < size && k <= right; ++ci, ++k) {
                if (grid[j][k] != cache[ci]) { 
                    return false; 
                }
            }
        }
    }

    index = 0;
    for (; index < rows; index += chunk) {
        size = Math.min(rows - 1 - index, chunk);
        const cache = new int[size];
        for (let i = 0; i < size; ++i) {
            cache[size - 1 - i] = grid[rows - index - 1 - i][0];
        }
        for (let j = 1; j < Math.min(rows, cols); ++j) {
            const right = Math.max(rows - index - chunk + j, j + 1);
            const left = Math.min(rows - index - 1 + j, rows - 1);
            for (let ci = 0, k = right; ci < size && k <= left; ++ci, ++k)
            if (grid[k][j] != cache[ci])
                return false;
        }
    }
    return true;
}