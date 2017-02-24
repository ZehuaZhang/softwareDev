// 231. Power of Two
// Difficulty: Easy
// Given an integer, write a function to determine if it is a power of two.

// Time:  O(1)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isPowerOfTwo(int n) {
  return n > 0 && (n & (n - 1)) == 0;	// check there's no 2nd lsb set, n & (n - 1) <=> n & (~-n)
}