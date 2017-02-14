// 46. Permutations
// Difficulty: Medium

// Given a collection of distinct numbers, return all possible permutations.

// For example,
// [1,2,3] have the following permutations:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// Time : O(n!)
// Space: O(n)

#import <Foundation/Foundation.h>

void permuteHelper(NSArray* nums, BOOL *visited, NSArray* path, NSMutableArray** ans) {
  if ([nums count] == [path count]) {
    [*ans addObject:path];
    return;
  }
  
  for (NSInteger i = 0; i < [nums count]; i++) {
    if (!visited[i]) {
      visited[i] = YES;
      permuteHelper(nums, visited, [path arrayByAddingObject:nums[i]], ans);
      visited[i] = NO;
    }
  }
}

NSArray* permute(NSArray* nums) {
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  BOOL visited[nums.count];
  memset(visited, NO, sizeof(BOOL) * (nums.count));
  NSMutableArray* ans = @[].mutableCopy;
  permuteHelper(sorted, visited, @[], &ans);
  return ans;
}