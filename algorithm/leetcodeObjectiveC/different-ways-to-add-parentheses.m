// 241. Different Ways to Add Parentheses
// Difficulty: Medium

// Given a string of numbers and operators,
// return all possible results from computing all the different possible ways to group numbers and operators.
// The valid operators are +, - and *.

// Example 1
// Input: "2-1-1".

// ((2-1)-1) = 0
// (2-(1-1)) = 2
// Output: [0, 2]

// Example 2
// Input: "2*3-4*5"

// (2*(3-(4*5))) = -34
// ((2*3)-(4*5)) = -14
// ((2*(3-4))*5) = -10
// (2*((3-4)*5)) = -10
// (((2*3)-4)*5) = 10
// Output: [-34, -14, -10, -10, 10]

// Time:  O(n * (C(2n, n) - C(2n, n - 1))), this is at most
// Space: O(n * (C(2n, n) - C(2n, n - 1)))

#import <Foundation/Foundation.h>

NSArray* diffWaysToComputeHelper(NSString* input, const NSInteger start, const NSInteger end, NSMutableArray** lookup) {
  if ([(*lookup)[start][end] count]) {
    return (*lookup)[start][end];
  }
  NSMutableArray* result = @[].mutableCopy;
  for (NSInteger i = start; i < end; ++i) {
    if ([@"+-*" rangeOfString:[input substringWithRange:NSMakeRange(i, 1)]].location != NSNotFound) {
      for (id left in diffWaysToComputeHelper(input, start, i, lookup)) {
        for (id right in diffWaysToComputeHelper(input, i + 1, end, lookup)) {
          switch ([input characterAtIndex:i]) {
            case '+' : [result addObject:@([left intValue] + [right intValue])]; break;
            case '-' : [result addObject:@([left intValue] - [right intValue])]; break;
            case '*' : [result addObject:@([left intValue] * [right intValue])]; break;
          }
        }
      }
    }
  }
  // If the input string contains only number.
  if (![result count]) {
    [result addObject:@([[input substringWithRange:NSMakeRange(start, end - start)] intValue])];
  }
  return (*lookup)[start][end] = result;
}

NSArray* diffWaysToCompute(NSString* input) {
  NSMutableArray* lookup = @[].mutableCopy;
  for (NSInteger i = 0; i <= input.length; i++) {
    [lookup addObject:@[].mutableCopy];
    for (NSInteger j = 0; j <= input.length; j++) {
      [lookup[i] addObject:@[].mutableCopy];
    }
  }
  return diffWaysToComputeHelper(input, 0, input.length, &lookup);
}

