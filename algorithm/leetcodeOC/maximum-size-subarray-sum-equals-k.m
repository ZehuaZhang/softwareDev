// 325. Maximum Size Subarray Sum Equals k
// Difficulty : Easy

// Given an array nums and a target value k, find the maximum length of a subarray that sums to k. If there isnt one, return 0 instead.

// Example 1:
// Given nums = [1, -1, 5, -2, 3], k = 3,
// return 4. (because the subarray [1, -1, 5, -2] sums to 3 and is the longest)

// Example 2:
// Given nums = [-2, -1, 2, 1], k = 1,
// return 2. (because the subarray [-1, 2] sums to 1 and is the longest)

// Follow Up:
// Can you do it in O(n) time?

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

int maxSubArrayLen(NSArray* nums, int k) {
  NSMutableDictionary* sums = @{}.mutableCopy;
  int sum = 0, maxLen = 0;
  for (int i = 0; i < nums.count; ++i) {
    sum += [nums[i] intValue];
    if (sum == k) {
      maxLen = i + 1;
    } else if (sums[@(sum - k)]) {
      maxLen = MAX(maxLen, i - [sums[@(sum - k)] intValue]);
    }
    if (!sums[@(sum)]) {
      sums[@(sum)] = @(i);  // Only keep the smallest index.
    }
  }
  return maxLen;
}