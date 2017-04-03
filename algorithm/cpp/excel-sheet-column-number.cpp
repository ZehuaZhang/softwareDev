// 171. Excel Sheet Column Number
// Difficulty: Easy

// Related to question Excel Sheet Column Title

// Given a column title as appear in an Excel sheet, return its corresponding column number.

// For example:

//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28 

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int titleToNumber(string s) {
    int number = 0;
    for (auto c : s) {
      number = number * 26 + c  - 'A' + 1;
    }
    return number;
  }
};
