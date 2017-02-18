// 33. Search in Rotated Sorted Array
// Difficulty: Medium

// Suppose a sorted array is rotated at some pivot unknown to you beforehand.

// (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger search(NSArray* nums, NSInteger target) {
  NSInteger left = 0, right = [nums count] - 1;
  
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] == target) {
      return mid;
    } else if (([nums[mid] integerValue] >= [nums[left] integerValue] && [nums[left] integerValue] <= target && target < [nums[mid] integerValue]) ||
               ([nums[mid] integerValue] < [nums[left] integerValue] && !([nums[mid] integerValue] < target && target <= [nums[right] integerValue]))) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}