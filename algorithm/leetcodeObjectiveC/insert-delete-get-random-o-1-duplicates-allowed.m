// 381. Insert Delete GetRandom O(1) - Duplicates allowed
// Difficulty: Hard

// Design a data structure that supports all following operations in average O(1) time.

// Note: Duplicate elements are allowed.
// insert(val): Inserts an item val to the collection.
// remove(val): Removes an item val from the collection if present.
// getRandom: Returns a random element from current collection of elements.
// The probability of each element being returned is linearly related to the number of
// same value the collection contains.
// Example:

// Init an empty collection.
// RandomizedCollection collection = new RandomizedCollection();

// Inserts 1 to the collection. Returns true as the collection did not contain 1.
// collection.insert(1);

// Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
// collection.insert(1);

// Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
// collection.insert(2);

// getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
// collection.getRandom();

// Removes 1 from the collection, returns true. Collection now contains [1,2].
// collection.remove(1);

// getRandom should return 1 and 2 both equally likely.
// collection.getRandom();

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection obj = new RandomizedCollection();
 * bool param_1 = obj.insert(val);
 * bool param_2 = obj.remove(val);
 * int param_3 = obj.getRandom();
 */

// Time:  O(1)
// Space: O(n)

#import <Foundation/Foundation.h>

@interface RandomizedCollection : NSObject
@end

@implementation RandomizedCollection

NSMutableArray* _list;
NSMutableDictionary* _used;

/** Initialize your data structure here. */
-(instancetype)init{
  self = [super init];
  if (self) {
    _list = @[].mutableCopy;
    _used = @{}.mutableCopy;
  }
  return self;
}

/** Inserts a value to the set. Returns true if the set did not already contain the specified element. */
-(BOOL)insert:(int)value {
  BOOL has = _used[@(value)] == nil;
  
  [_list addObject:@(value)];
  if (!has) {
    _used[@(value)] = @[].mutableCopy;
  }
  [_used[@(value)] addObject:@(_list.count - 1)];
  
  return has;
}

/** Removes a value from the set. Returns true if the set contained the specified element. */
-(BOOL)remove:(int)value {
  if (!_used[@(value)]) {
    return NO;
  }
  _used[[_list lastObject]][[[_list lastObject] count] - 1] = [_used[@(value)] lastObject];
  [_list exchangeObjectAtIndex:_list.count - 1 withObjectAtIndex:[[_used[@(value)] lastObject] intValue]];
  [_list exchangeObjectAtIndex:_list.count - 1 withObjectAtIndex:[[_used[@(value)] lastObject] intValue]];
  [_used[@(value)] removeLastObject];
  if (![_used[@(value)] count]) {
    [_used removeObjectForKey:@(value)];
  }
  [_list removeLastObject];
  return YES;
}

/** Get a random element from the set. */
-(int)getRandom {
  return [_list[arc4random_uniform((int)_list.count)] intValue];
}

@end