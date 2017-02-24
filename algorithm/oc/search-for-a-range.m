// 34. Search for a Range
// Difficulty: Medium

// Given a sorted array of integers, find the starting and ending position of a given target value.

// Your algorithm runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].

// For example,
// Given [5, 7, 7, 8, 8, 10] and target value 8,
// return [3, 4].

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger lower_bound(NSArray* nums, int target) {
  NSInteger left = 0;
  NSInteger right = [nums count] - 1;
  // Find min left s.t. A[left] >= target.
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

NSInteger upper_bound(NSArray* nums, int target) {
  NSInteger left = 0;
  NSInteger right = [nums count] - 1;
  // Find min left s.t. A[left] > target.
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

NSArray* searchRange(NSArray* nums, int target) {
  NSInteger begin = lower_bound(nums, target);
  NSInteger end = upper_bound(nums, target);
  
  if (begin < [nums count] && [nums[begin] integerValue] == target) {
    return @[@(begin), @(end - 1)];
  }
  
  return @[@(-1), @(-1)];
}