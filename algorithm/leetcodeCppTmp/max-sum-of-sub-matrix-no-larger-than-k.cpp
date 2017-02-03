363. Max Sum of Rectangle No Larger Than K
Difficulty: Hard

Given a non-empty 2D matrix matrix and an integer k, 
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

// Time:  O(min(m, n)^2 * max(m, n) * log(max(m, n)))
// Space: O(max(m, n))

class Solution {
public:
    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        if (matrix.empty()) {
            return 0;
        }

        const int m = matrix.size();
        const int n = matrix[0].size();
        int result = INT_MIN;

        for (int i = 0; i < m; ++i) {
            vector<int> sums(n, 0);
            // accumulative-sum row strips, each starts at row i
            for (int j = i; j < m; ++j) {
                // row strip
                for (int l = 0; l < n; ++l) {
                    sums[l] += matrix[j][l];
                }
    
                // Find the max subarray no more than K.
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
};
