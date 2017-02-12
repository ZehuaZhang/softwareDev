// 13. Roman to Integer
// Difficulty: Easy

// Given a roman numeral, convert it to an integer.

// Input is guaranteed to be within the range from 1 to 3999.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger romanToInt(NSString* s) {
  NSDictionary* roman2int = @{@"I":@1, @"V":@5, @"X":@10, @"L":@50, @"C":@100, @"D":@500, @"M":@1000};
  NSInteger decimal = 0;
  NSInteger prev = 0;
  for (NSInteger i = 0; i < [s length]; ++i) {
    NSInteger curr = [roman2int[[s substringWithRange:NSMakeRange(i, 1)]] integerValue];
    if (i > 0 && curr > prev) {
      decimal += curr - 2 * prev;
    } else {
      decimal += curr;
    }
    prev = curr;
  }
  return decimal;
}
