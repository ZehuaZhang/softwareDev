// 247. Strobogrammatic Number II
// Difficulty : Medium

// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Find all strobogrammatic numbers that are of length = n.

// For example,
// Given n = 2, return ["11","69","88","96"].

// Hint:
// Try to use recursion and notice that it should recurse with n - 2 instead of n - 1

// Time:  O(n^2 * 5^(n/2))
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* findStrobogrammaticHelper(const int n, int k, NSDictionary* lookup) {
  if (k == 0) {
    return @[@""];
  } else if (k == 1) {
    return @[@"0", @"1", @"8"];
  }
  NSMutableArray* result = @[].mutableCopy;
  for (id num in findStrobogrammaticHelper(n, k - 2, lookup)) {
    for (id key in lookup) {
      if (n != k || ![key isEqual:@"0"]) {
        [result addObject:[NSString stringWithFormat:@"%@%@%@", key, num, lookup[key]]];
      }
    }
  }
  return result;
}

NSArray* findStrobogrammatic(int n) {
  NSDictionary* lookup = @{@"0":@"0", @"1":@"1", @"6":@"9", @"8":@"8", @"9":@"6"};
  return findStrobogrammaticHelper(n, n, lookup);
}
  
