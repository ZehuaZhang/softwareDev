// Range Sum Query - Mutable
// Difficulty: Medium

// Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

// The update(i, val) function modifies nums by updating the element at index i to val.
// Example:
// Given nums = [1, 3, 5]

// sumRange(0, 2) -> 9
// update(1, 2)
// sumRange(0, 2) -> 8

// Note:
// The array is only modifiable by the update function.
// You may assume the number of calls to update and sumRange function is distributed evenly.

// Your NumArray object will be instantiated and called as such:
// NumArray numArray(nums);
// numArray.sumRange(0, 1);
// numArray.update(1, 10);
// numArray.sumRange(1, 2);

// Time:  ctor:   O(n),
//        update: O(logn),
//        query:  O(logn)
// Space: O(n)

#import <Foundation/Foundation.h>

// Binary Indexed Tree (BIT) solution.

// C1 = A1
// C2 = A1 + A2
// C3 = A3
// C4 = A1 + A2 + A3 + A4
// C5 = A5
// C6 = A5 + A6
// C7 = A7
// C8 = A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8
// in BIT, you can consider "+" is relation with two nodes

@interface NumArray : NSObject
@end

@implementation NumArray

NSMutableArray* _nums;  // nums staring @ index 1
NSMutableArray* _bits;  // diff

-(instancetype)initWithArray:(NSArray*)nums {
  self = [super init];
  if (self) {
    _nums = @[].mutableCopy;
    _bits = @[].mutableCopy;
    for (int i = 0; i < nums.count + 1; i++) {
      _nums[i] = @0;
      _bits[i] = @0;
    }
    for (int i = 0; i < nums.count; ++i) {
      [self updateIndex:i value:[nums[i] intValue]];
    }
  }
  return self;
}

-(void)updateIndex:(int)i value:(int)value {
  int diff = value - [_nums[i + 1] intValue];  // difference of new and previous value
  for (int j = i + 1; j < _nums.count; j += (j & -j)) {  // advance by lower bit set
    _bits[j] = @([_bits[j] intValue] + diff);
  }
  _nums[i + 1] = @(value);
}

-(int)sumRangeI:(int)i j:(int)j {
  return [self getSum:j + 1] - [self getSum:i];
}

-(int)getSum:(int)i { // accumulative sum before index i
  int result = 0;
  for (int j = i; j > 0; j -= (j & -j)) {
    result += [_bits[j] intValue];
  }
  return result;
}

@end