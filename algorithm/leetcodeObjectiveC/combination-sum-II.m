// 40. Combination Sum II
// Difficulty: Medium

// Given a collection of candidate numbers (C) and a target number (T),
// find all unique combinations in C where the candidate numbers sums to T.

// Each number in C may only be used once in the combination.

// Note:
// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.
// For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8,
// A solution set is:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]

// Time : O(n!)
// Space: O(1)

#import <Foundation/Foundation.h>

void combinationSum2Helper(NSArray* num, NSInteger gap, NSInteger begin, NSArray* path, NSMutableArray** ans) {
  if (gap == 0) {
    [*ans addObject:path];
    return;
  }
  
  for (NSInteger i = begin; i < [num count]; i++) {
    if (gap < [num[i] integerValue]) {
      return;
    }
    if (i > begin && num[i] == num[i - 1]) {    // skip duplicates
      continue;
    }
    NSMutableArray* nextPath = path.mutableCopy;
    [nextPath addObject:num[i]];
    combinationSum2Helper(num, gap - [num[i] integerValue], i + 1, [nextPath copy], ans);
  }
}

NSArray* combinationSum2(NSArray* num, int target) {
  NSArray* sorted = [num sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  NSMutableArray* ans;
  combinationSum2Helper(sorted, target, 0, @[].copy, &ans);
  return [ans copy];
}


