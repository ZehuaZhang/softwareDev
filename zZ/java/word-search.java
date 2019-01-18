/**
 * Word Search
 * 
 * Given a 2D board and a word, find if the word exists in the grid.
 * 
 * The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
 * 
 * For example,
 * Given board =
 * 
 * [
 *   ["ABCE"],
 *   ["SFCS"],
 *   ["ADEE"]
 * ]
 * word = "ABCCED", -> returns true,
 * word = "SEE", -> returns true,
 * word = "ABCB", -> returns false.
 */

public class Solution {
    public boolean exist(char[][] board, String word) {
        if (board == null || word == null) {
            throw new NullPointerException();
        }

        boolean[][] visited = new boolean[board.length - 1][board[0].length - 1];
        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[0].length; ++j) {
                if (existHelper(board, i, j, visited, 0, word)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean existHelper(char[][]board, int x, int y, boolean[][] visited, int start, String word) {
        if (start == word.length()) {
            return true;
        }

        if (x < 0 || x > board.length ||
            y < 0 || y > board[0].length ||
            visited[x][y] ||
            word.charAt(start) != board[x][y]) {
            return false;
        }

        boolean hasFound = false;
        visited[x][y] = true;
        hasFound = 
            existHelper(board, x + 1, y, visited, start + 1, word) ||
            existHelper(board, x, y + 1, visited, start + 1, word) ||
            existHelper(board, x - 1, y, visited, start + 1, word) ||
            existHelper(board, x, y - 1, visited, start + 1, word);
        visited[x][y] = false;
        return hasFound;
    }
}
