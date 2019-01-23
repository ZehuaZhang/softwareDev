/**
 * Surrounded Regions
 * 
 * Given a 2D board containing 'X' and 'O', capture all regions surrounded by 'X'.
 * 
 * A region is captured by flipping all 'O's into 'X's in that surrounded region.
 * 
 * For example,
 * X X X X
 * X O O X
 * X X O X
 * X O X X
 * After running your function, the board should be:
 * 
 * X X X X
 * X X X X
 * X X X X
 * X O X X
 */

public class Solution {
    public void solve(char[][] board) {
        if (board == null) {
            throw new NullPointerException();
        }   

        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[0].length; ++j) {
                if (i == 0 || j == 0 || i == board.length - 1 || j == board[0].length) {
                    if (board[i][j] == 'O') {
                        solveHelper(board, i, j);
                    }
                } 
            }
        }

        for (int i = 0; i < board.length; ++i) {
            for (int j = 0; j < board[0].length; ++j) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
                if (board[i][j] == '#') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    private void solveHelper(char[][] board, int x, int y) {
        board[x][y] = '#';
        int[][] directions = new int[][] {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

        for (int[] direction : directions) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (newX >= 0 && newX < board.length && newY >=0 && newY < board[0].length && board[newX][newY] == 'O') {
                solveHelper(board, newX, newY);
            }
        }
    }
}
