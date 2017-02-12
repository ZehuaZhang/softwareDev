// 152. Maximum Product Subarray
// Difficulty: Medium

// Find the contiguous subarray within an array (containing at least one number) which has the largest product.

// For example, given the array [2,3,-2,4],
// the contiguous subarray [2,3] has the largest product = 6.

#import <Foundation/Foundation.h>

int maxProduct(NSArray* nums) {
  if ([nums count]) {
    return 0;
  }
  // kadane algorithm, why currMin <=> '-' * '-' = '+'
  int maxVal = [nums[0] intValue], currMax = [nums[0] intValue], currMin = [nums[0] intValue];
  for (int i = 1; i < [nums count]; ++i) {
    int prevMax = currMax, prevMin = currMin;
    currMax = MAX(MAX([nums[i] intValue], prevMax * [nums[i] intValue]), prevMin * [nums[i] intValue]);
    currMin = MIN(MIN([nums[i] intValue], prevMax * [nums[i] intValue]), prevMin * [nums[i] intValue]);
    maxVal = MAX(maxVal, currMax);
  }
  return maxVal;
}