// 341. Flatten Nested List Iterator
// Difficulty: Medium

// Given a nested list of integers, implement an iterator to flatten it.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Example 1:
// Given the list [[1,1],2,[1,1]],

// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].

// Example 2:
// Given the list [1,[4,[6]]],

// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].

// Time:  O(n), n is the number of the integers.
// Space: O(h), h is the depth of the nested lists.

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i(nestedList);
 * while (i.hasNext()) cout << i.next();
 */


#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (id)top;
- (void)push:(id)element;
- (BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark NestedInteger

@interface NestedInteger : NSObject

-(int)getInteger;
-(BOOL)isInteger;
-(NSArray*)getList;

@end

#pragma mark Solution

@interface NestedIterator : NSObject
@end

@implementation NestedIterator

Stack* _depth;

-(instancetype)initWithNestedInteger:(NSArray*)nestedList {
  self = [super init];
  if (self) {
    [_depth push:[nestedList objectEnumerator]];
  }
  return self;
}

-(int)next {
  return [[[_depth top] nextObject] getInteger];
}

-(BOOL)hasNext {
  while (![_depth isEmpty]) {
    NestedInteger* object = [[_depth top] nextObject];
    if (!object) {
      [_depth pop];
    } else if ([object isInteger]) {
      return YES;
    } else {
      [_depth push:[[object getList] objectEnumerator]];
    }
  }
  return NO;
}

@end