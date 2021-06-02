// Maximum Job Match

// M Applicant for N Jobs, Find maximum matching

// e.x.
// [M][N] =  0, 1, 1, 0, 0, 0
//           1, 0, 0, 1, 0, 0
//           0, 0, 1, 0, 0, 0
//           0, 0, 1, 1, 0, 0
//           0, 0, 0, 0, 0, 0
//           0, 0, 0, 0, 0, 1


class Solution {
public:
// Returns maximum number of matching from M to N
  int maxJobMatch(vector<vector<int>> applications) {
    const int m = applications.size(), n = applications[0].size();
    vector<int> filled(n, -1);

    int result = 0;
    for (int i = 0; i < M; ++i) {
      vector<bool> visited(n, false);
      if (maxJobMatch(applications, i, visited, filled)) {
        ++result;
      }
    }
    return result;
  }

private:
  bool maxJobMatch(const vector<vector<int>>& applications, int i, vector<bool>& visited, vector<int>& filled) {
    const int n = applications[0].size();
    for (int j = 0; j < n; ++j) {
      if (applications[i][j] && !visited[j]) {
        visited[j] = true;
        if (filled[j] < 0 || maxJobMatch(applications, filled[j], visited, filled)) {
          filled[j] = i;
          return true;
        }
      }
    }
    return false;
  }
};