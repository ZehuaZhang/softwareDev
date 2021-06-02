// 168. Excel Sheet Column Title
// Difficulty: Easy

// Given a positive integer, return its corresponding column title as appear in an Excel sheet.

// For example:

//     1 -> A
//     2 -> B
//     3 -> C
//     ...
//     26 -> Z
//     27 -> AA
//     28 -> AB

// Time:  O(logn)
// Space: O(1)

// Iterative solution.

#import <Foundation/Foundation.h>

NSString* convertToTitle(NSInteger n) {
  NSMutableString* title = @"".mutableCopy;
  
  while (n--) {
    [title appendFormat:@"%c", n % 26 + 'A'];
    n /= 26;
  }
  
  NSMutableString* reverse = [NSMutableString stringWithCapacity:[title length]];
  
  [title enumerateSubstringsInRange:NSMakeRange(0, [title length])
                            options:(NSStringEnumerationReverse | NSStringEnumerationByComposedCharacterSequences)
                         usingBlock:^(NSString *substring, NSRange substringRange, NSRange enclosingRange, BOOL *stop) {
                           [reverse appendString:substring];
                         }];
  
  return [reverse copy];
}