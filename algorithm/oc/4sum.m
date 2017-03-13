// 18. 4Sum
// Difficulty: Medium
// Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?
// Find all unique quadruplets in the array which gives the sum of target.

// Note: The solution set must not contain duplicate quadruplets.

// For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.

// A solution set is:
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

// Time:  O(n^3)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* fourSum(NSArray* nums, int target) {
  NSMutableArray *result;
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  obj1, id  obj2) {
    return [obj1 compare:obj2];
  }];
  
  for (NSInteger i = 0; i < [sorted count] - 3; ++i) {
    if (i == 0 || [sorted[i] integerValue] != [sorted[i - 1] integerValue]) {
      for (NSInteger j = i + 1; j < [sorted count] - 2; ++j) {
        if (j == i + 1 || [sorted[j] integerValue] != [sorted[j - 1] integerValue]) {
          NSInteger sum = target - [sorted[i] integerValue] - [sorted[j] integerValue];
          for (NSInteger left = j + 1, right = [sorted count] - 1; left < right;) {
            
            if (left - 1 > j && [sorted[left] integerValue] == [sorted[left - 1] integerValue]) {
              left++;
            } else if (right + 1 < [sorted count] && [sorted[right] integerValue] == [sorted[right + 1] integerValue]) {
              right--;
            } else {
              if ([sorted[left] integerValue]+ [sorted[right] integerValue] == sum) {
                [result addObject:@[sorted[i], sorted[j], sorted[left], sorted[right]]];
                ++left;
                --right;
              } else if ([sorted[left] integerValue] + [sorted[right] integerValue] > sum) {
                --right;
              } else {
                  ++left;
              }
            }
          }
        }
      }
    }
  }
  return result;
}