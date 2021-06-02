// 64. Minimum Path Sum
// Difficulty: Medium

// Given a m x n grid filled with non-negative numbers, 
// find a path from top left to bottom right which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Time : O(m * n)
// Space: O(n)

class Solution {
public:
	int minPathSum(vector<vector<int> > &grid) {
		const int m = grid.size(), n = grid[0].size();
		vector<int> f(n, INT_MAX);
		f[0] = 0;
		for (int i = 0; i < m; i++) {
			f[0] += grid[i][0];
			for (int j = 1; j < n; j++) {
				f[j] = min(f[j - 1], f[j]) + grid[i][j];
			}
		}
		return f[n - 1];
	}
};