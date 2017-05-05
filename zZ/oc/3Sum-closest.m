// 16. 3Sum Closest
// Difficulty: Medium
// Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target.
// Return the sum of the three integers. You may assume that each input would have exactly one solution.

// For example, given array S = {-1 2 1 -4}, and target = 1.

// The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

// Time:  O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger threeSumClosest(NSArray* nums, int target) {
  NSInteger ans = INT_MAX;
  NSInteger minDiff = INT_MAX;
  
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id obj1, id obj2) {
    return [obj1 compare:obj2];
  }];
  
  for (NSInteger i = 0; i < [sorted count] - 2; ++i) {
    for (NSInteger j = i + 1, k = [sorted count] - 1; j < k;) {
      NSInteger sum = [sorted[i] integerValue] + [sorted[j] integerValue] + [sorted[k] integerValue];
      
      if (sum > target) {
        --k;
      } else if (sum < target) {
        ++j;
      } else {
        return target;
      }
      
      if (labs(sum - target) < minDiff) {
        minDiff = labs(sum - target);
        ans = sum;
      }
    }
  }
  return ans;
}
