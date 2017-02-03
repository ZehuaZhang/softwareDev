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
  NSInteger length = (NSInteger)[s length];

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

  NSInteger result = 0;
  while (i < n && isdigit([s characterAtIndex:i])) {
    NSInteger digit = (NSInteger)([s characterAtIndex:i] - '0');
    if ((sign == 1) && (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit >= INT_MAX % 10))) {
      return INT_MAX;
    } else if ((sign == -1) && (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > INT_MAX % 10))){
      return INT_MIN;
    }
    result = result * 10 + digit;
    i++;
  }
  retrun sign * result;
}

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSString *s = @"+ +1.1a";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    s = @"13234234";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    s = @"13234$234";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    s = @"-13234234";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    s = @"-13234.3";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    s = @"13234234894729384798247892";
    NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
  }
  return 0;
}