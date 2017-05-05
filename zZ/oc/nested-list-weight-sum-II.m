// 366. Nested List Weight Sum II
// Difficulty : Medium

// Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

// Each element is either an integer, or a list -- whose elements may also be integers or other lists.

// Different from the previous question where weight is increasing from root to leaf,
// now the weight is defined from bottom up. i.e., the leaf level integers have weight 1,
// and the root level integers have the largest weight.

// Example 1:
// Given the list [[1,1],2,[1,1]], return 8.
// (four 1 at depth 1, one 2 at depth 2)

// Example 2:
// Given the list [1,[4,[6]]], return 17.
// (one 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17)

// Time:  O(n)
// Space: O(h)

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

#import <Foundation/Foundation.h>

@interface NestedInteger : NSObject

-(int)getInteger;
-(BOOL)isInteger;
-(NSArray*)getList;

@end

void depthSumInverseHelper(NestedInteger* list, int depth, NSMutableArray** result) {
  if ((*result).count < depth + 1) {
    [*result addObject:@0];
  }
  if ([list isInteger]) {
    (*result)[depth] = @([(*result)[depth] intValue] + [list getInteger]);
  } else {
    for (id l in [list getList]) {
      depthSumInverseHelper(l, depth + 1, result);
    }
  }
}

int depthSumInverse(NSArray* nestedList) {
  NSMutableArray* result = @[].mutableCopy;
  for (id list in nestedList) {
    depthSumInverseHelper(list, 0, &result);
  }
  
  int sum = 0;
  for (NSInteger i = result.count - 1; i >= 0; --i) {
    sum += [result[i] intValue] * (result.count - i);
  }
  return sum;
}

