// 326. Power of Three
// Difficulty: Easy

// Given an integer, write a function to determine if it is a power of three.

// Follow up:
// Could you do it without using any loop / recursion?

// Time:  O(1)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isPowerOfThree(int n) {
  int maxLog3 = log(INT_MAX) / log(3);	// log3(INT_MAX);
  int maxPow3 = pow(3, maxLog3);
  
  return n > 0 && maxPow3 % n == 0;
}