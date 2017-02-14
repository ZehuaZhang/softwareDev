// 267. Palindrome Permutation II
// Difficulty : Medium

// Given a string s, return all the palindromic permutations (without duplicates) of it.
// Return an empty list if no palindromic permutation could be form.

// For example:

// Given s = "aabb", return ["abba", "baab"].

// Given s = "abc", return [].

// Hint:
// If a palindromic permutation exists, we just need to generate the first half of the string.
// To generate all distinct permutations of a (half of) string, use a similar approach from:
// Permutations II or Next Permutation.

// Time:  O(n * n!)
// Space: O(n)

#import <Foundation/Foundation.h>

void permuteHelper(NSString* chars, BOOL *visited, NSString* path, NSMutableArray** ans) {
  if ([chars length] == [path length]) {
    [*ans addObject:[path mutableCopy]];
    return;
  }
  
  for (NSInteger i = 0; i < [chars length]; i++) {
    if (!visited[i]) {
      visited[i] = YES;
      permuteHelper(chars, visited, [path stringByAppendingFormat:@"%c", [chars characterAtIndex:i]], ans);
      visited[i] = NO;
    }
  }
}

NSArray* generatePalindromes(NSString* s) {
  if (![s length]) {
    return @[];
  }
  NSMutableDictionary* cnt = @{}.mutableCopy;
  for (int i = 0; i < s.length; i++) {
    cnt[[s substringWithRange:NSMakeRange(i, 1)]] = @([cnt[[s substringWithRange:NSMakeRange(i, 1)]] intValue] + 1);
  }
  NSMutableString* mid = @"".mutableCopy;
  NSMutableString* chars = @"".mutableCopy;
  for (id key in cnt) {
    if ([cnt[key] intValue] % 2) {
      if (!mid.length) {
        [mid appendString:key];
      } else {  // The odd occurance of chars in palindrome is at most once.
        return @[];
      }
    }
    chars = [[chars stringByPaddingToLength:chars.length + [cnt[key] intValue] / 2 withString:key startingAtIndex:0] mutableCopy];
  }
  // permute
  BOOL visited[chars.length];
  memset(visited, NO, sizeof(BOOL) * (chars.length));
  NSMutableArray* ans = @[].mutableCopy;
  permuteHelper(chars, visited, @"", &ans);
  // append mid + reverseChars
  for (int i = 0; i < [ans count]; i++) {
    NSString* reverseChars = [[[[ans[i] componentsSeparatedByString:@""] reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
    [ans[i] appendFormat:@"%@%@", mid, reverseChars];
  }
  return ans;
}