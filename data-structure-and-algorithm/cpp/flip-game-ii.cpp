// 294. Flip Game II
// Difficulty : Medium 

// You are playing the following Flip Game with your friend: 
// Given a string that contains only these two characters: + and -, 
// you and your friend take turns to flip twoconsecutive "++" into "--". 
// The game ends when a person can no longer make a move and therefore the other person will be the winner.

// Write a function to determine if the starting player can guarantee a win.

// For example, given s = "++++", return true. The starting player can guarantee a win 
// by flipping the middle "++" to become "+--+".

// Follow up:
// Derive your algorithm runtime complexity.

// Time:  O(2^c), c is max length of consecutive '+'
// Space: O(c)

class Solution {
public:
  bool canWin(string s) {
    for (int i = 1; i < s.size(); ++i) {
      if (s[i] == '+' && s[i - 1] == '+' && !canWin(s.substr(0, i - 1) + "--" + s.substr(i + 1))) {
        return true;
      }
    }
    return false;
  }
};

// Time:  O(n + c^2), c is max length of consecutive '+'
// Space: O(c)

// The best theory solution (DP, O(n + c^2)) could be seen here:
// https://leetcode.com/discuss/64344/theory-matters-from-backtracking-128ms-to-dp-0ms
class Solution2 {
public:
  bool canWin(string s) {
    replace(s.begin(), s.end(), '-', ' ');
    istringstream in(s);
    int g_final = 0;
    vector<int> g;  // Sprague-Grundy function of 0 ~ maxlen, O(n) space
    for (string t; in >> t; ) {  // Split the string
      int p = t.size();
      while (g.size() <= p) {  // O(c) time
        string x{t};
        int i = 0, j = g.size() - 2;
        while (i <= j) {  // The S-G value of all subgame states, O(c) time
            // Theorem 2: g[game] = g[subgame1]^g[subgame2]^g[subgame3]...;
          x[g[i++] ^ g[j--]] = '-';
        }
        // Find first missing number.
        g.emplace_back(x.find('+'));
      }
      g_final ^= g[p];
    }
    return g_final;  // Theorem 1: First player must win iff g(current_state) != 0
  }
};