// 320. Generalized Abbreviation
// Difficulty : Medium

// Write a function to generate the generalized abbreviations of a word.

// Example:
// Given word = "word", return the following list (order does not matter):

// ["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d",
//     "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]

// Time:  O(n * 2^n)
// Space: O(n)

#import <Foundation/Foundation.h>

void generateAbbreviationsHelper(NSString* word, int i, NSString* curr, NSMutableArray** res) {
  if (i == word.length) {
    [*res addObject:[curr copy]];
    return;
  }
  generateAbbreviationsHelper(word, i + 1, [curr stringByAppendingFormat:@"%c", [word characterAtIndex:i]], res);
  if (![curr length] || !isdigit([curr characterAtIndex:curr.length - 1])) {
    for (int len = 1; i + len <= word.length; ++len) {
      generateAbbreviationsHelper(word, i + len, [curr stringByAppendingFormat:@"%d", len], res);
    }
  }
}

NSArray* generateAbbreviations(NSString* word) {
  NSMutableArray* res = @[].mutableCopy;
  generateAbbreviationsHelper(word, 0, @"", &res);
  return res;
}