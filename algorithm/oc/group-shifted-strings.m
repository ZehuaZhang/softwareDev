// 249. Group Shifted Strings
// Difficulty : Easy

// Given a string, we can "shift" each of its letter to its successive letter, for example: "abc" -> "bcd".
// We can keep "shifting" which forms the sequence:

// "abc" -> "bcd" -> ... -> "xyz"
// Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.

// For example, given: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"],
// Return:

// [
//   ["abc","bcd","xyz"],
//   ["az","ba"],
//   ["acef"],
//   ["a","z"]
// ]

// Note: For the return value, each inner list elements must follow the lexicographic order.

// Time:  O(nlogn)
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* groupStrings(NSArray* strings) {
  NSMutableDictionary* groups = @{}.mutableCopy;
  for (NSString* str in strings) {
    NSMutableString* hash = @"".mutableCopy;
    [str enumerateSubstringsInRange:NSMakeRange(0, str.length)
                            options:NSStringEnumerationByComposedCharacterSequences
                         usingBlock:^(NSString * _Nullable substring, NSRange substringRange, NSRange enclosingRange, BOOL * _Nonnull stop) {
                           [hash appendFormat:@"%c", ([str characterAtIndex:substringRange.location] - [str characterAtIndex:0] + 26) % 26 + 'a'];
                         }];
    if (!groups[hash]) {
      groups[hash] = @[].mutableCopy;
    }
    [groups[hash] addObject:str];
  }
  NSMutableArray* result = @[].mutableCopy;
  for (id key in groups) {
    [result addObject:groups[key]];
  }
  return result;
}
