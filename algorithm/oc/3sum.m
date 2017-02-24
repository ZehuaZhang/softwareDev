// 15. 3Sum
// Difficulty: Medium
// Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0?
// Find all unique triplets in the array which gives the sum of zero.

// Note: The solution set must not contain duplicate triplets.

// For example, given array S = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// Time:  O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* threeSum(NSArray* nums) {
  NSMutableArray* result = @[].mutableCopy;
  NSArray* sorted = [nums sortedArrayUsingComparator:
                          ^NSComparisonResult(id obj1, id obj2){
                            return [obj1 compare:obj2];
                          }];
  NSInteger target = 0;
  
  for (NSInteger i = 0; i < [sorted count] - 2; ++i) {
    if (i == 0 || [sorted[i] integerValue] != [sorted[i - 1] integerValue]) {
      for (NSInteger j = i + 1, k = [sorted count] - 1; j < k; ) {
        if (j - 1 > i && sorted[j] == sorted[j - 1]) {
          ++j;
        } else if (k + 1 < [sorted count] && [sorted[k] integerValue]== [sorted[k + 1] integerValue]) {
          --k;
        } else {
          NSInteger sum = [sorted[i] integerValue] + [sorted[j] integerValue] + [sorted[k] integerValue];
          if (sum > target) {
            --k;
          } else if (sum < target) {
            ++j;
          } else {
            [result addObject:@[sorted[i], sorted[j], sorted[k]]];
            ++j;
            --k;
          }
        }
      }
    }
  }
  
  return result;
}
