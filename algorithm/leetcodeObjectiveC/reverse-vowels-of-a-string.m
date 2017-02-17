// 345. Reverse Vowels of a String
// Difficulty: Easy

// Write a function that takes a string as input and reverse only the vowels of a string.

// Example 1:
// Given s = "hello", return "holle".

// Example 2:
// Given s = "leetcode", return "leotcede".

// Note:
// The vowels does not include the letter "y".

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>
BOOL isVowel(char a){
  return [@"aeiou" rangeOfString:[NSString stringWithFormat:@"%c", a]].location != NSNotFound;
}
NSString* reverseVowels(NSString* s) {
  NSMutableString* str = s.mutableCopy;
  for (NSInteger i = 0, j = str.length - 1; i < j;) {
    if (!isVowel(tolower([s characterAtIndex:i]))) {
      ++i;
    } else if (!isVowel(tolower([s characterAtIndex:j]))) {
      --j;
    } else {
      NSString* iStr = [s substringWithRange:NSMakeRange(i, 1)];
      NSString* jStr = [s substringWithRange:NSMakeRange(j, 1)];
      [str replaceCharactersInRange:NSMakeRange(i++, 1) withString:jStr];
      [str replaceCharactersInRange:NSMakeRange(j--, 1) withString:iStr];
    }
  }
  return [str copy];
}