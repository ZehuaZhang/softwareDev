
// Time:  O(m * n)
// Space: O(1)

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        if (matrix.empty()) {
            return;
        }

        bool hasZero = false;
        int firstRowZero = -1, firstColZero = -1;

        for (int i = 0; i < matrix.size(); ++i) {
            for (int j = 0; j < matrix[0].size(); ++j) {
                if (matrix[i][j] == 0) {
                    if (!hasZero) {
                        firstRowZero = i;
                        firstColZero = j;
                        hasZero = true;
                    }
                    // cast shadows of every zero element, onto 1st found-zero col & row
                    matrix[firstRowZero][j] = 0;
                    matrix[i][firstColZero] = 0;
                }
            }
        }

        if (hasZero) {
            // process shadows
            for (int i = 0; i < matrix.size(); ++i) {
                if (i == firstRowZero) {
                    continue;
                }
                for (int j = 0; j < matrix[0].size(); ++j) {
                    if (j == firstColZero) {
                        continue;
                    }
                    if (matrix[firstRowZero][j] == 0 || matrix[i][firstColZero] == 0) {
                        matrix[i][j] = 0;
                    }
                }
            }
            // process 1st found-zero col
            for (int i = 0; i < matrix.size(); ++i) {
                matrix[i][firstColZero] = 0;
            }
            // process 1st found-zero row
            for (int j = 0; j < matrix[0].size(); ++j) {
                matrix[firstRowZero][j] = 0;
            }
        }
    }
};
