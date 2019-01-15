/**
 * Valid Sudoku
 *  
 * Determine if a Sudoku is valid, according to: Sudoku Puzzles - The Rules.
 * 
 * The Sudoku board could be partially filled, where empty cells are filled with the character '.'.
 * 
 * A partially filled sudoku which is valid.
 * 
 * Note:
 * A valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.
 */

public class Solution {
    public boolean isValidSudoku(char[][] board) {
        if (board == null) {
            throw new NullPointerException();
        }

        int length = board.length;
        boolean[][] row = new boolean[length][length];
        boolean[][] col = new boolean[length][length];
        boolean[][] grid = new boolean[length][length];
        for (int i = 0; i < length; ++i) {
            for (int j = 0; j < length; ++j) {
                int character = board[i][j];
                if (character != '.') {
                    if (row[i][character] == true ||
                        col[j][character] == true||
                        grid[3 * (i / 3) + j / 3] == true) {
                        return false;
                    }
                }
                row[i][character] = true;
                col[j][character] = true;
                grid[3 * (i / 3) + j / 3] = true;
            }
        }
        return true;
    }
}
