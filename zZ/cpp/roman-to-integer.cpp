// 13. Roman to Integer
// Difficulty: Easy

// Given a roman numeral, convert it to an integer.

// Input is guaranteed to be within the range from 1 to 3999.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int romanToInt(string s) {
    unordered_map<char, int> roman2int = {{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
                                          {'C', 100}, {'D', 500}, {'M', 1000}};
    int decimal = 0;
    for (int i = 0; i < s.length(); ++i) {
      decimal += roman2int[s[i]];
      if (i > 0 && roman2int[s[i]] > roman2int[s[i - 1]]) {
        decimal -= 2 * roman2int[s[i - 1]];
      }
    }
    return decimal;
  }
};
