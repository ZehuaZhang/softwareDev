/**
 Question:
 Implement atoi to convert a string to an integer.
 Medium

 The atoi function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial
 plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.
 The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.
 If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters,
 no conversion is performed.
 If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, the maximum integer value (2147483647) or the minimum
 integer value (–2147483648) is returned.
 */

#import <Foundation/Foundation.h>

int strToInt(NSString *s) {
  int length = (int)[s length];

  int i = 0;
  while (i < n && isspace([s characterAtIndex:i])) {
    i++;
  }

  int sign = 1;

  if (i < n && [s characterAtIndex:i] == '-') {
    sign = -1;
    i++;
  }
  if (i < n && [s characterAtIndex:i] == '+') {
    i++;
  }

  int result = 0;
  while (i < n && isdigit([s characterAtIndex:i])) {
    int digit = (int)([s characterAtIndex:i] - '0');
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