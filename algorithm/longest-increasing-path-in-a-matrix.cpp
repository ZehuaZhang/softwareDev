// Time:  O(m * n)
// Space: O(m * n)

// DFS + Memorization solution.
class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty()) {
            return 0;
        }

        int result = 0;
        vector<vector<int>> maxLengths(matrix.size(), vector<int>(matrix[0].size()));
        for (int i = 0; i < matrix.size(); ++i) {
            for (int j = 0; j < matrix[0].size(); ++j) {
                result = max(result, longestpath(matrix, i, j, maxLengths));
            }
        }
    
        return result;
    }

private:
    int longestpath(const vector<vector<int>>& matrix, const int i, const int j,
                    vector<vector<int>> &maxLengths) {
        if (maxLengths[i][j] > 0) {
            return maxLengths[i][j];
        }
    
        int maxDepth = 1;
        for (auto pos : vector<pair<int, int>> {{i, j - 1}, {i, j + 1},
                                                {i - 1, j}, {i + 1, j}}) {
            const int x = pos.first, y = pos.second;
            if (x >= 0 && x < matrix.size() &&
                y >= 0 && y < matrix[0].size() &&
                matrix[x][y] > matrix[i][j]) {
                maxDepth = max(maxDepth, longestpath(matrix, x, y, maxLengths) + 1);
            }
        }
        return maxLengths[i][j] = maxDepth;
    }
};
