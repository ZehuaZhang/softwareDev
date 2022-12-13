/*
Given an n x n matrix where each of the rows and columns are sorted in ascending order, return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.



Example 1:

Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13
Example 2:

Input: matrix = [[-5]], k = 1
Output: -5


Constraints:

n == matrix.length
n == matrix[i].length
1 <= n <= 300
-109 <= matrix[i][j] <= 109
All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
1 <= k <= n2
*/

function kthSmallest(grid: number[][], kth: number): number {
  const [rows, cols] = [grid.length, grid[0].length];
  let left = grid[0][0];
  let right = grid[rows - 1][cols - 1] + 1;
  while (left < right) {
    const mid = (left + right) >> 1;
    let count = 0;
    for (let i = 0, j = cols - 1; i < rows; ++i) {
      for (; j >= 0 && grid[i][j] > mid; --j);
      count += j + 1;
    }
    if (count < kth) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
