// 85. Maximal Rectangle
// Difficulty: Hard

// Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1 and return its area.

// For example, given the following matrix:

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0
// Return 6.

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
                int idx = incHeights.top(); incHeights.pop();
                int len = incHeights.empty() ? i : i - incHeights.top() - 1;
                maxArea = max(maxArea, heights[idx] * len);
            }
        }

        return maxArea;
    }
};
