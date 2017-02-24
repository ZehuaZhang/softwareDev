// 311. Sparse Matrix Multiplication
// Difficulty: Medium

// Given two sparse matrices A and B, return the result of AB.

// You may assume that A's column number is equal to B's row number.

// Example:

// A = [
//   [ 1, 0, 0],
//   [-1, 0, 3]
// ]

// B = [
//   [ 7, 0, 0 ],
//   [ 0, 0, 0 ],
//   [ 0, 0, 1 ]
// ]


//      |  1 0 0 |   | 7 0 0 |   |  7 0 0 |
// AB = | -1 0 3 | x | 0 0 0 | = | -7 0 3 |
//                   | 0 0 1 |

// Time:  O(m * n * l), A is m x n matrix, B is n x l matrix
// Space: O(m * l)

#import<Foundation/Foundation.h>

NSArray* multiply(NSArray* A, NSArray* B) {
  const NSInteger m = A.count, l = [A[0] count], n = [B[0] count];
  NSMutableArray* res = @[].mutableCopy;
  for (int i = 0; i < m; ++i) {
    res[i] = @[].mutableCopy;
    for (int k = 0; k < l; ++k) {
      if ([A[i][k] intValue]) {
        for (int j = 0; j < n; ++j) {
          res[i][j] = @([res[i][j] intValue] + [A[i][k] intValue] * [B[k][j] intValue]);
        }
      }
    }
  }
  return res;
}
