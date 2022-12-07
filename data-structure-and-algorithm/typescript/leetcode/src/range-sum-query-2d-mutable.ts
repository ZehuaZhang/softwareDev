/*
Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), which contains sum = 8.

Example:
Given matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
update(3, 2, 2)
sumRegion(2, 1, 4, 3) -> 10
Note:
The matrix is only modifiable by the update function.
You may assume the number of calls to update and sumRegion function is distributed evenly.
You may assume that row1 ≤ row2 and col1 ≤ col2.
*/

class NumMatrix {
  constructor(matrix) {
    [this.rows, this.cols] = [matrix.length + 1, matrix[0].length + 1];
    this.matrix = [...Array(this.rows + 1)].map(() =>
      Array(this.cols + 1).fill(0)
    );
    this.bits = [...Array(this.rows + 1)].map(() =>
      Array(this.cols + 1).fill(0)
    );
    for (let i = 0; i < this.rows - 1; ++i) {
      for (let j = 0; j < this.cols - 1; ++j) {
        this.update(i, j, matrix[i][j]);
      }
    }
  }

  update(row, col, value) {
    const diff = value - this.matrix[row + 1][col + 1];
    for (let i = row + 1; i < this.rows; i += i & -i) {
      for (let j = col + 1; j < this.cols; j += j & -j) {
        this.bits[i][j] += diff;
      }
    }
    this.matrix[row + 1][col + 1] = value;
  }

  sumRegion(row1, col1, row2, col2) {
    return (
      this.getSum(row2 + 1, col2 + 1) -
      this.getSum(row1, col2 + 1) -
      this.getSum(row2 + 1, col1) +
      this.getSum(row1, col1)
    );
  }

  getSum(row, col) {
    let result = 0;
    for (let i = row; i > 0; i -= i & -i) {
      for (let j = col; j > 0; j -= j & -j) {
        result += this.bits[i][j];
      }
    }
    return result;
  }
}

const m = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]);
console.log(m.sumRegion(2, 1, 4, 3));
m.update(3, 2, 2);
console.log(m.sumRegion(2, 1, 4, 3));
