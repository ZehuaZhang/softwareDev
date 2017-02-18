// 372. Super Pow
// Difficulty: Medium

// Your task is to calculate a^b mod 1337 where a is a positive integer and
// b is an extremely large positive integer given in the form of an array.

// Example1:
// a = 2
// b = [3]

// Result: 8

// Example2:
// a = 2
// b = [1,0]

// Result: 1024

// Time:  O(n), n is the size of b.
// Space: O(1)

#import <Foundation/Foundation.h>

int power(int x, int n, int mod) {
  if (n == 0) {
    return 1;
  }
  int half = power(x, n / 2, mod) % mod;
  if (n % 2 == 0) {
    return (half * half) % mod;
  }
  return (x * half * half) % mod;
}

int superPow(int a, NSArray* b) {
  int result = 1;
  for (id digit in b) {
    result = power(result, 10, 1337) * power(a, [digit intValue], 1337) % 1337;
  }
  return result;
}

