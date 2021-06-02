// 91. Decode Ways
// Difficulty: Medium

// A message containing letters from A-Z is being encoded to numbers using the following mapping:

// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// Given an encoded message containing digits, determine the total number of ways to decode it.

// For example,
// Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).

// The number of ways decoding "12" is 2.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int numDecodings(NSString* s) {
  if (![s length]) {
    return 0;
  }
  
  int prev = 0; // f[n - 2]
  int curr = 1;  // f[n - 1]
  
  for (int i = 0; i < [s length]; ++i) {
    if ([s characterAtIndex:i] == '0') {
      curr = 0; // f[n - 1] = 0
    }
    if (i == 0 || !([s characterAtIndex:i - 1] == '1' || ([s characterAtIndex:i - 1] == '2' && [s characterAtIndex:i] <= '6'))) {
      prev = 0; // f[n - 2] = 0
    }
    
    int nextPrev = curr;
    curr += prev; // f[n] = f[n - 1] + f[n - 2]
    prev = nextPrev;
  }
  
  return curr;
}
