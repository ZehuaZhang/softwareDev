// 205. Isomorphic Strings
// Difficulty: Easy

// Given two strings s and t, determine if they are isomorphic.

// Two strings are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters.
// No two characters may map to the same character but a character may map to itself.

// For example,
// Given "egg", "add", return true.

// Given "foo", "bar", return false.

// Given "paper", "title", return true.

// Note:
// You may assume both s and t have the same length.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isIsomorphic(NSString* s, NSString* t) {
  if (s.length != t.length) {
    return NO;
  }
  int s2t[256], t2s[256];
  memset(s2t, 0, sizeof(int) * 256);
  memset(t2s, 0, sizeof(int) * 256);
  for (int i = 0; i < s.length; ++i) {
    if (s2t[[s characterAtIndex:i]] == 0 && t2s[[t characterAtIndex:i]] == 0) {
      s2t[[s characterAtIndex:i]] = [t characterAtIndex:i];
      t2s[[t characterAtIndex:i]] = [s characterAtIndex:i];
    } else if (s2t[[s characterAtIndex:i]] != [t characterAtIndex:i]) {
      return NO;
    }
  }
  return YES;
}