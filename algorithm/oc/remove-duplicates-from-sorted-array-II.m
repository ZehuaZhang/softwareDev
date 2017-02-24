// 80. Remove Duplicates from Sorted Array II
// Difficulty: Medium

// Follow up for "Remove Duplicates":
// What if duplicates are allowed at most twice?

// For example,
// Given sorted array nums = [1,1,1,2,2,3],

// Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3.
// It doesnt matter what you leave beyond the new length.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger removeDuplicates(NSMutableArray** nums) {
  const int k = 2; // element appears at most k times
  
  if ([*nums count] <= k) {
    return [*nums count];
  }
  
  int index = k;
  for (NSInteger i = k; i < [*nums count]; i++) {
    if ([(*nums)[i] integerValue] != [(*nums)[index - k] integerValue]) {
      (*nums)[index++] = (*nums)[i];
    }
  }
  return index;
}