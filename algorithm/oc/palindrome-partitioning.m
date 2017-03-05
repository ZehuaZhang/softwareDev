// 131. Palindrome Partitioning
// Difficulty: Medium

// Given a string s, partition s such that every substring of the partition is a palindrome.

// Return all possible palindrome partitioning of s.

// For example, given s = "aab",
// Return

// [
//   ["aa","b"],
//   ["a","a","b"]
// ]

// Time : average: O(n^2), worst: O(n^2 * 2^n)
// Space: average: O(1), worst: O(2^n)

#import <Foundation/Foundation.h>

NSArray* partition(NSString* s) {
  BOOL p[s.length][s.length];
  memset(p, NO, sizeof(BOOL) * s.length * s.length);
  
  for (NSInteger i = s.length - 1; i >= 0; --i) {
    for (NSInteger j = i; j < s.length; ++j) {
      p[i][j] = [s characterAtIndex:i] == [s characterAtIndex:j] && ((j - i < 2) || p[i + 1][j - 1]);
    }
  }
  
  NSMutableArray* subPalins = @[].mutableCopy;
  for (NSInteger i = s.length - 1; i >= 0; --i) {
    subPalins[i] = @[].mutableCopy;
    for (NSInteger j = i; j < s.length; ++j) {
      if (p[i][j]) {
        NSString* palindrome = [s substringWithRange:NSMakeRange(i, j - i + 1)];
        if (j + 1 < s.length) {
          for (NSInteger k = 0; k < [subPalins[j + 1] length]; k++) {
            [subPalins[j + 1][k] insertObject:palindrome atIndex:0];
            [subPalins[i] addObject:[subPalins[j + 1][k] mutableCopy]];
          }
        } else {
          [subPalins[i] addObject:@[palindrome].mutableCopy];
        }
      }
    }
  }
  
  return subPalins[0];
}
