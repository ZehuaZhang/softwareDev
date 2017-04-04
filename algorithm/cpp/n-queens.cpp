// 51. N-Queens
// Difficulty: Hard

// The n-queens puzzle is the problem of placing n queens on an n×n chessboard 
// such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle.

// Each solution contains a distinct board configuration of the n-queens placement, 
// where 'Q' and '.' both indicate a queen and an empty space respectively.

// For example,
// There exist two distinct solutions to the 4-queens puzzle:

// [
//  [".Q..",  // Solution 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // Solution 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]

// Time : O(n!)
// Space: O(n)

class Solutions {
public:
  vector<vector<string> > solveNQueens(int n) {
    this->columns = vector<bool>(n, false);
    this->diags = vector<bool>(2 * n - 1, false);
    this->diags2 = vector<bool>(2 * n - 1, false);
    vector<vector<string>> result;
    vector<int> colQ(n, -1);
    solveNQueens(colQ, result, 0);
    return result;
  }
private:
  vector<bool> columns;
  vector<bool> diags;
  vector<bool> diags2;
  void solveNQueens(vector<int>& colQ, vector<vector<string>>& result, int row) {
    const int N = colQ.size();
    if (row == N) {
      vector<string> solution;
      for (int i = 0; i < N; ++i) {
        string rowS(N, '.');
        for (int j = 0; j < N; ++j) {
          if (j == colQ[i]) {
            rowS[j] = 'Q';
          }
        }
        solution.push_back(rowS);
      }
      result.push_back(solution);
      return;
    }
    for (int j = 0; j < N; ++j) {
      if (!columns[j] && !diags[row - j + N - 1] && !diags2[row + j]) {
        colQ[row] = j;
        columns[j] = diags[row - j + N - 1] = diags2[row + j] = true;
        solveNQueens(colQ, result, row + 1);
        colQ[row] = -1;
        columns[j] = diags[row - j + N - 1] = diags2[row + j] = false;
      }
    }
  }
};