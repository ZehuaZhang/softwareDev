// 7. Reverse Integer
// Difficulty: Easy

// Reverse digits of an integer.

// Example1: x = 123, return 321
// Example2: x = -123, return -321

// Have you thought about this?
// Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!

// If the integer last digit is 0, what should the output be? ie, cases such as 10, 100.

// Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, 
// then the reverse of 1000000003 overflows. How should you handle such cases?

// For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

// Time:  O(logn) = O(1)
// Space: O(1)

class Solution {
public:
  int reverse(int x) {
    int result = 0;
    for (; x; x /= 10) {
      auto prev = result;
      result = result * 10 + x % 10;
      if (result / 10 != prev) {
        return 0;
      }
    }
    return result;
  }
};
