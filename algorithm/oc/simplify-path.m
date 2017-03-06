// 71. Simplify Path
// Difficulty: Medium

// Given an absolute path for a file (Unix-style), simplify it.

// For example,
// path = "/home/", => "/home"
// path = "/a/./b/../../c/", => "/c"

// Corner Cases:
// Did you consider the case where path = "/../"?
// In this case, you should return "/".
// Another corner case is the path might contain multiple slashes '/' together, such as "/home//foo/".
// In this case, you should ignore redundant slashes and return "/home/foo".

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

NSString* simplifyPath(NSString* path) {
  NSMutableArray* dirs = @[].mutableCopy;
  NSArray* tokens = [[path stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]] componentsSeparatedByString:@"/"];
  for (int i = 0; i < [tokens count]; i++) {
    if ([tokens[i] isEqual: @".."] && [dirs count]) {
      [dirs removeLastObject];
    } else if ([tokens[i] isNotEqualTo: @".."] && [tokens[i] isNotEqualTo: @"."] && [tokens[i] length]) {
      [dirs addObject:tokens[i]];
    }
  }
  return [@"/" stringByAppendingString:[dirs componentsJoinedByString:@"/"]];
}
