// 43. Multiply Strings
// Difficulty: Medium

// Given two numbers represented as strings, return multiplication of the numbers as a string.

// Note:
// The numbers can be arbitrarily large and are non-negative.
// Converting the input string to integer is NOT allowed.
// You should NOT use internal library such as BigInteger.

// Time:  O(m * n)
// Space: O(m + n)

#import <Foundation/Foundation.h>

NSString* multiply(NSString* num1, NSString* num2) {
  NSArray* num1Int = [num1 componentsSeparatedByString:@""];
  NSArray* num2Int = [num2 componentsSeparatedByString:@""];
  NSMutableArray* sum = @[].mutableCopy;
  
  for (NSInteger i = 0; i < [num1 length]; ++i) {
    for (NSInteger j = 0; j < [num2 length]; ++j) {
      int multiply = [sum[i + j] intValue] + [num1Int[i] intValue] * [num2Int[i] intValue];
      sum[i + j] = @(multiply % 10);
      sum[i + j + 1] = @([sum[i + j + 1] intValue] + multiply / 10);
    }
  }
  return [[sum reverseObjectEnumerator] allObject] componentsJoinedByString];
}
