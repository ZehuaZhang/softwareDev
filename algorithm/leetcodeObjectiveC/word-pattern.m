// 290. Word Pattern
// Difficulty: Easy

// Given a pattern and a string str, find if str follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

// Examples:
// pattern = "abba", str = "dog cat cat dog" should return true.
// pattern = "abba", str = "dog cat cat fish" should return false.
// pattern = "aaaa", str = "dog cat cat dog" should return false.
// pattern = "abba", str = "dog dog dog dog" should return false.

// Notes:
// You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.

// Time:  O(n)
// Space: O(c), c is unique count of pattern

#import <Foundation/Foundation.h>

BOOL wordPattern(NSString* pattern, NSString* str) {
  NSMutableDictionary* word2pattern = @{}.mutableCopy;
  NSArray* words = [str componentsSeparatedByString:@" "];
  if (pattern.length != words.count) {
    return NO;
  }
  for (int i = 0; i < words.count; i++) {
    if (!word2pattern[words[i]]) {
      word2pattern[words[i]] = [pattern substringWithRange:NSMakeRange(i, 1)];
    } else if (word2pattern[words[i]] != [pattern substringWithRange:NSMakeRange(i, 1)]) {
      return NO;
    }
  }
  return YES;
}
