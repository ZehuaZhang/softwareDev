// 198. House Robber
// Difficulty: Easy

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed,
// the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and
// it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given a list of non-negative integers representing the amount of money of each house,
// determine the maximum amount of money you can rob tonight without alerting the police.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

// DP
int rob(NSArray* num) {
  if ([num count] <= 1) {
    return ![num count] ? 0 : [num[0] intValue];
  }
  NSMutableArray* dp = @[num[0], @(MAX([num[0] intValue], [num[1] intValue]))].mutableCopy;
  for (int i = 2; i < [num count]; ++i) {
    [dp addObject:@(MAX([num[i] intValue] + [dp[i - 2] intValue], [dp[i - 1] intValue]))];
  }
  return [[dp lastObject] intValue];
}