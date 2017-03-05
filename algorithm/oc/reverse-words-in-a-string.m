// 151. Reverse Words in a String
// Difficulty: Medium

// Given an input string, reverse the string word by word.

// For example,
// Given s = "the sky is blue",
// return "blue is sky the".

// Clarification:
// What constitutes a word?
// A sequence of non-space characters constitutes a word.
// Could the input string contain leading or trailing spaces?
// Yes. However, your reversed string should not contain leading or trailing spaces.
// How about multiple spaces between two words?
// Reduce them to a single space in the reversed string.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSString *reversedString(NSString *s)
{
  NSMutableString* trimmedS = [s stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    while ([trimmedS rangeOfString:@"  "].location != NSNotFound) {
      trimmedS = [trimmedS  replaceOccurrencesOfString:@"  " withString:@" "];
    }
  return [[[[trimmedS componentsSeparatedByString:@" "] reverseObjectEnumerator] allObjects] componentsJoinedByString:@" "];
}