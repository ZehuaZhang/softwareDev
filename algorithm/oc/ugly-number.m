// 263. Ugly Number
// Difficulty: Easy

// Write a program to check whether a given number is an ugly number.

// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
// For example, 6, 8 are ugly while 14 is not ugly since it includes another prime factor 7.

// Note that 1 is typically treated as an ugly number.

// Time:  O(logn) = O(1)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isUgly(int num) {
  if (num <= 0) {
    return false;
  }
  for (id prime in @[@2, @3, @5]) {
    while (num % [prime intValue] == 0) {
      num /= [prime intValue];
    }
  }
  return num == 1;
}
