//153. Find Minimum in Rotated Sorted Array
//Difficulty: Medium
//
//Suppose a sorted array is rotated at some pivot unknown to you beforehand.
//
//(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
//
//Find the minimum element.
//
//You may assume no duplicate exists in the array.

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger findMin(NSArray* nums) {
  NSInteger left = 0;
  NSInteger right = [nums count] - 1;
  
  while (left < right && [nums[left] integerValue] >= [nums[right] integerValue]) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] < [nums[left] integerValue]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return [nums[left] integerValue];
}