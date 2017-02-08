// 39. Combination Sum
// Difficulty: Medium

// Given a set of candidate numbers (C) and a target number (T),
// find all unique combinations in C where the candidate numbers sums to T.

// The same repeated number may be chosen from C unlimited number of times.

// Note:
// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.
// For example, given candidate set [2, 3, 6, 7] and target 7,

// A solution set is:
// [
//   [7],
//   [2, 2, 3]
// ]

// Time : O(n!)
// Space: O(1)

#import <Foundation/Foundation.h>

void combinationSumHelper(NSArray* candidates, NSInteger gap, NSInteger begin, NSArray* path, NSMutableArray** ans) {
  if (gap == 0) {
    [*ans addObject:path];
    return;
  }
  
  for (NSInteger i = begin; i < [candidates count]; i++) {
    if (gap < [candidates[i] integerValue]) {
      return;
    }
    NSMutableArray* nextPath = path.mutableCopy;
    [nextPath addObject:candidates[i]];
    combinationSumHelper(candidates, gap - [candidates[i] integerValue], i, [nextPath copy], ans);
  }
}

NSArray* combinationSum(NSArray* candidates, int target) {
  NSArray* sorted = [candidates sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  NSMutableArray* ans = [[NSMutableArray alloc] init];
  combinationSumHelper(sorted, target, 0, @[].copy, &ans);
  return [ans copy];
}
