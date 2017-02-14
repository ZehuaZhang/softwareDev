// 266. Palindrome Permutation
// Difficulty : Easy

// Given a string, determine if a permutation of the string could form a palindrome.

// For example,
// "code" -> False, "aab" -> True, "carerac" -> True.

// Hint:
// Consider the palindromes of odd vs even length. What difference do you notice?
// Count the frequency of each character.
// If each character occurs even number of times, then it must be a palindrome. How about character which occurs odd number of times?

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL canPermutePalindrome(NSString* s) {
  CFMutableBitVectorRef v = CFBitVectorCreateMutable(kCFAllocatorDefault, 256);
  CFBitVectorSetCount(v, 256);
  CFBitVectorSetAllBits(v, 0);

  for (int i = 0; i < s.length; i++) {
    CFBitVectorFlipBits(v, CFRangeMake([s characterAtIndex:i], 1));
  }
  return CFBitVectorGetCount(v) < 2;
}
