// 368. Largest Divisible Subset
// Difficulty: Medium

// Given a set of distinct positive integers, find the largest subset such that every pair (Si, Sj) of elements
// in this subset satisfies: Si % Sj = 0 or Sj % Si = 0.

// If there are multiple solutions, return any subset is fine.

// Example 1:

// nums: [1,2,3]

// Result: [1,2] (of course, [1,3] will also be ok)
// Example 2:

// nums: [1,2,4,8]

// Result: [1,2,4,8]

// Time:  O(n^2)
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* largestDivisibleSubset(NSMutableArray* nums) {
  if (!nums.count) {
    return @[];
  }
  [nums sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  
  // dp[i]: the size of the largest distinct subset of
  //        the first i + 1 numbers including nums[i]
  NSMutableArray* dp = @[].mutableCopy;
  NSMutableArray* prev = @[].mutableCopy;
  for (int i = 0; i < nums.count; i++) {
    dp[i] = @1;
    prev[i] = @(-1);
  }
  int maxIdx = 0;
  
  for (int i = 0; i < nums.count; ++i) {
    for (int j = 0; j < i; ++j) {
      if ([nums[i] intValue] % [nums[j] intValue] == 0) {
        if ([dp[i] intValue] < [dp[j] intValue] + 1) {
          dp[i] = @([dp[j] intValue] + 1);
          prev[i] = @(j);
        }
      }
    }
    if ([dp[maxIdx] intValue] < [dp[i] intValue]) {
      maxIdx = i;
    }
  }
  NSMutableArray* result = @[].mutableCopy;
  for (int i = maxIdx; i != -1; i = [prev[i] intValue]) {
    [result addObject:nums[i]];
  }
  return [[result reverseObjectEnumerator] allObjects];
}