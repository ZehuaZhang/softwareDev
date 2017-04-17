// 317. Shortest Distance from All Buildings
// Difficulty : Hard 

// You want to build a house on an empty land which reaches all buildings in the shortest amount of distance. 
// You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:

// Each 0 marks an empty land which you can pass by freely.
// Each 1 marks a building which you cannot pass through.
// Each 2 marks an obstacle which you cannot pass through.

// For example, given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2):
// 1 - 0 - 2 - 0 - 1
// |   |   |   |   |
// 0 - 0 - 0 - 0 - 0
// |   |   |   |   |
// 0 - 0 - 1 - 0 - 0

// The point (1,2) is an ideal empty land to build a house, 
// as the total travel distance of 3+3+1=7 is minimal. 
// So return 7.

// Note:
// There will be at least one building. 
// If it is not possible to build such house according to the above rules, return -1.

// Time:  O(k * m * n), k is the number of the buildings
// Space: O(m * n)

class Solution {
public:
  int shortestDistance(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), cnt = 0;
    vector<vector<int>> dists(m, vector<int>(n)), cnts(m, vector<int>(n));
    for (int i = 0; i < m; ++i) {
      for (int j = 0; j < n; ++j) {
        if (grid[i][j] == 1) {
          ++cnt;
          BFS(grid, i, j, dists, cnts);
        }
      }
    }

    int shortest = INT_MAX;
    for (int i = 0; i < m; ++i) {
      for (int j = 0; j < n; ++j) {
        if (dists[i][j] < shortest && cnts[i][j] == cnt) {
          shortest = dists[i][j];
        }
      }
    }

    return shortest != INT_MAX ? shortest : -1;
  }

  void BFS(const vector<vector<int>>& grid, int x, int y, vector<vector<int>>& dists, vector<vector<int>>& cnts) {
    int dist = 0, m = grid.size(), n = grid[0].size();
    vector<vector<bool>> visited(m, vector<bool>(n));

    queue<pair<int, int>> q({x, y});
    visited[x][y] = true;
    while (!q.empty()) {
      ++dist;
      int size = q.size();
      while (size--) {
        pair<int, int> point = q.front(); q.pop();

        for (auto dir : vector<pair<int, int>>{ {1, 0}, {-1, 0}, {0, 1}, {0, -1} }) {
          const int I = point.first + dir.first, J = point.second + dir.second;
          if (0 <= I && I < m && 0 <= J && J < n && grid[I][J] == 0 && !visited[I][J]) {
            dists[I][J] += dist;
            ++cnts[I][J];
            q.push({I, J});
            visited[I][J] = true;
          }
        }
      }
    }
  }
};
