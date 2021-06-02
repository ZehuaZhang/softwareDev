// 387. First Unique Character in a String
// Difficulty: Easy

// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

// Examples:

// s = "leetcode"
// return 0.

// s = "loveleetcode",
// return 2.
// Note: You may assume the string contain only lowercase letters.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

int firstUniqChar(NSString* s) {
  NSMutableDictionary* charCount = @{}.mutableCopy;
  for (int i = 0; i < s.length; i++) {
    charCount[[s substringWithRange:NSMakeRange(i, 1)]] = @([charCount[[s substringWithRange:NSMakeRange(i, 1)]] intValue] + 1);
  }
  for (int i = 0; i < s.length; ++i) {
    if ([charCount[[s substringWithRange:NSMakeRange(i, 1)]] intValue] == 1) {
      return i;
    }
  }
  return -1;
}
