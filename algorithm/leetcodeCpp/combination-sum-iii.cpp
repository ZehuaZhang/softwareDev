// 216. Combination Sum III
// Difficulty: Medium

// Find all possible combinations of k numbers that add up to a number n, 
// given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.


// Example 1:
// Input: k = 3, n = 7

// Output:
// [[1,2,4]]

// Example 2:
// Input: k = 3, n = 9

// Output:
// [[1,2,6], [1,3,5], [2,3,4]]

// Time:  O(k * C(n, k))
// Space: O(k)

class Solution {
public:
    vector<vector<int> > combinationSum3(int k, int n) {
        vector<vector<int> > res;
        vector<int> out;
        combinationSum3DFS(k, n, 1, out, res);
        return res;
    }
    void combinationSum3DFS(int k, int n, int level, vector<int> &out, vector<vector<int> > &res) {
        if (n < 0) {
            return;
        }
        if (n == 0 && out.size() == k) {
            res.push_back(out);
        }
        for (int i = level; i <= 9; ++i) {
            out.push_back(i);
            combinationSum3DFS(k, n - i, i + 1, out, res);
            out.pop_back();
        }
    }
};