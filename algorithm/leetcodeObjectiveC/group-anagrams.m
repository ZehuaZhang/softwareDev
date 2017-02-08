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
    NSMutableArray* charArr = [NSMutableArray arrayWithCapacity:[strs[i] length]];
    for (int j = 0; j < [strs[i] length]; j++) {
      [charArr addObject:[strs[i] substringWithRange:NSMakeRange(j, 1)]];
    }
    NSString* sortedStr = [[charArr sortedArrayUsingSelector:@selector(localizedCaseInsensitiveCompare:)] componentsJoinedByString:@""];
    
    NSMutableArray* valueArr = [groups objectForKey:sortedStr];
    if (valueArr) {
      [valueArr addObject:strs[i]];
    } else {
      valueArr = [NSMutableArray arrayWithObject:strs[i]];
    }
    [groups setObject:valueArr forKey:sortedStr];
  }
  
  __block NSMutableArray* result;
  [groups enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    [result addObject:obj];
  }];
  return result;
}
