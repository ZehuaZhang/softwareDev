// 293. Flip Game
// Difficulty: Easy

// You are playing the following Flip Game with your friend: Given a string that contains only these two characters: + and -, you and your friend take turns to flip twoconsecutive "++" into "--". The game ends when a person can no longer make a move and therefore the other person will be the winner.

// Write a function to compute all possible states of the string after one valid move.

// For example, given s = "++++", after one move, it may become one of the following states:

// [
//   "--++",
//   "+--+",
//   "++--"
// ]

// If there is no valid move, return an empty list [].

// Time:  O(c * n + n) = O(n * (c+1)), n is length of string, c is count of "++"
// Space: O(1), no extra space excluding the result which requires at most O(n^2) space

#import <Foundation/Foundation.h>

NSArray* generatePossibleNextMoves(NSString* s) {
  NSMutableArray* res = @[].mutableCopy;
  for (int i = 1; i < s.length; i++) {
    if ([s characterAtIndex:i] == '+' && [s characterAtIndex:i - 1] == '+') {
      [res addObject:[NSString stringWithFormat:@"%@%@%@", [s substringToIndex:i - 1], @"--", [s substringFromIndex:i + 1]]];
    }
  }
  return res;
}