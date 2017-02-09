// 89. Gray Code
// Difficulty: Medium

// The gray code is a binary numeral system where two successive values differ in only one bit.

// Given a non-negative integer n representing the total number of bits in the code,
// print the sequence of gray code. A gray code sequence must begin with 0.

// For example, given n = 2, return [0,1,3,2]. Its gray code sequence is:

// 00 - 0
// 01 - 1
// 11 - 3
// 10 - 2

// Note:
// For a given n, a gray code sequence is not uniquely defined.

// For example, [0,2,3,1] is also a valid gray code sequence according to the above definition.

// Time:  (2^n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* grayCode(int n) {
  NSMutableArray* result = @[@0].mutableCopy;
  for (int i = 0; i < n; ++i) {
    for (NSInteger j = [result count] - 1; j >= 0; --j) {
      [result addObject:@((1 << i) | [result[j] integerValue])];
    }
  }
  return result;
}