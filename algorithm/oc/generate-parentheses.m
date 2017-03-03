// 22. Generate Parentheses
// Difficulty: Medium

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// For example, given n = 3, a solution set is:

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

// Time Complexity: O(2^n/n)??
// Space Complexity: O(n)

#import <Foundation/Foundation.h>

NSArray* generateParenthesis(int n) {
  if (n == 0) {
    return @[@""];
  }
  if (n == 1) {
    return @[@"()"];
  }
  NSMutableArray* result = @[].mutableCopy;
  for (int i = 0; i < n; ++i) {
    for (NSString* inner in generateParenthesis(i)) {
      for (NSString* outer in generateParenthesis(n - 1 - i)) {
        [result addObject:[NSString stringWithFormat:@"(%@)%@", inner, outer]];
      }
    }
  }
  return [result copy];
}
