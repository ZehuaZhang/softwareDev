// 52. N-Queens II
// Difficulty: Hard

// Follow up for N-Queens problem.

// Now, instead outputting board configurations, return the total number of distinct solutions.

// Time : O(n!)
// Space: O(n)

class Solutions {
public:
  int totalNQueens(int n) {
    this->columns = vector<bool>(n, false);
    this->diags = vector<bool>(2 * n - 1, false);
    this->diags2 = vector<bool>(2 * n - 1, false);
    int count;
    vector<int> colQ(n, -1);
    totalNQueens(colQ, count, 0);
    return count;
  }
private:
  vector<bool> columns;
  vector<bool> diags;
  vector<bool> diags2;
  void totalNQueens(vector<int>& colQ, int& count, int row) {
    const int N = colQ.size();
    if (row == N) {
      ++count;
      return;
    }
    for (int j = 0; j < N; ++j) {
      if (!columns[j] && !diags[row - j + N - 1] && !diags2[row + j]) {
        colQ[row] = j;
        columns[j] = diags[row - j + N - 1] = diags2[row + j] = true;
        totalNQueens(colQ, count, row + 1);
        colQ[row] = -1;
        columns[j] = diags[row - j + N - 1] = diags2[row + j] = false;
      }
    }
  }
};
