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
  int num1Int[num1.length];
  int num2Int[num2.length];
  
  for (NSInteger i = [num1 length] - 1; i >= 0; i--) {
    num1Int[i] = [num1 characterAtIndex:i] - '0';
  }
  for (NSInteger i = [num2 length] - 1; i >= 0; i--) {
    num2Int[i] = [num2 characterAtIndex:i] - '0';
  }
  
  int sum[num1.length + num2.length];
  memset(sum, 0, sizeof(int) * (num1.length + num2.length));
  
  for (NSInteger i = 0; i < [num1 length]; ++i) {
    for (NSInteger j = 0; j < [num2 length]; ++j) {
      int multiply = sum[i + j] + num1Int[i] * num2Int[i];
      sum[i + j] = multiply % 10;
      sum[i + j + 1] += multiply / 10;
    }
  }
  
  NSInteger i;
  for (i = num1.length + num2.length - 1; i >= 0 && sum[i] == 0; i--);
  NSMutableString* result = @"".mutableCopy;
  for (; i >= 0; i--) {
    [result appendFormat:@"%c", sum[i] + '0' ];
  }
  
  return [result copy];
}
