// 165. Compare Version Numbers
// Difficulty: Easy

// Compare two version numbers version1 and version2.
// If version1 > version2 return 1, if version1 < version2 return -1, otherwise return 0.

// You may assume that the version strings are non-empty and contain only digits and the . character.
// The . character does not represent a decimal point and is used to separate number sequences.
// For instance, 2.5 is not "two and a half" or "half way to version three", it is the fifth second-level revision of the second first-level revision.

// Here is an example of version numbers ordering:

// 0.1 < 1.1 < 1.2 < 13.37

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int compareVersion(NSString* version1, NSString* version2) {
  NSArray* ver1 = [version1 componentsSeparatedByString:@"."];
  NSArray* ver2 = [version2 componentsSeparatedByString:@"."];
  
  for (int i = 0; i < [ver1 count] || i < [ver2 count]; ++i) {
    int v1 = i >= [ver1 count] ? 0 : [ver1[i] intValue];
    int v2 = i >= [ver2 count] ? 0 : [ver2[i] intValue];
    if (v1 != v2) {
      return v1 > v2 ? 1 : -1;
    }
  }
  return 0;
}
