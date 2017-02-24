// 26. Remove Duplicates from Sorted Array
// Difficulty: Easy

// Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

// Do not allocate extra space for another array, you must do this in place with constant memory.

// For example,
// Given input array nums = [1,1,2],

// Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
// It doesnt matter what you leave beyond the new length.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger removeDuplicates(NSMutableArray** nums) {
  const int k = 1; // element appears at most k times
  
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