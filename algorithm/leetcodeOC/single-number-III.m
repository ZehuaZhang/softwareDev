// 260. Single Number III
// Difficulty: Medium
// Given an array of numbers nums, in which exactly two elements appear only once
// and all the other elements appear exactly twice. Find the two elements that appear only once.

// For example:

// Given nums = [1, 2, 1, 3, 2, 5], return [3, 5].

// Note:
// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* singleNumber(NSArray* nums) {
  // Xor all the elements to get x ^ y.
  int xXorY = 0;
  for (id num in nums) {
    xXorY ^= [num intValue];
  }
  // Get the last bit where 1 occurs.
  const int bit = xXorY & (-xXorY);
  // Get the subset of A where each number has the bit.
  // The subset only contains one of the two unique integers(since this bit is from xor of all numbers).
  // Xor all the elements in the subset to get it.
  int x = 0;
  for (id num in nums) {
    if ([num intValue] & bit) {
      x ^= [num intValue];
    }
  }
  return @[@(x), @(xXorY ^ x)];
}
