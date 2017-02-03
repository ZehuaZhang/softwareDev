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

NSArray* twoSum(NSArray* intArray,  NSNumber* target)
{
  // use a hash to save searching time
  NSMutableDictionary *numIdx = @{}.mutableCopy;
  
  for (NSInteger i = 0; i < intArray.count; i++){
    NSNumber *diff = @([target integerValue] - [intArray[i] integerValue]);
    NSNumber *diffIdx = [numIdx objectForKey:diff];
    if (diffIdx) {
      // find it, return index in hash first as it is smaller than current index
      return @[diffIdx, @(i)];
    }
    [numIdx setObject:@(i) forKey:intArray[i]];
  };
  return nil;
}

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSArray *intArray = @[@55,@66,@77];
    NSNumber *target = @121;
    NSArray *indices = twoSum(intArray, target);
    if (indices.count == 2)
      NSLog(@"\nFound index1 = %@, index2 = %@, for target = %lu in array = %@\n",
            [indices objectAtIndex:0], [indices objectAtIndex:1], [target integerValue], intArray);
    else
      NSLog(@"\nDid not find the two sum!\n");
  }
  return 0;
}