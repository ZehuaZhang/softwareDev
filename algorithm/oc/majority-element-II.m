// 229. Majority Element II
// Difficulty: Medium

// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
// The algorithm should run in linear time and in O(1) space.

// Hint:
// How many majority elements could it possibly have?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* majorityElement(NSArray* nums) {
  NSMutableArray* res = @[].mutableCopy;
  int candidate0 = 0, candidate1 = 0, count0 = 0, count1 = 0;
  for (id num in nums) {
    if ([num intValue]== candidate0) {
      ++count0;
    } else if ([num intValue] == candidate1) {
      ++count1;
    } else if (count0 == 0) {
      candidate0 = [num intValue];
      count0 = 1;
    } else if (count1 == 0) {
      candidate1 = [num intValue];
      count1 = 1;
    } else {
      --count0;
      --count1;
    }
  }
  
  count0 = count1 = 0;
  for (id num in nums) {
    if ([num intValue] == candidate0) {
      ++count0;
    } else if ([num intValue] == candidate1) {
      ++count1;
    }
  }
  
  if (count0 > [nums count] / 3) {
    [res addObject:@(candidate0)];
  }
  if (count1 > [nums count] / 3) {
    [res addObject:@(candidate1)];
  }
  return res;
}
