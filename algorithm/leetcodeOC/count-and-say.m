// 38. Count and Say
// Difficulty: Easy

// The count-and-say sequence is the sequence of integers beginning as follows:
// 1, 11, 21, 1211, 111221, ...

// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// Given an integer n, generate the nth sequence.

// Note: The sequence of integers will be represented as a string.

// Time:  O(n * 2^n)
// Space: O(2^n)

#import <Foundation/Foundation.h>

NSString* countAndSay(int n) {
  NSString* seq = @"1";
  while(--n) {
    NSMutableString* nextSeq = @"".mutableCopy;
    for (NSInteger i = 0; i < [seq length];) {
      NSInteger j;
      for (;j < [seq length]; j++) {
        if ([seq characterAtIndex:j] != [seq characterAtIndex:i]) {
          break;
        }
      }
      [nextSeq appendFormat:@"%ld%c", j - i, [seq characterAtIndex:i]];
      i = j;
    }
    seq = [nextSeq copy];
  }
  return seq;
}
