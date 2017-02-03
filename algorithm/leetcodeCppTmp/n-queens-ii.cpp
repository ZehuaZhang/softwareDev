52. N-Queens II
Difficulty: Hard

Follow up for N-Queens problem.

Now, instead outputting board configurations, return the total number of distinct solutions.

// Time Complexity: O(n!)
// Space Complexity: O(n)
class Solutions {
public:
    int totalNQueens(int n) {
    this->columns = vector<bool>(n, false);
    this->diags = vector<bool>(2 * n - 1, false);
    this->diags2 = vector<bool>(2 * n - 1, false);
    int count;
    vector<int> colQ(n, -1); // queens position Row = C[col], Col = col
    totalNQueens(colQ, count, 0);
    return count;
}
private:
    vector<bool> columns;
    vector<bool> diags;
    vector<bool> diags2;
    void totalNQueens(vector<int> &C, int &count, int row) {
        const int N = C.size();
        if (row == N) {
            ++count;
            return
        }
        for (int j = 0; j < N; ++j) {
            if (!columns[j] && !diags[row - j + N - 1] && !diags2[row + j]) {
                C[row] = j;
                columns[j] = diags[row - j + N - 1] = diags2[row + j] = true;
                totalNQueens(C, count, row + 1);
                C[row] = -1;
                columns[j] = diags[row - j + N - 1] = diags2[row + j] = false;
            }
        }
    }
};
