54. Spiral Matrix
Difficulty: Medium
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

For example,
Given the following matrix:

[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
You should return [1,2,3,6,9,8,7,4,5].

// Time:  O(m * n)
// Space: O(1)

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty()) {
            return res;
        }

        int left = -1, right = matrix[0].size() - 1;
        int top = 0, bottom = matrix.size() - 1; 
        
        while (++left <= right && top <= bottom) {
            for (int j = left; j <= right; ++j) {
                res.push_back(matrix[top][j]);
            }
            for (int i = ++top; i <= bottom; ++i) {
                res.push_back(matrix[i][right]);
            }
            for (int j = --right; top <= bottom && j >= left; --j) {
                res.push_back(matrix[bottom][j]);
            }
            for (int i = --bottom; left <= right && i >= top; --i) {
                res.push_back(matrix[i][left]);
            }
        }

        return res;
    }
};