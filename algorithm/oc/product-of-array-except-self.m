// 238. Product of Array Except Self
// Difficulty: Medium

// Given an array of n integers where n > 1, nums, return an array output
// such that output[i] is equal to the product of all the elements of nums except nums[i].

// Solve it without division and in O(n).

// For example, given [1,2,3,4], return [24,12,8,6].

// Follow up:
// Could you solve it with constant space complexity?
// (Note: The output array does not count as extra space for the purpose of space complexity analysis.)

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* productExceptSelf(NSArray* nums) {
  if (![nums count]) {
    return @[];
  }
  
  NSMutableArray* leftProduct = @[].mutableCopy;
  
  leftProduct[0] = @(1);
  for (NSInteger i = 1; i < [nums count]; ++i) {
    leftProduct[i] = @([leftProduct[i - 1] intValue] * [nums[i - 1] intValue]);
  }
  
  int rightProduct = 1;
  for (NSInteger i = [nums count] - 2; i >= 0; --i) {
    rightProduct *= [nums[i + 1] intValue];
    leftProduct[i] = @([leftProduct[i] intValue] * rightProduct);
  }
  
  return leftProduct;
}
