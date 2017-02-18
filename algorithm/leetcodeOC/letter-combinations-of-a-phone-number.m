// 17. Letter Combinations of a Phone Number
// Difficulty: Medium

// Given a digit string, return all possible letter combinations that the number could represent.

// Input:Digit string "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

// Note:
// Although the above answer is in lexicographical order, your answer could be in any order you want.

// Time Complexity: O(3^n)
// Space Complexity: O(n)

#import <Foundation/Foundation.h>

NSArray* keyboard;

void letterCombinationsHelper(NSString* digits, int curr, NSString* path, NSMutableArray** result) {
  if (curr == [digits length]) {
    [*result addObject:path];
    return;
  }
  NSString* currStr = keyboard[[digits characterAtIndex:curr] - '0'];
  for (int i = 0; i < [currStr length]; i++) {
    letterCombinationsHelper(digits, curr + 1, [NSString stringWithFormat:@"%@%c", path, [currStr characterAtIndex:i]], result);
  }
}

NSArray* letterCombinations(NSString* digits) {
  keyboard = @[@" ", @"", @"abc", @"def", @"ghi", @"jkl", @"mno", @"pqrs", @"tuv", @"wxyz"];
  NSMutableArray* result = @[].mutableCopy;
  letterCombinationsHelper(digits, 0, @"", &result);
  return [result copy];
}