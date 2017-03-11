// 125. Valid Palindrome
// Difficulty: Easy

// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

// For example,
// "A man, a plan, a canal: Panama" is a palindrome.
// "race a car" is not a palindrome.

// Note:
// Have you consider that the string might be empty? This is a good question to ask during an interview.

// For the purpose of this problem, we define empty string as valid palindrome.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL validPalindrome(NSString *s) {
  NSInteger left = 0;
  NSInteger right = [s length] - 1;
  
  while (left < right) {
    if (!isalnum([s characterAtIndex:left])) {
      left++;
    } else if (!isalnum([s characterAtIndex:right])) {
      right--;
    } else if (tolower([s characterAtIndex:left]) != tolower([s characterAtIndex:right])) {
      return NO;
    } else {
      left++;
      right--;
    }
  }
  return YES;
}