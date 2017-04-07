// 345. Reverse Vowels of a String
// Difficulty: Easy

// Write a function that takes a string as input and reverse only the vowels of a string.

// Example 1:
// Given s = "hello", return "holle".

// Example 2:
// Given s = "leetcode", return "leotcede".

// Note:
// The vowels does not include the letter "y".

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  string reverseVowels(string s) {
    for (int left = 0, right = s.length() - 1; left < right;) {
      if (!isVowel(tolower(s[left]))) {
        ++left;
      } else if (!isVowel(tolower(s[right]))) {
        --right;
      } else {
        swap(s[left++], s[right--]);
      }
    }
    return s;
  }

private:
  bool isVowel(char a){
    return string("aeiou").find(a) != string::npos;
  }
};
