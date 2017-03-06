// 90. Subsets II
// Difficulty: Medium

// Given a collection of integers that might contain duplicates, nums, return all possible subsets.

// Note: The solution set must not contain duplicate subsets.

// For example,
// If nums = [1,2,2], a solution is:

// [
//   [2],
//   [1],
//   [1,2,2],
//   [2,2],
//   [1,2],
//   []
// ]

// Time:  O(n * 2^n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* subsetsWithDup(NSArray* nums) {
  NSMutableArray* result = @[@[].mutableCopy].mutableCopy;
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  NSInteger prevSize = 0;
  
  for (int i = 0; i < [sorted count]; ++i) {
    const NSInteger size = [result count];
    
    for (NSInteger j = 0; j < size; ++j) {
      // Only union non-duplicate element or new union set.
      if (i == 0 || [sorted[i] isNotEqualTo:sorted[i - 1]] || j >= prevSize) {
        [result addObject:[result[j] mutableCopy]];
        [[result lastObject] addObject:sorted[i]];
      }
    }
    prevSize = size;
  }
  return result;
}