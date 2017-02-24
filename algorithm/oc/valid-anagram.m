// 242. Valid Anagram
// Difficulty: Easy

// Given two strings s and t, write a function to determine if t is an anagram of s.

// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.

// Note:
// You may assume the string contains only lowercase alphabets.

// Follow up:
// What if the inputs contain unicode characters? How would you adapt your solution to such case?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isAnagram(NSString* s, NSString* t) {
  if (s.length != t.length) {
    return NO;
  }
  NSMutableDictionary* count = @{}.mutableCopy;
  
  [s enumerateSubstringsInRange:NSMakeRange(0, s.length)
                        options:NSStringEnumerationByComposedCharacterSequences
                     usingBlock:^(NSString * _Nullable substring, NSRange substringRange, NSRange enclosingRange, BOOL * _Nonnull stop) {
                       count[[substring lowercaseString]] = count[[substring lowercaseString]] ? @([count[[substring lowercaseString]] intValue] + 1) : @1;
                     }];
  
  __block BOOL ans = YES;
  
  [t enumerateSubstringsInRange:NSMakeRange(0, s.length)
                        options:NSStringEnumerationByComposedCharacterSequences
                     usingBlock:^(NSString * _Nullable substring, NSRange substringRange, NSRange enclosingRange, BOOL * _Nonnull stop) {
                       if (count[[substring lowercaseString]]) {
                         count[[substring lowercaseString]] = @([count[[substring lowercaseString]] intValue] - 1);
                         if ([count[[substring lowercaseString]] isLessThan:@0]) {
                           *stop = YES;
                           ans = NO;
                         }
                       }
                     }];
  
  return YES;
}