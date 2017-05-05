// 344. Reverse String
// Difficulty: Easy

// Write a function that takes a string as input and returns the string reversed.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* reverseString(NSString* s) {
  return [[[[s componentsSeparatedByString:@""] reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
}