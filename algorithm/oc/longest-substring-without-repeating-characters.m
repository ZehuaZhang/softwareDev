// 3. Longest Substring Without Repeating Characters
// Difficulty: Medium

// Given a string, find the length of the longest substring without repeating characters.

// Examples:
// Given "abcabcbb", the answer is "abc", which the length is 3.

// Given "bbbbb", the answer is "b", with the length of 1.

// Given "pwwkew", the answer is "wke", with the length of 3. 
// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSUInteger lenOfLongestStr(NSString *s) {
  NSMutableDictionary* charMap = @{}.mutableCopy;
  NSInteger maxLen = 0;
  NSInteger start = 0;
  for (NSInteger end = 0; end < [s length]; end++) {
    char c = [s characterAtIndex:end];
    
    if (charMap[@(c)] != nil && [charMap[@(c)] integerValue] >= start) {
      start = [charMap[@(c)] integerValue] + 1;
    }
    charMap[@(c)] = @(end);
    
    maxLen = MAX(maxLen, end - start + 1);
  }
  
  return maxLen;
}