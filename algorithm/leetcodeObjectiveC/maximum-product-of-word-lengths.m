// 318. Maximum Product of Word Lengths
// Difficulty: Medium

// Given a string array words, find the maximum value of length(word[i]) * length(word[j])
// where the two words do not share common letters. You may assume that each word will contain only lower case letters.
// If no such two words exist, return 0.

// Example 1:
// Given ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
// Return 16
// The two words can be "abcw", "xtfn".

// Example 2:
// Given ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
// Return 4
// The two words can be "ab", "cd".

// Example 3:
// Given ["a", "aa", "aaa", "aaaa"]
// Return 0
// No such pair of words.

// Time:  O(nlogn) ~ O(n^2)
// Space: O(n)
// Sorting + Pruning + Bit Manipulation

#import <Foundation/Foundation.h>

NSInteger maxProduct(NSArray* words) {
  NSArray* sorted = [words sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [@([obj2 length]) compare:@([obj1 length])];
  }];
  int bits[words.count];
  for (int i = 0; i < sorted.count; ++i) {
    for (int j = 0; j < [sorted[i] length]; j++) {
      bits[i] |= (1 << ([sorted[i] characterAtIndex:j] - 'a'));
    }
  }
  NSInteger maxProduct = 0;
  for (int i = 0; i + 1 < sorted.count && pow([sorted[i] length], 2) > maxProduct; ++i) {
    for (int j = i + 1; j < sorted.count && [sorted[i] length] * [sorted[j] length] > maxProduct; ++j) {
      if (!(bits[i] & bits[j])) {
        maxProduct = [sorted[i] length] * [sorted[j] length];
      }
    }
  }
  return maxProduct;
}
