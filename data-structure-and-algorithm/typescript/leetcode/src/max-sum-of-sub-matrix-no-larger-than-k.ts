/*
363. Max Sum of Rectangle No Larger Than K
Difficulty: Hard

Given a non-empty 2D matrix and an integer k, 
find the max sum of a rectangle in the matrix such that its sum is no larger than k.

Example:
Given matrix = [
  [1,  0, 1],
  [0, -2, 3]
]
k = 2
The answer is 2. Because the sum of rectangle [[0, 1], [-2, 3]] is 2 and 2 is the max number no larger than k (k = 2).

Note:
The rectangle inside the matrix must have an area > 0.
What if the number of rows is much larger than the number of columns?

Time:  O(min(rows, cols)^2 * max(rows, cols) * log(max(rows, cols)))
Space: O(max(rows, cols))
*/

function maxSumSubmatrix(matrix: number[][],  target: number): number {
    const [rows, cols] = [matrix.length, matrix[0].length];
    let result = -Infinity;

    for (let k = 0; k < rows; ++k) {
      vector<int> sums(cols, 0);
      for (int i = k; i < rows; ++i) {
        // row strip from k to i
        for (int j = 0; j < cols; ++j) {
          sums[j] += matrix[i][j];
        }
        set<int> accuSumSet;
        accuSumSet.emplace(0);
        int accuSum = 0;
        for (int sum : sums) {
          accuSum += sum;
          auto it = accuSumSet.lower_bound(accuSum - k);
          if (it != accuSumSet.end()) {
            result = max(result, accuSum - *it);
          }
          accuSumSet.emplace(accuSum);
        }
      }
    }
    return result;
  }
