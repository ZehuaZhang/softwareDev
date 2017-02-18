// 41. First Missing Positive
// Difficulty: Hard
// Given an unsorted integer array, find the first missing positive integer.

// For example,
// Given [1,2,0] return 3,
// and [3,4,-1,1] return 2.

// Your algorithm should run in O(n) time and uses constant space.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger firstMissingPositive(NSArray *nums) {
  NSMutableSet* set = [[NSMutableSet alloc] init];
  
  for (NSNumber* num in nums) {
    [set addObject:num];
  }
  
  for (NSInteger i = 1; i <= [nums count]; i++) {
    if (![set containsObject:[[NSNumber alloc] initWithInteger:i]])
      return i;
  }
  return 1;
}
