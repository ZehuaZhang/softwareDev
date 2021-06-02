/**
 * N-Queens II
 * 
 * Follow up for N-Queens problem.
 * 
 * Now, instead outputting board configurations, return the total number of distinct solutions.
 */

public class Solution {
	public int totalNQueens(int n) {
		int[] result = new int[1];
		int[] columnPositionInRow = new int[n];
		Arrays.fill(columnPositionInRow, -1);
		totalNQueensHelper(row, n, columnPositionInRow, result);
		return result[0];
	}

	private totalNQueensHelper(int row, int n, int[] columnPositionInRow, int[] result) {
		if (row == n) {
			++result[0];
		} else {
			for (int col = 0; col < n; ++col) {
				if (isValid(columnPositionInRow, row, col)) {
					columnPositionInRow[row] = col;
					totalNQueensHelper(row + 1, n, columnPositionInRow, result);
					columnPositionInRow[row] = -1;
				}
			}
		}
	}

	private bool isValid(int[] columnPositionInRow, int row, int col) {
		for (int i = 0; i < columnPositionInRow.length; ++i) {
			if (columnPositionInRow[i] != -1) {
				if (columnPositionInRow[i] == col || row - i == col - columnPositionInRow[i]) {
					return false;
				}
			}
		}
		return true;
	}
}
