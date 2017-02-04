// 66. Plus One
// Difficulty: Easy
// Given a non-negative number represented as an array of digits, plus one to the number.

// The digits are stored such that the most significant digit is at the head of the list.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* plusOne(NSArray* digits) {
  NSMutableArray *results = [digits mutableCopy];
  NSInteger carry = 1;
  for (NSInteger i = [digits count] - 1; i >= 0; i--) {
    NSInteger sum = [results[i] integerValue] + carry;
    results[i] = @(sum % 10);
    carry = sum / 10;
  }
  if (carry == 1) {
    [results insertObject:@1 atIndex:0];
  }
  return results;
}