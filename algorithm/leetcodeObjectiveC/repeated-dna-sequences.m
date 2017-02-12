// 187. Repeated DNA Sequences
// Difficulty: Medium

// All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG".
// When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

// Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

// For example,

// Given s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",

// Return:
// ["AAAAACCCCC", "CCCCCAAAAA"].

#import <Foundation/Foundation.h>

NSArray* findRepeatedDnaSequences(NSString* s) {
  NSMutableArray* result = @[].mutableCopy;
  if ([s length] <= 10) {
    return result;
  }
  
  int currTen = 0, i = 0;
  // ASCII 3-lsb is different - A: 0100 0001　　C: 0100 0011　　G: 0100 0111　　T: 0101 0100
  while (i < 9) { // 9 times
    currTen = (currTen << 3) | ([s characterAtIndex:i++] & 7);
  }
  NSMutableDictionary* cnt = @{}.mutableCopy;
  int mask = 0x7FFFFFF;   // 27-lsb needs to left-shift by 3, for next ten
  while (i < [s length]) {
    currTen = ((currTen & mask) << 3) | ([s characterAtIndex:i++] & 7);
    cnt[@(currTen)] = cnt[@(currTen)] ? @([cnt[@(currTen)] intValue] + 1) : @0;
    if ([cnt[@(currTen)] intValue] == 2) {
      [result addObject:[s substringWithRange:NSMakeRange(i - 10, 10)]];
    }
  }
  return result;
}