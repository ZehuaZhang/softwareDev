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

NSString *alnum(NSString *s) {
  NSMutableString *alnumS = @"".mutableCopy;
  
  for (int i = 0; i < [s length]; i++) {
    if (isalnum([s characterAtIndex:i])) {
      [alnumS appendFormat:@"%c", [s characterAtIndex:i]];
    }
  }
  return [alnumS copy];
}

BOOL validPalindrome(NSString *s) {
  NSString *alnumLowerCaseS = alnum([s lowercaseString]);
  
  NSInteger left = 0;
  NSInteger right = [alnumLowerCaseS length] - 1;
  
  while (left < right) {
    if ([alnumLowerCaseS characterAtIndex:left] != [alnumLowerCaseS characterAtIndex:right]) {
      return false;
    } else {
      left++;
      right--;
    }
  }
  return true;
}

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSLog(@"isPalin = %d", validPalindrome(@""));
    NSLog(@"isPalin = %d", validPalindrome(@"!!!"));
    NSLog(@"isPalin = %d", validPalindrome(@"a"));
    NSLog(@"isPalin = %d", validPalindrome(@"ab"));
    NSLog(@"isPalin = %d", validPalindrome(@"a!"));
    NSLog(@"isPalin = %d", validPalindrome(@"a!ba"));
    NSLog(@"isPalin = %d", validPalindrome(@"A man, a plan, a canal: Panama"));
    NSLog(@"isPalin = %d", validPalindrome(@"race a car"));
    NSLog(@"isPalin = %d", validPalindrome(@"racecar"));
    NSLog(@"isPalin = %d", validPalindrome(@"race  car"));
  }
  return 0;
}
