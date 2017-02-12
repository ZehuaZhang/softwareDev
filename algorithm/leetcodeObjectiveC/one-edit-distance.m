// 161. One Edit Distance
// Difficulty: Medium

// Given two strings S and T, determine if they are both one edit distance apart.

// Time:  O(m + n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isOneEditDistance(NSString* s, NSString* t) {
  for (int i = 0; i < MIN([s length], [t length]); ++i) {
    if ([s characterAtIndex:i] != [t characterAtIndex:i]) {
      if ([s length] == [t length]) {
        return [[s substringFromIndex:i + 1] isEqualToString: [t substringFromIndex:i + 1]];
      } else if ([s length] < [t length]) {
        return [[s substringFromIndex:i] isEqualToString: [t substringFromIndex:i + 1]];
      } else {
        return [[s substringFromIndex:i + 1] isEqualToString: [t substringFromIndex:i]];
      }
    }
  }
  return labs((NSInteger*)[s length] - (NSInteger*)[t length]) == 1;   // both strings are the same, except last character(s) of longer string
}
