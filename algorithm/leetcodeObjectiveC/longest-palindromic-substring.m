// 5. Longest Palindromic Substring
// Difficulty: Medium

// Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.

// Subscribe to see which companies asked this question

// Time:  O(n^2)
// Space: O(n^2)

#import <Foundation/Foundation.h>

NSString* longestPalindrome(NSString* s) {
  NSInteger n = [s length];
  BOOL isPalindrome[n][n];   // [row, col] substring of s is palindrome
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      isPalindrome[i][j] = NO;
    }
  }
  
  int maxLen = 1, start = 0;
  for (int i = 0; i < n; i++) {
    isPalindrome[i][i] = YES;
    
    for (int j = 0; j < i; j++) { // [j, i]
      if ([s characterAtIndex: j] == [s characterAtIndex: i] && (i - j < 2 || isPalindrome[j + 1][i - 1])) {
        isPalindrome[j][i] = YES;
        
        if (maxLen < (i - j + 1)) {
          maxLen = i - j + 1;
          start = j;
        }
      }
    }
  }
  return [s substringWithRange:NSMakeRange(start, maxLen)];
}