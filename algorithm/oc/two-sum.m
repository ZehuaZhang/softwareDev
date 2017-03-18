// 1. Two Sum
// Difficulty: Easy

// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution.

// Example:
// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* twoSum(NSArray* intArray,  NSInteger target) {
  NSMutableDictionary *numIdx = @{}.mutableCopy;
  
  for (NSInteger i = 0; i < intArray.count; i++){
    if (numIdx[@(target - [intArray[i] integerValue])] != nil) {
      return @[numIdx[@(target - [intArray[i] integerValue])], @(i)];
    }
    numIdx[intArray[i]] = @(i);
  };
  return nil;
}