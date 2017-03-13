// 166. Fraction to Recurring Decimal
// Difficulty: Medium

// Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

// If the fractional part is repeating, enclose the repeating part in parentheses.

// For example,

// Given numerator = 1, denominator = 2, return "0.5".
// Given numerator = 2, denominator = 1, return "2".
// Given numerator = 2, denominator = 3, return "0.(6)".

// Hint:
// No scary math, just apply elementary math knowledge. Still remember how to perform a long division?
// Try a long division on 4/9, the repeating part is obvious. Now try 4/333. Do you see a pattern?
// Be wary of edge cases! List out as many test cases as you can think of and test your code thoroughly.

// Time:  O(logn), where logn is the length of result strings
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* fractionToDecimal(int numerator, int denominator) {
  NSMutableString* result = @"".mutableCopy;
  if ((numerator ^ denominator) >> 31 && numerator != 0) {
    [result appendString:@"-"];
  }
  
  long long a = llabs(numerator);
  long long b = llabs(denominator);
  [result appendFormat:@"%lld", a / b];
  
  if (a % b > 0) {
    [result appendString:@"."];
  }
  
  NSMutableDictionary* idx = @{}.mutableCopy;
  for (a %= b; a && !idx[@(a)]; a %= b) {
    idx[@(a)] = @([result length]);
    a *= 10;
    [result appendFormat:@"%lld", a / b];
  }
  
  if (idx[@(a)]) {
    [result insertString:@"(" atIndex:[idx[@(a)] intValue]];
    [result appendString:@")"];
  }
  return result;
}
