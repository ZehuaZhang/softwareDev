// 280. Wiggle Sort
// Difficulty: Medium

// Given an unsorted array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

// Example:
// (1) Given nums = [1, 5, 1, 1, 6, 4], one possible answer is [1, 4, 1, 5, 1, 6].
// (2) Given nums = [1, 3, 2, 2, 3, 1], one possible answer is [2, 3, 1, 3, 1, 2].

// Note:
// You may assume all input has valid answer.

// Follow Up:
// Can you do it in O(n) time and/or in-place with O(1) extra space?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

void wiggleSort(NSMutableArray* nums) {
  for (int i = 1; i < nums.count; ++i) {
    if (((i % 2) && [nums[i] isLessThan:nums[i - 1]]) ||
        (!(i % 2) && [nums[i] isGreaterThan:nums[i - 1]])) {
      [nums exchangeObjectAtIndex:i withObjectAtIndex:i - 1];
    }
  }
}
