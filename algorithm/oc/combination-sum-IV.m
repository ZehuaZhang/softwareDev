// 377. Combination Sum IV
// Difficulty: Medium

// Given an integer array with all positive numbers and no duplicates,
// find the number of possible combinations that add up to a positive integer target.

// Example:

// nums = [1, 2, 3]
// target = 4

// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)

// Note that different sequences are counted as different combinations.

// Therefore the output is 7.

// Follow up:
// What if negative numbers are allowed in the given array?
// How does it change the problem?
// What limitation we need to add to the question to allow negative numbers?

// Time:  O(nlogn + n * t), t is the value of target.
// Space: O(t)

#import <Foundation/Foundation.h>

int combinationSum4(NSArray* nums, int target) {
  int dp[target + 1];
  dp[0] = 1;
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  for (int i = 1; i <= target; ++i) {
    for (int j = 0; j < sorted.count && [sorted[j] intValue] <= i; ++j) {
      dp[i] += dp[i - [sorted[j] intValue]];
    }
  }
  return dp[target];
}