import java.util.*;

public class Solution {

    public class Cell {
        boolean isVisible = false;
        boolean isMine = false;
        int neighbourMinesCount = 0;
    }

    enum Status {
        Pending, Passed, Failed
    }

    public class MineSweeper {
        final int width;
        final int height;

        Cell[][] board;

        int revealedCellCount;
        Status status;

        MineSweeper(int width, int height, int minesCount) {
            board = new Cell[height][width];
            Random random = new Random();

            for (int minePlacedCount = 0; minePlacedCount < minesCount;) {
                int row = random.nextInt(height);
                int col = random.nextInt(width);

                if (board[row][col].isMine) {
                    continue;
                }

                ++minePlacedCount;

                for (int i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); ++i) {
                    for (int j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); ++j) {
                        if (i == row && j == col) {
                            board[row][col].isMine = true;
                            board[row][col].neighbourMinesCount = 0;
                        } else if (!board[row][col].isMine) {
                            ++board[row][col].neighbourMinesCount;
                        }
                    }
                }
            }

            revealedCellCount = 0;
            status = Status.Pending;
        }

        public void click(int row, int col) {
            if (row < 0 || row >= height || col < 0 || col >= width || board[row][col].isVisible) {
                return;
            }

            board[row][col].isVisible = true;
            ++revealedCellCount;

            if (board[row][col].isMine) {
                status = Status.Failed;
                return;
            }

            if (revealedCellCount == width * height) {
                status = Status.Passed;
            }

            if (board[row][col].neighbourMinesCount != 0) {
                return;
            }

            OnClick(row - 1, col);
            OnClick(row + 1, col);
            OnClick(row, col - 1);
            OnClick(row, col + 1);

            OnClick(row - 1, col - 1);
            OnClick(row - 1, col + 1);
            OnClick(row + 1, col - 1);
            OnClick(row + 1, col + 1);
        }

        public void print(boolean showHidden) {
            for (int i = 0; i < height; ++i) {
                for (int j = 0; j < width; ++j) {
                    if (showHidden || board[row][col].isVisible) {
                        char cellChar = ' ';
                        if (board[row][col].isMine) {
                            cellChar = '*';
                        } else if (board[row][col].neighbourMinesCount > 0) {
                            cellChar = '0' + board[row][col].neighbourMinesCount;
                        }

                        System.out.print(cellChar + " ");
                    } else {
                        System.out.print(". ");
                    }
                }
                System.out.println("");
            }
        }
    }
}
