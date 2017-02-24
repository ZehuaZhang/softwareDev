// 74. Search a 2D Matrix
// Difficulty: Medium

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
// For example,

// Consider the following matrix:

// [
//   [1,   3,  5,  7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 50]
// ]
// Given target = 3, return true.

// Time:  O(log(m * n))
// Space: O(1)

class Solution {
public:
    bool searchMatrix(vector<vector<int> > &matrix, int target) {
        if(matrix.empty()) return false;

        const size_t m = matrix.size();
        const size_t n = matrix.front().size();

        int start = 0, end = m * n;

        while(start < end) {
            int mid = (start + end) / 2;
            int value = matrix[mid / n][mid % n];
            if (value == target) {
                return true;
            } else if (value < target) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        return false;
    }
};
