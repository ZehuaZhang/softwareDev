// 49. Group Anagrams
// Difficulty: Medium

// Given an array of strings, group anagrams together.

// For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Return:

// [
//   ["ate", "eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

// Note: All inputs will be in lower-case.

// Time:  O(n * glogg), g is the max size of groups.
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* groupAnagrams(NSArray* strs) {
  NSMutableDictionary* groups = @{}.mutableCopy;
  for (int i = 0; i < [strs count]; i++) {
    NSArray* charArr = [strs[i] componentsSeparatedByString:@""];
    NSString* sortedStr = [[charArr sortedArrayUsingSelector:@selector(localizedCaseInsensitiveCompare:)] componentsJoinedByString:@""];
    
    if (!groups[sortedStr]) {
      groups[sortedStr] = @[].mutableCopy;
    }
    [groups[sortedStr] addObject:strs[i]];
  }
  
  NSMutableArray* result = @[].mutableCopy;
  for (id key in groups) {
    [result addObject:groups[key]];
  }
  return result;
}
