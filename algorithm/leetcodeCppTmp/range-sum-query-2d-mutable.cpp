308. Range Sum Query 2D
Difficulty : hard
 
Given a 2D matrix matrix, find the sum of the elements inside the rectangle 
defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), 
which contains sum = 8.

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

// Time:  ctor:   O(m * n),
//        update: O(logm + logn),
//        query:  O(logm + logn)
// Space: O(m * n)

// Segment Tree solution.
class NumMatrix {
public:
    NumMatrix(vector<vector<int>> &matrix) : {
        if (matrix.empty() || matrix[0].empty()) return;
        _matrix.resize(matrix.size() + 1, vector<int>(matrix[0].size() + 1, 0));
        _bits.resize(matrix.size() + 1, vector<int>(matrix[0].size() + 1, 0));
        for (int i = 0; i < matrix.size(); ++i) {
            for (int j = 0; j < matrix[i].size(); ++j) {
                update(i, j, matrix[i][j]);
            }
        }
    }

    void update(int row, int col, int val) {
        int diff = val - _matrix[row + 1][col + 1];
        for (int i = row + 1; i < _matrix.size(); i += i & -i) {
            for (int j = col + 1; j < _matrix[i].size(); j += j & -j) {
                _bits[i][j] += diff;
            }
        }
        _matrix[row + 1][col + 1] = val;
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        return getSum(row2 + 1, col2 + 1) - getSum(row1, col2 + 1) - getSum(row2 + 1, col1) + getSum(row1, col1);
    }
    
    int getSum(int row, int col) {
        int result = 0;
        for (int i = row; i > 0; i -= i & -i) {
            for (int j = col; j > 0; j -= j & -j) {
                result += bit[i][j];
            }
        }
        return result;
    } 
    
private:
    vector<vector<int>> _matrix;
    vector<vector<int>> _bits;
};


// Your NumMatrix object will be instantiated and called as such:
// NumMatrix numMatrix(matrix);
// numMatrix.sumRegion(0, 1, 2, 3);
// numMatrix.update(1, 1, 10);
// numMatrix.sumRegion(1, 2, 3, 4);
