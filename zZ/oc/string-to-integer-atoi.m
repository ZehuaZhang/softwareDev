// 8. String to Integer (atoi)
// Difficulty: Easy

// Implement atoi to convert a string to an integer.

// Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and 
// ask yourself what are the possible input cases.

// Notes: It is intended for this problem to be specified vaguely (ie, no given input specs). 
// You are responsible to gather all the input requirements up front.

// Update (2015-02-10):
// The signature of the C++ function had been updated. If you still see your function signature accepts a const char * argument, 
// please click the reload button  to reset your code definition.

// Time: O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger strToInt(NSString *s) {
  NSInteger n = [s length];

  NSInteger i = 0;
  while (i < n && isspace([s characterAtIndex:i])) {
    i++;
  }

  NSInteger sign = 1;

  if (i < n && [s characterAtIndex:i] == '-') {
    sign = -1;
    i++;
  }
  if (i < n && [s characterAtIndex:i] == '+') {
    i++;
  }

  NSInteger result = 0, prev = 0;
  while (i < n && isdigit([s characterAtIndex:i])) {
    NSInteger digit = [s characterAtIndex:i] - '0';
    prev = result;
    result = result * 10 + digit;
    if (prev != result / 10) {
      return sign == 1 ? INT_MAX : INT_MIN;
    }
    i++;
  }
  return sign * result;
}