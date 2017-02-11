// 137. Single Number II
// Difficulty: Medium
// Given an array of integers, every element appears three times except for one. Find that single one.

// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int singleNumber(NSArray* nums) {
  int one = 0, two = 0, three = 0;
  
  for (id num in nums) {
    two |= (one & [num intValue]);
    one ^= [num intValue];
    three = ~(one & two);
    one &= three;
    two &= three;
  }
  
  return one;
}