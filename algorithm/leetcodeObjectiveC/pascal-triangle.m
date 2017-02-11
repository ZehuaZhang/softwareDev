// 118. Pascal Triangle
// Difficulty: Easy
// Given numRows, generate the first numRows of Pascal triangle.

// For example, given numRows = 5,
// Return

// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]

// Time:  O(n^2)
// Space: O(n)

#import <Foundation/Foundation.h>

NSArray* generate(int numRows) {
  NSMutableArray* result = @[].mutableCopy;
  NSMutableArray* array = @[].mutableCopy;
  for (int i = 0; i < numRows; i++) {
    for (int j = i - 1; j > 0; j--) {
      array[j] = @([array[j - 1] integerValue] + [array[j] integerValue]);
    }
    [array addObject:@1];
    [result addObject:array];
  }
  return result;
}