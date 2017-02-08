// 47. Permutations II
// Difficulty: Medium

// Given a collection of numbers that might contain duplicates, return all possible unique permutations.

// For example,
// [1,1,2] have the following unique permutations:

// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]

// Time : O(n!)
// Space: O(n)

#import <Foundation/Foundation.h>

void permuteHelper(NSArray* nums, BOOL *visited, NSArray* path, NSMutableArray** ans) {
  if ([nums count]== [path count]) {
    [*ans addObject:path];
    return;
  }
  
  for (NSInteger i = 0; i < [nums count]; i++) {
    if (!visited[i]) {
      visited[i] = YES;
      NSMutableArray* nextPath = path.mutableCopy;
      [nextPath addObject:nums[i]];
      permuteHelper(nums, visited, [nextPath copy], ans);
      visited[i] = NO;
      for (; i < [nums count] - 1 && nums[i] == nums[i + 1]; i++);
    }
  }
}

NSArray* permute(NSArray* nums) {
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  BOOL visited[nums.count];
  memset(visited, NO, sizeof(BOOL) * (nums.count));
  NSMutableArray* ans = [[NSMutableArray alloc] init];
  permuteHelper(sorted, visited, @[].copy, &ans);
  return ans;
}