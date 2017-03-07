// 306. Additive Number
// Difficulty: Medium

// Additive number is a string whose digits can form additive sequence.

// A valid additive sequence should contain at least three numbers.
// Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

// For example:
// "112358" is an additive number because the digits can form an additive sequence: 1, 1, 2, 3, 5, 8.

// 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
// "199100199" is also an additive number, the additive sequence is: 1, 99, 100, 199.
// 1 + 99 = 100, 99 + 100 = 199
// Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.

// Given a string containing only digits '0'-'9', write a function to determine if its an additive number.

// Follow up:
// How would you handle overflow for very large input integers?

// Time:  O(n^3)
// Space: O(n)

#import <Foundation/Foundation.h>

NSString* add(NSString* s1, NSString* s2) {
  NSMutableString* res = @"".mutableCopy;
  int carry = 0;
  for (int i = 0; i < MAX(s1.length, s2.length); ++i) {
    int a = i < s1.length ? [s1 characterAtIndex:s1.length - 1 - i] - '0' : 0;
    int b = i < s2.length ? [s2 characterAtIndex:s2.length - 1 - i] - '0' : 0;
    int sum = carry + a + b;
    carry = sum / 10;
    [res appendFormat:@"%c", '0' + sum % 10];
  }
  if (carry) {
    [res appendFormat:@"%c", '0' + carry];
  }
  res = [[[[res componentsSeparatedByString:@""] reverseObjectEnumerator] allObjects] componentsJoinedByString:@""].mutableCopy;
  return res;
}

BOOL isAdditiveNumber(NSString* num) {
  for (int i = 1; i < num.length; ++i) {
    for (int j = i + 1; j < num.length; ++j) {
      NSMutableString* s1 = [num substringWithRange:NSMakeRange(0, i)].mutableCopy;
      NSMutableString* s2 = [num substringWithRange:NSMakeRange(i, j - i)].mutableCopy;
      if ((s1.length > 1 && [s1 characterAtIndex:0] == '0') ||
          (s2.length > 1 && [s2 characterAtIndex:0] == '0')) {
        continue;
      }
      NSMutableString* next = add(s1, s2).mutableCopy;
      NSMutableString* curr = [NSMutableString stringWithFormat:@"%@%@%@", s1, s2, next];
      while (curr.length < num.length) {
        s1 = [s2 copy];
        s2 = [next copy];
        next = add(s1, s2).mutableCopy;
        [curr appendString:next];
      }
      if ([curr isEqual:num]) {
        return YES;
      }
    }
  }
  return NO;
}
