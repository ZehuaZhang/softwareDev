// 213. House Robber II
// Difficulty: Medium

// Note: This is an extension of House Robber.

// After robbing those houses on that street, the thief has found himself a new place for his thievery
// so that he will not get too much attention. This time, all houses at this place are arranged in a circle.
// That means the first house is the neighbor of the last one.
// Meanwhile, the security system for these houses remain the same as for those in the previous street.

// Given a list of non-negative integers representing the amount of money of each house,
// determine the maximum amount of money you can rob tonight without alerting the police.


// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int robRange(NSArray* nums, NSInteger start, NSInteger end) {
  int curr = [nums[start] intValue], prev = 0, prevPrev = 0;
  for (NSInteger i = start + 1; i < end; ++i) {
    prevPrev = prev;
    prev = curr;
    curr = MAX([nums[i] intValue] + prevPrev, prev);
  }
  return curr;
}

int rob(NSArray* nums) {
  if ([nums count] <= 1) {
    return [nums count] ? [nums[0] intValue] : 0;
  }
  
  return MAX(robRange(nums, 0, [nums count] - 1), // Include the first one of nums without the last one.
             robRange(nums, 1, [nums count]));    // Include the last one of nums without the first one.
}


