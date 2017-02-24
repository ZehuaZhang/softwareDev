// 53. Maximum Subarray
// Difficulty: Medium

// Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

// For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
// the contiguous subarray [4,-1,2,1] has the largest sum = 6.

// More practice:
// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

int maxSubArray(NSArray* nums) {
  int currSum = 0;
  int maxSum = INT_MIN;
  for (NSInteger i = 0; i < [nums count]; i++) {
    currSum = MAX(currSum + [nums[i] intValue], [nums[i] intValue]);
    maxSum = MAX(maxSum, currSum);
  }
  return maxSum;
}