// 67. Add Binary
// Difficulty: Easy

// Given two binary strings, return their sum (also a binary string).

// For example,
// a = "11"
// b = "1"
// Return "100".

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* addBinary(NSString* a, NSString* b) {
  const NSInteger m = [a length];
  const NSInteger n = [b length];
  NSMutableString* sumStr = @"".mutableCopy;
  
  int carry = 0;
  for (int i = 0; i < MAX(m, n) || carry; ++i) {
    const int aBit = i < m ? [a characterAtIndex:m - 1 - i] - '0' : 0;
    const int bBit = i < n ? [b characterAtIndex:n - 1 - i] - '0' : 0;
    int sum = carry + aBit + bBit;
    carry = sum / 2;
    
    [sumStr appendFormat:@"%c", sum % 2 + '0'];
  }
  
  
  NSMutableString* resStr = [NSMutableString stringWithCapacity:[sumStr length]];
  [sumStr enumerateSubstringsInRange:NSMakeRange(0, [sumStr length])
                               options:(NSStringEnumerationReverse | NSStringEnumerationByComposedCharacterSequences)
                            usingBlock:^(NSString *substring, NSRange substringRange, NSRange enclosingRange, BOOL *stop) {
                              [resStr appendString:substring];
                            }];
  return resStr;
}