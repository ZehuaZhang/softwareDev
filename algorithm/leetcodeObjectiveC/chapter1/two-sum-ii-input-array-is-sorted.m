// 167. Two Sum II - Input array is sorted
// Difficulty : Medium

// Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
// The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.
// Please note that your returned answers (both index1 and index2) are not zero-based.
// You may assume that each input would have exactly one solution.
// Input: numbers={2, 7, 11, 15}, target=9
// Output: index1=1, index2=2

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray *twoSumII(NSArray *nums,  NSNumber *target)
{
  NSInteger left = 0;
  NSInteger right = nums.count - 1;
  while ( left != right ) {
    
    NSInteger sum = [nums[left] integerValue] + [nums[right] integerValue];
    NSInteger targetVal = [target integerValue];
    
    if (sum > targetVal) {
      right--;
    } else if (sum < targetVal) {
      left++;
    } else {
      return @[@(left + 1),@(right + 1)];
    }
  };
  return nil;
}

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSArray *intArray = @[@55,@66,@77];
    NSNumber *target = @121;
    NSArray *indices = twoSumII(intArray, target);
    if (indices.count == 2)
      NSLog(@"\nFound index1 = %@, index2 = %@, for target = %lu in array = %@",
            [indices objectAtIndex:0], [indices objectAtIndex:1], [target integerValue], intArray);
    else
      NSLog(@"\nDid not find the two sum!");
  }
  return 0;
}
