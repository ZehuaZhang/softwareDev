// 279. Perfect Squares
// Difficulty: Medium

// Given a positive integer n, find the least number of perfect square numbers 
// (for example, 1, 4, 9, 16, ...) which sum to n.

// For example, given n = 12, return 3 because 12 = 4 + 4 + 4; given n = 13, return 2 because 13 = 4 + 9.

// Time:  O(n * sqrt(n))
// Space: O(n)

class Solution {
public:
  int numSquares(int n) {
    vector<int> minSquares{0};
    while (minSquares.size() <= n) {
      int squares = INT_MAX;
      for (int i = 1; i * i <= minSquares.size(); ++i) {
        squares = min(squares, minSquares[minSquares.size() - i * i] + 1);
      }
      minSquares.emplace_back(squares);
    }
    return minSquares[n];
  }
};