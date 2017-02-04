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

NSArray* convertToWordsFromString(NSString* s){
  NSMutableArray *words= [[NSMutableArray alloc] init];
  NSMutableString *word = [[NSMutableString alloc] init];
  
  for (int i = 0; i < [s length]; i++){
    if (!isspace([s characterAtIndex:i])) {
      [word appendFormat:@"%c",[s characterAtIndex:i]];
    }else{
      if (i != 0) {
        [words addObject:word];
        word = @"".mutableCopy;
      }
    }
  }
  return [words copy];
}

NSString *reversedString2(NSString *s)
{
  NSMutableArray *words = convertToWordsFromString(s).mutableCopy;
  NSMutableString *reversedString = [[NSMutableString alloc] init];
  for (int i = 0; i < [words count]; i++) {
    [reversedString appendString:[words lastObject]];
    [reversedString appendString:@" "];
    [words removeLastObject];
  }
  
  return reversedString;
}