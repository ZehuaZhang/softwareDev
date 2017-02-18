// 384. Shuffle an Array
// Difficulty: Medium

// Shuffle a set of numbers without duplicates.

// Example:

// Init an array with set 1, 2, and 3.
// int[] nums = {1,2,3};
// Solution solution = new Solution(nums);

// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
// solution.shuffle();

// Resets the array back to its original configuration [1,2,3].
// solution.reset();

// Returns the random shuffling of array [1,2,3].
// solution.shuffle();

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * vector<int> param_1 = obj.reset();
 * vector<int> param_2 = obj.shuffle();
 */

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

@interface Solution : NSObject
@end

@implementation Solution

NSArray* _nums;

-(instancetype)initWithArray:(NSArray*)nums {
  self = [super init];
  if (self) {
    _nums = [NSArray arrayWithArray:nums];
  }
  return self;
}

/** Resets the array to its original configuration and return it. */
-(NSArray*)resetArray {
  return _nums;
}

/** Returns a random shuffling of the array. */
-(NSArray*)shuffle {
  NSMutableArray* nums = _nums.mutableCopy;
  for (int i = 0; i < nums.count; ++i) {
    [nums exchangeObjectAtIndex:i withObjectAtIndex:i + arc4random_uniform((int)nums.count - i)];
  }
  return nums;
}

@end
