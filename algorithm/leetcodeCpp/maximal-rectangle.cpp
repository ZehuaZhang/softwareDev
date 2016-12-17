85. Maximal Rectangle
Difficulty: Hard

Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1 and return its area.

For example, given the following matrix:

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Return 6.

// Time:  O(m * n)
// Space: O(n)

// Ascending stack solution.
class Solution {
public:
    int maximalRectangle(vector<vector<char> > &matrix) {
        if (matrix.empty()) {
            return 0;
        }

        const int m = matrix.size();
        const int n = matrix[0].size();
        int maxArea = 0;
        vector<int> heights(n, 0);

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                heights[j] = matrix[i][j] == '1' ? heights[j] + 1 : 0;
            }
            maxArea = max(maxArea, maximalRectangleTillCurrRow(heights));
        }

        return maxArea;
    }

private:
    int maximalRectangleTillCurrRow(vector<int> heights) {
        stack<int> incHeights;  // store index of heights
        heights.push_back(0); // for final calculate
        int maxArea = 0;

        for (int i = 0; i < heights.size();) {
            if (incHeights.empty() || heights[i] > heights[incHeights.top()]) {
                incHeights.emplace(i++);
            } else {
                int idx = heights[incHeights.top()]; incHeights.pop();
                int len = incHeights.empty() ? i : i - incHeights.top() - 1;
                maxArea = max(maxArea, heights[idx] * len);
            }
        }

        return maxArea;
    }
};

// Time:  O(m * n)
// Space: O(n)
// DP solution.
class Solution2 {
public:
    int maximalRectangle(vector<vector<char> > &matrix) {
        if (matrix.empty()) {
            return 0;
        }

        const int m = matrix.size();
        const int n = matrix[0].size();
        int maxArea = 0;
        vector<int> H(n, 0);  // Height of all ones rectangle include matrix[i][j].
        vector<int> L(n, 0);  // Left closed bound of all ones rectangle include matrix[i][j].
        vector<int> R(n, n);  // Right open bound of all ones rectangle include matrix[i][j].

        for (int i = 0; i < m; ++i) {
            int left = 0, right = n;
            for (int j = 0; j < n; ++j) {
                if (matrix[i][j] == '1') {
                    ++H[j];  // Update height.
                    L[j] = max(L[j], left); // Update left bound.
                } else {
                    left = j + 1;
                    H[j] = L[j] = 0;
                    R[j] = n;
                }
            }

            for (int j = n - 1; j >= 0; --j) {
                if (matrix[i][j] == '1') {
                    R[j] = min(R[j], right);  // Update right bound.
                    maxArea = max(maxArea, H[j] * (R[j] - L[j]));
                } else {
                    right = j;
                }
            }
        }

        return maxArea;
    }
};
