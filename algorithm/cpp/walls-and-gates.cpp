// 286. Walls and Gates
// Difficulty : Medium 

// You are given a m x n 2D grid initialized with these three possible values.

// -1 - A wall or an obstacle.
// 0 - A gate.
// INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 
// to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. 
// If it is impossible to reach a gate, it should be filled with INF.

// For example, given the 2D grid:
// INF  -1  0  INF
// INF INF INF  -1
// INF  -1 INF  -1
//   0  -1 INF INF

// After running your function, the 2D grid should be:
//   3  -1   0   1
//   2   2   1  -1
//   1  -1   2  -1
//   0  -1   3   4

// Time:  O(m * n)
// Space: O(g)

class Solution {
public:
  void wallsAndGates(vector<vector<int>>& rooms) {
    const int INF = INT_MAX;
    queue<pair<int, int>> q;
    for (int i = 0; i < rooms.size(); ++i) {
      for (int j = 0; j < rooms[0].size(); ++j) {
        if (rooms[i][j] == 0) {
          q.emplace(i, j);
        }
      }
    }
    while (!q.empty()) {
      int i, j;
      tie(i, j) = q.front(); q.pop();
      for (auto dir : vector<pair<int, int>>{ {i + 1, j}, {i - 1, j}, {i, j + 1}, {i, j - 1} }) {
        int I = dir.first, J = dir.second;
        if (I >= 0 && I < rooms.size() && J >= 0 && J < rooms[0].size() && rooms[I][J] == INF) {
          rooms[I][J] = rooms[i][j] + 1;
          q.emplace(I, J);
        }
      }
    }
  }
};
