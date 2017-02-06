// 35. Search Insert Position
// Difficulty: Medium

// Given a sorted array and a target value, return the index if the target is found.
// If not, return the index where it would be if it were inserted in order.

// You may assume no duplicates in the array.

// Here are few examples.
// [1,3,5,6], 5 → 2
// [1,3,5,6], 2 → 1
// [1,3,5,6], 7 → 4
// [1,3,5,6], 0 → 0

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger searchInsert(NSArray* nums, NSInteger target) {
  NSInteger left = 0;
  NSInteger right = [nums count] - 1;
  
  while (left <= right) {
    NSInteger mid = left + (right -left) / 2;
    if ([nums[mid] integerValue] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return left;
}