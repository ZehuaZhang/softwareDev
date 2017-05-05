// 171. Excel Sheet Column Number
// Difficulty: Easy

// Related to question Excel Sheet Column Title

// Given a column title as appear in an Excel sheet, return its corresponding column number.

// For example:

//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int titleToNumber(NSString* s) {
  int number = 0;
  for (int i = 0; i < [s length]; i++) {
    number = number * 26 + [s characterAtIndex:i]  - 'A' + 1;
  }
  return number;
}