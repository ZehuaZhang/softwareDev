// 14. Longest Common Prefix
// Difficulty: Easy

// Write a function to find the longest common prefix string amongst an array of strings.

// Time:  O(n * k), k is the length of the common prefix
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* longestCommonPrefix(NSArray* strs) {
  if ([strs count] == 0) {
    return @"";
  }
  
  for (int j = 0; j < [strs[0] length]; ++j) {
    for (int i = 0; i < [strs count]; i++) {
      if (j == [strs[i] length] || [strs[i] characterAtIndex:j] != [strs[0] characterAtIndex:j]) {
        return [strs[0] substringToIndex:j];
      }
    }
  }
  return strs[0];
}