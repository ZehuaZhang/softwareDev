// 300. Longest Increasing Subsequence
// Difficulty: Medium

// Given an unsorted array of integers, find the length of longest increasing subsequence.

// For example,
// Given [10, 9, 2, 5, 3, 7, 101, 18],
// The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.
// Note that there may be more than one LIS combination, it is only necessary for you to return the length.

// Your algorithm should run in O(n2) complexity.

// Follow up: Could you improve it to O(n log n) time complexity?

// Time:  O(nlogn)
// Space: O(n)

// Binary search solution with STL.

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

NSInteger lengthOfLIS(NSArray* nums) {
  NSMutableArray* lis = @[].mutableCopy;
  
  for (id num in nums) {
    NSInteger i = lower_bound(lis, [num intValue]);
  
    if (i == lis.count) {
      lis addObject:num];
    } else {
      lis[i] = num;
    }
  }
  return lis.count;
}