// 351. Android Unlock Patterns
// Difficulty : Medium 

// Given an Android 3x3 key lock screen and two integers m and n, where 1 ≤ m ≤ n ≤ 9, 
// count the total number of unlock patterns of the Android lock screen, which consist of minimum of m keys and maximum n keys.

// Rules for a valid pattern:

// Each pattern must connect at least m keys and at most n keys.
// All the keys must be distinct.
// If the line connecting two consecutive keys in the pattern passes through any other keys, 
// the other keys must have previously selected in the pattern. No jumps through non selected key is allowed.
// The order of keys used matters.

// Explanation:

// | 1 | 2 | 3 |
// | 4 | 5 | 6 |
// | 7 | 8 | 9 |

// Invalid move: 4 - 1 - 3 - 6 
// Line 1 - 3 passes through key 2 which had not been selected in the pattern.

// Invalid move: 4 - 1 - 9 - 2
// Line 1 - 9 passes through key 5 which had not been selected in the pattern.

// Valid move: 2 - 4 - 1 - 3 - 6
// Line 1 - 3 is valid because it passes through key 2, which had been selected in the pattern

// Valid move: 6 - 5 - 4 - 1 - 9 - 2
// Line 1 - 9 is valid because it passes through key 5, which had been selected in the pattern.

// Example:
// Given m = 1, n = 1, return 9.

// Time:  O(1)
// Space: O(1)

class Solution {
public:
  int numberOfPatterns(int m, int n) {
    return count(m, n, 0, 1, 1);
  }

private:
  int count(int m, int n, int used, int i1, int j1) {
    if (n == 0) {
      return 1;
    }
    int result = m <= 0;

    for (int i2 = 0; i2 < 3; ++i2) {
      for (int j2 = 0; j2 < 3; ++j2) {
        int I = i1 + i2, J = j1 + j2, used2 = used | (1 << (i2 * 3 + j2));
        // added new, median doesn't exist, or median has added
        if (used2 > used && (I % 2 || J % 2 || used2 & (1 << (I / 2 * 3 + J / 2)))) {
          result += count(m - 1, n - 1, used2, i2, j2);
        }
      }
    }
    return result;
  }
};