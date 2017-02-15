// 271. Encode and Decode Strings
// Difficulty: Medium

// Design an algorithm to encode a list of strings to a string.
// The encoded string is then sent over the network and is decoded back to the original list of strings.

// Machine 1 (sender) has the function:

// string encode(vector<string> strs) {
//   // ... your code
//   return encoded_string;
// }
// Machine 2 (receiver) has the function:

// vector<string> decode(string s) {
//   //... your code
//   return strs;
// }

// So Machine 1 does:
// string encoded_string = encode(strs);

// and Machine 2 does:
// vector<string> strs2 = decode(encoded_string);

// strs2 in Machine 2 should be the same as strs in Machine 1.

// Implement the encode and decode methods.

// Note:
// The string may contain any possible characters out of 256 valid ascii characters.
// Your algorithm should be generalized enough to work on any possible characters.
// Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.
// Do not rely on any library method such as eval or serialize methods. You should implement your own encode/decode algorithm.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

// Encodes a list of strings to a single string.
NSString* encode(NSArray* strs) {
  NSMutableString* s = @"".mutableCopy;
  for (NSString*  str in strs) {
    [s appendFormat:@"%ld/%@", str.length, str];
  }
  return s;
}

// Decodes a single string to a list of strings.
NSArray* decode(NSString* s) {
  NSMutableArray* strs = @[].mutableCopy;
  for (NSInteger searchPos = 0; searchPos < s.length;) {
    NSInteger slashPos = [s rangeOfString:@"/" options:0 range:NSMakeRange(searchPos, s.length - searchPos)].location;
    NSInteger len = [[s substringWithRange:NSMakeRange(searchPos, slashPos - searchPos)] integerValue];
    [strs addObject:[s substringWithRange:NSMakeRange(++slashPos, len)]];
    searchPos = slashPos + len;
  }
  return strs;
}
