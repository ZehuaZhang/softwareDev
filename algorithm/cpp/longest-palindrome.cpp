// 409. Longest Palindrome
// Difficulty: Easy

// Given a string which consists of lowercase or uppercase letters,
// find the length of the longest palindromes that can be built with those letters.

// This is case sensitive, for example "Aa" is not considered a palindrome here.

// Note:
// Assume the length of given string will not exceed 1,010.

// Example:

// Input:
// "abccccdd"

// Output:
// 7

// Explanation:
// One longest palindrome that can be built is "dccaccd", whose length is 7.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int longestPalindrome(string s) {
    int odds = 0;
    for (auto c = 'A'; c <= 'z'; ++c) {
      odds += count(s.cbegin(), s.cend(), c) & 1;
    }
    return s.length() - odds + (odds > 0);
  }
};