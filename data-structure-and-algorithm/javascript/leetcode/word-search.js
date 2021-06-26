/*
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
*/

function exist(board, word) {
    const visited = Array(board.length).fill(0).map(() => Array(board[0].length).fill(false));
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[0].length; ++j) {
            if (existDFS(board, word, 0, i, j, visited)) {
                return true;
            }
        }
    }
    return false;
}

function existDFS(board, word, index, i, j, visited) {
    if (index === word.length) {
        return true;
    }
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[index] || visited[i][j]) {
        return false;
    }
    visited[i][j] = true;
    let result = false;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (existDFS(board, word, index + 1, i + dx, j + dy, visited)) {
            result = true;
            break;
        }
    }
    visited[i][j] = false;
    return result;
}