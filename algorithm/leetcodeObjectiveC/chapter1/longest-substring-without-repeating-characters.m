// 3. Longest Substring Without Repeating Characters
// Difficulty: Medium

// Given a string, find the length of the longest substring without repeating characters.

// Examples:
// Given "abcabcbb", the answer is "abc", which the length is 3.

// Given "bbbbb", the answer is "b", with the length of 1.

// Given "pwwkew", the answer is "wke", with the length of 3. 
// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSUInteger lenOfLongestStr(NSString *s) {
  NSMutableDictionary *charMap = [[NSMutableDictionary alloc] init];
  NSInteger lenS = [s length];
  NSInteger maxLen = 0;
  NSInteger start = 0;
  for (NSInteger end = 0; end < lenS; end++) {
    NSString *c = [s substringWithRange:NSMakeRange(end, 1)];
    NSNumber *cPos = [charMap objectForKey:c];
    
    if (cPos && [cPos integerValue] >= start) {
      start = [cPos integerValue] + 1;
    }
    
    [charMap setObject:[[NSNumber alloc] initWithInteger:end] forKey:c];
    
    maxLen = MAX(maxLen, end - start + 1);
  }
  
  return maxLen;
}

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSString *s = @"a";
    NSDate *start = [NSDate date];
    NSLog(@"%lu", lenOfLongestStr(s));
    NSDate *end = [NSDate date];
    NSLog(@"time for lenOfLongestStr is %fs",[end timeIntervalSinceDate:start]);
  }
  return 0;
}
