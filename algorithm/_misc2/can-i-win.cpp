// 464. Can I Win
// Difficulty: Medium

// In the "100 game," two players take turns adding, to a running total, any integer from 1..10.
// The player who first causes the running total to reach or exceed 100 wins.

// What if we change the game so that players cannot re-use integers?

// For example, two players might take turns drawing from a common pool of numbers of 1..15 
// without replacement until they reach a total >= 100.

// Given an integer maxChoosableInteger and another integer desiredTotal,
// determine if the first player to move can force a win, assuming both players play optimally.

// You can always assume that maxChoosableInteger will not be larger than 20 and desiredTotal will not be larger than 300.

// Example

// Input:
// maxChoosableInteger = 10
// desiredTotal = 11

// Output:
// false

// Explanation:
// No matter which integer the first player choose, the first player will lose.
// The first player can choose an integer from 1 up to 10.
// If the first player choose 1, the second player can only choose integers from 2 up to 10.
// The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
// Same with other integers chosen by the first player, the second player will always win.

// Time:  O(n!)
// Space: O(n)

class Solution {
public:
  bool canIWin(int maxChoosableInteger, int desiredTotal) {
    if ((1 + maxChoosableInteger) * (maxChoosableInteger / 2) < desiredTotal) {
      return false;
    }
    unordered_map<int, bool> lookup;
    return canIWinHelper(maxChoosableInteger, desiredTotal, 0, lookup);
  }

private:
  int canIWinHelper(int maxChoosableInteger, int desiredTotal, int visited, unordered_map<int, bool>& lookup) {
    if (lookup.count(visited)) {
      return lookup[visited];
    }
    for (int i = 1, mask = 1; i <= maxChoosableInteger; ++i, mask <<= 1) {
      if (!(visited & mask)) {
        if (i >= desiredTotal || !canIWinHelper(maxChoosableInteger, desiredTotal - i, visited | mask, lookup)) {
          return lookup[visited] = true;
        }
      }
    }
    return lookup[visited] = false;
  }
};