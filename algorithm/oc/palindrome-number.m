// 9. Palindrome Number
// Difficulty: Easy

// Determine whether an integer is a palindrome. Do this without extra space.

// Hint:
// Could negative integers be palindromes? (ie, -1)

// If you are thinking of converting the integer to string, note the restriction of using extra space.

// You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?

// There is a more generic way of solving this problem.

// Time:  O(logx) = O(1)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isPalindrome(NSInteger x) {
  if (x < 0) {
    return NO;
  }
  NSInteger curX = x;
  NSInteger reversed = 0;
  while (curX) {
    reversed = reversed * 10 + curX % 10;
    curX /= 10;
  }
  return reversed == x;
}