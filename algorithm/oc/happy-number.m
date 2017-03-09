// 202. Happy Number
// Difficulty: Easy

// Write an algorithm to determine if a number is "happy".

// A happy number is a number defined by the following process:
// Starting with any positive integer, replace the number by the sum of the squares of its digits,
// and repeat the process until the number equals 1 (where it will stay),
// or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

// Example: 19 is a happy number

// 1^2 + 9^2 = 82
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1

// Time:  O(k), where k is the steps to be happy number
// Space: O(k)

#import <Foundation/Foundation.h>

BOOL isHappy(int n) {
  NSMutableSet* visited = [[NSMutableSet alloc] init];
  while (n != 1 && ![visited containsObject:@(n)]) {
    [visited addObject:@(n)];
    // calculate happy number by definition
    int next = 0;
    while (n) {
      next += pow(n % 10, 2);
      n /= 10;
    }
    n = next;
  }
  return n == 1;
}
