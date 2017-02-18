// 385. Mini Parser
// Difficulty: Medium

// Given a nested list of integers represented as a string, implement a parser to deserialize it.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Note: You may assume that the string is well-formed:

// String is non-empty.
// String does not contain white spaces.
// String contains only digits 0-9 [ - , ]

// Example 1:
// Given s = "324",

// You should return a NestedInteger object which contains a single integer 324.

// Example 2:
// Given s = "[123,[456,[789]]]",

// Return a NestedInteger object containing a nested list with 2 elements:

// 1. An integer containing value 123.
// 2. A nested list containing two elements:
//     i.  An integer containing value 456.
//     ii. A nested list with one element:
//          a. An integer containing value 789.

// Time:  O(n)
// Space: O(h)

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Constructor initializes an empty nested list.
 *     NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     NestedInteger(int value);
 *
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Set this NestedInteger to hold a single integer.
 *     void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     void add(const NestedInteger &ni);
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)top;
- (id)pop;
- (void)push:(id)element;
- (BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark NestedInteger

@interface NestedInteger : NSObject

-(instancetype)initWithInteger:(NSInteger)integer;
-(instancetype)init;
-(int)getInteger;
-(BOOL)isInteger;
-(void)addNestedInteger:(NestedInteger*)integer;
-(NSArray*)getList;

@end

#pragma mark Solution
// Iterative solution.

NestedInteger* deserialize(NSString* s) {
  if (!s.length) {
    return [[NestedInteger alloc] init];
  }
  if ([s characterAtIndex:0] != '[') {
    return [[NestedInteger alloc] initWithInteger:[s intValue]];
  }
  Stack* stack = [[Stack alloc] init];
  for (int i = 0, j = 0; j < s.length; ++j) {
    if ([s characterAtIndex:j] == '[') {
      [stack push:[[NestedInteger alloc] init]];
      i = j + 1;
    } else if ([s characterAtIndex:j] == ',' || [s characterAtIndex:j] == ']') {
      if (isdigit([s characterAtIndex:j - 1])) {
        [(NestedInteger*)[stack top] addNestedInteger:[[NestedInteger alloc] initWithInteger:[[s substringWithRange:NSMakeRange(i, j - i)] integerValue]]];
      }
      if ([s characterAtIndex:j] == ']' && stack.count > 1) {
        NestedInteger* curr = [stack pop];
        [[stack top] addNestedInteger:curr];
      }
      i = j + 1;
    }
  }
  return [stack top];
}