// 266. Palindrome Permutation
// Difficulty : Easy

// Given a string, determine if a permutation of the string could form a palindrome.

// For example,
// "code" -> False, "aab" -> True, "carerac" -> True.

// Hint:
// Consider the palindromes of odd vs even length. What difference do you notice?
// Count the frequency of each character.
// If each character occurs even number of times, then it must be a palindrome. How about character which occurs odd number of times?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool canPermutePalindrome(string s) {
    bitset<256> bits;
    for (auto c : s) {
      bits.flip(c);
    }
    return bits.count() < 2;
  }
};
