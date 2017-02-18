// 139. Word Break
// Difficulty: Medium

// Given a string s and a dictionary of words dict,
// determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// For example, given
// s = "leetcode",
// dict = ["leet", "code"].

// Return true because "leetcode" can be segmented as "leet code".

// Time:  O(n * l^2), l is the max length of the words.
// Space: O(n)

#import <Foundation/Foundation.h>

BOOL wordBreak(NSString* s, NSSet* wordDict) {
  int f[s.length + 1];  // before index can break into words
  memset(f, NO, sizeof(BOOL) * (s.length + 1));
  f[0] = YES;
  
  for (int i = 1; i <= s.length; i++) {
    for (int j = 0; j < i; j++) {
      if (f[j] && [wordDict containsObject:[s substringWithRange:NSMakeRange(j, i - j)]]) {
        f[i] = YES;
        break;
      }
    }
  }
  return f[s.length];
}
