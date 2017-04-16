// 407. Trapping Rain Water
// Difficulty: Hard

// Given an m x n matrix of positive integers representing the height of each unit cell in a 2D elevation map,
// compute the volume of water it is able to trap after raining.

// Note:
// Both m and n are less than 110. The height of each unit cell is greater than 0 and is less than 20,000.

// Example:

// Given the following 3x6 height map:
// [
//   [1,4,3,1,3,2],
//   [3,2,1,3,2,4],
//   [2,3,3,2,3,1]
//   ]

// Return 4.

// Time:  O(m * n * log(m + n)) ~ O(m * n * log(m * n))
// Space: O(m * n)

class Solution {
public:
  int trapRainWater(vector<vector<int>>& heightMap) {
    int m = heightMap.size(), n = heightMap[0].size();

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    
    for (int i = 0; i < m; ++i) {
      for (int j = 0; j < n; ++j) {
        if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
          q.push({heightMap[i][j], i * n + j});
          visited[i][j] = true;
        }
      }
    }
    int res = 0, level = INT_MIN;
    while (!q.empty()) {
      auto top = q.top(); q.pop();
      int height = top.first, i = top.second / n, j = top.second % n;
      level = max(level, height);
      for (auto dir : vector<vector<int>>{ {0, -1}, {-1, 0}, {0, 1}, {1, 0} }) {
        int x = i + dir.first, y = j + dir.second;
        if (x >= 0 && x < m && y >= 0 && y < n && !visited[x][y]) {
         
          if (heightMap[x][y] < level) {
            res += level - heightMap[x][y];
          }
          visited[x][y] = true;
          q.push({heightMap[x][y], x * n + y});
        }
      }
    }
    return res;
  }
};