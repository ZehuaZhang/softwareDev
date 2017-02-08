// 29. Divide Two Integers
// Difficulty: Medium

// Divide two integers without using multiplication, division and mod operator.

// If it is overflow, return MAX_INT.

// Time:  O(logn) = O(1)
// Space: O(1)

// Only using integer type.

#import <Foundation/Foundation.h>

int divide(int dividend, int divisor) {
  if (dividend == INT_MIN && divisor == -1) {
    return INT_MAX;
  }
  long long a = llabs(dividend);
  long long b = llabs(divisor);
  
  long long result = 0;
  while (a >= b) {
    long long c = b;
    for (int i = 0; a >= c; ++i, c <<= 1) {
      a -= c;
      result += 1 << i;
    }
  }
  return (dividend ^ divisor) >> 31 ? (-result) : result;
}