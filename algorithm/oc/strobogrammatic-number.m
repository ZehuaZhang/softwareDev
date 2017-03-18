// 246. Strobogrammatic Number
// Difficulty : Easy

// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Write a function to determine if a number is strobogrammatic. The number is represented as a string.

// For example, the numbers "69", "88", and "818" are all strobogrammatic.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isStrobogrammatic(NSString* num) {
  NSDictionary* lookup = @{@"0":@"0", @"1":@"1", @"6":@"9", @"8":@"8", @"9":@"6"};
  
  for (int i = 0; i <= num.length / 2; ++i) {
    if ([lookup[[num substringWithRange:NSMakeRange(i, 1)]] isNotEqualTo:[num substringWithRange:NSMakeRange(num.length - 1 - i, 1)]]) {
      return NO;
    }
  }
  return YES;
}