// 169. Majority Element
// Difficulty: Easy
// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the majority element always exist in the array.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int majorityElement(NSArray* nums) {
  int candidate = [nums[0] intValue], cnt = 1;
  for (int i = 1; i < [nums count]; i++) {
    if ([nums[i] intValue] == candidate) {
      ++cnt;
    } else {
      if (--cnt == 0) {
        candidate = [nums[i] intValue];
        cnt = 1;
      }
    }
  }
  return candidate;
}
