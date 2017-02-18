// 58. Length of Last Word
// Difficulty: Easy

// Given a string s consists of upper/lower-case alphabets and empty space characters ' ',
// return the length of last word in the string.

// If the last word does not exist, return 0.

// Note: A word is defined as a character sequence consists of non-space characters only.

// For example,
// Given s = "Hello World",
// return 5.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int lengthOfLastWord(NSString* s) {
  int len = 0;
  for (NSInteger i = 0; i < [s length] && [s characterAtIndex:i]; i++) {
    if ([s characterAtIndex:i] != ' ') {
      ++len;
    } else if (i + 1 < [s length] && [s characterAtIndex:i + 1] != ' ') {
      len = 0;
    }
  }
  return len;
}