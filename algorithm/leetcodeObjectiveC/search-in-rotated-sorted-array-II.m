// 81. Search in Rotated Sorted Array II
// Difficulty: Medium

// Follow up for "Search in Rotated Sorted Array":
// What if duplicates are allowed?

// Would this affect the run-time complexity? How and why?

// Write a function to determine if a given target is in the array.

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger search(NSArray* nums, NSInteger target) {
  NSInteger left = 0, right = [nums count] - 1;
  
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] == target) {
      return mid;
    } else if ([nums[mid] integerValue] == [nums[left] integerValue]) {
      ++left;
    } else if (([nums[mid] integerValue] > [nums[left] integerValue] && [nums[left] integerValue] <= target && target < [nums[mid] integerValue]) ||
               ([nums[mid] integerValue] < [nums[left] integerValue] && !([nums[mid] integerValue] < target && target <= [nums[right] integerValue]))) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}