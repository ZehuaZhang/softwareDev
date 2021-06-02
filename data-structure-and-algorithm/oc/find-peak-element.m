// 162. Find Peak Element
// Difficulty: Medium

// A peak element is an element that is greater than its neighbors.

// Given an input array where num[i] ≠ num[i+1], find a peak element and return its index.

// The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

// You may imagine that num[-1] = num[n] = -∞.

// For example, in array [1, 2, 3, 1], 3 is a peak element and your function should return the index number 2.

// click to show spoilers.

// Note:
// Your solution should be in logarithmic complexity.

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger findPeakElement(NSArray* nums) {
  NSInteger left = 0, right = [nums count] - 1;
  
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ((mid == 0 || [nums[mid - 1] intValue] < [nums[mid] intValue]) &&
        (mid == [nums count] - 1 || [nums[mid] intValue] > [nums[mid + 1] intValue])) {
      return mid;
    } else if (!(mid == 0 || [nums[mid - 1] intValue] < [nums[mid] intValue])) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return left;
}
