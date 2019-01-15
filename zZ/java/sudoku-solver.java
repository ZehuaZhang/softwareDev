/**
 * Sudoku Solver
 * 
 * Write a program to solve a Sudoku puzzle by filling the empty cells.
 * 
 * Empty cells are indicated by the character '.'.
 * 
 * You may assume that there will be only one unique solution.
 */

public class Solution {
    public void solveSudoku(char[][] board) {
        solveSudokuHelper(board);
    }

    private boolean solveSudokuHelper(char[][] board) {
        if (board == null) {
            throw new NullPointerException();
        }

        for (int i = 0; i < 9; ++i) {
            for (int j = 0; j < 9; ++j) {
                if (board[i][j] == '.') {
                    for (int k = 0; k < 9; ++k) {
                        board[i][j] = k + '1';
                        if (isValid(board, i, j) == true && solveSudokuHelper(board) == true) {
                            return true;
                        }
                        board[i][j] = '.';
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isValid(char[][] board, int x, int y) {
        for (int i = 0; i < 9; ++i) {
            if (i != x && board[i][y] == board[x][y]) {
                return false;
            }
        }

        for (int j = 0; j < 9; ++j) {
            if (j != y && board[x][j] == board[x][y]) {
                return false;
            }
        }

        for (int i = 3 * (x / 3); i < 3 * (x / 3 + 1); ++i) {
            for (int j = 3 * (y / 3); j < 3 * (y / 3 + 1); ++j) {
                if (!(j == y && i == x) && board[i][j] == board[x][y]) {
                    return false;
                }
            }
        }

        return true;
    }
}
