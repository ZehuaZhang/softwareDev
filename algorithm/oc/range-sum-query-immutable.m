// 303. Range Sum Query - Immutable
// Difficulty: Easy

// Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

// Example:
// Given nums = [-2, 0, 3, -5, 2, -1]

// sumRange(0, 2) -> 1
// sumRange(2, 5) -> -1
// sumRange(0, 5) -> -3
// Note:
// You may assume that the array does not change.
// There are many calls to sumRange function.

// Your NumArray object will be instantiated and called as such:
// NumArray numArray(nums);
// numArray.sumRange(0, 1);
// numArray.sumRange(1, 2);

// Time:  ctor:   O(n),
//        lookup: O(1)
// Space: O(n)

#import <Foundation/Foundation.h>

@interface NumArray : NSObject
@end

@implementation NumArray

NSMutableArray* _hist;

-(instancetype)initWithArray:(NSArray*)nums {
  self = [super init];
  if (self) {
    _hist = @[@0].mutableCopy;
    for (id num in nums) {
      [_hist addObject:@([[_hist lastObject] intValue] + [num intValue])];
    }
  }
  return self;
}

-(int)sumRangBetweenI:(int)i andJ:(int)j {
  return [_hist[j + 1] intValue] - [_hist[i] intValue];
}

@end