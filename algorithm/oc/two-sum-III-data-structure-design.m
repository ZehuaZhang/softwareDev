// 170. Two Sum III - Data structure design
// Difficulty : Easy

// Design and implement a TwoSum class. It should support the following operations:add and find.

// add - Add the number to an internal data structure.
// find - Find if there exists any pair of numbers which sum is equal to the value.

// Your TwoSum object will be instantiated and called as such:
// TwoSum twoSum;
// twoSum.add(number);
// twoSum.find(value);

// For example,
// add(1); add(3); add(5);
// find(4) -> true
// find(7) -> false

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark TwoSum

@interface TwoSum : NSObject

-(id) init;
-(void) add:(int)number;
-(BOOL) find:(int)value;

@end

@implementation TwoSum

NSMutableDictionary* _lookup;

-(id) init {
  self = [super init];
  if (self) {
    _lookup = @{}.mutableCopy;
  }
  return self;
}

// Add the number to an internal data structure.
-(void) add:(int)number {
  _lookup[@(number)] = @([_lookup[@(number)] intValue] + 1);
}

// Find if there exists any pair of numbers which sum is equal to the value.
-(BOOL) find:(int)value {
  for (id key in _lookup) {
    int gap = value - [key intValue];
    if (_lookup[@(gap)] && (gap != [key intValue] || [_lookup[@(gap)] intValue] > 1)) {
      return YES;
    }
  }
  return NO;
}

@end