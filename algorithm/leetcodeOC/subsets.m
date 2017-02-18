// 78. Subsets
// Difficulty: Medium

// Given a set of distinct integers, nums, return all possible subsets.

// Note: The solution set must not contain duplicate subsets.

// For example,
// If nums = [1,2,3], a solution is:

// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

// Time: O(n * 2^n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* subsets(NSArray* nums) {
  NSMutableArray* result = @[@[].mutableCopy].mutableCopy;
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  
  for (int i = 0; i < [sorted count]; ++i) {
    const NSInteger size = [result count];
    
    for (NSInteger j = 0; j < size; ++j) {
      [result addObject:[result[j] mutableCopy]];
      [[result lastObject] addObject:nums[i]];
    }
  }
  return result;
}
