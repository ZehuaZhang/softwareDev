// 150. Evaluate Reverse Polish Notation
// Difficulty: Medium

// Evaluate the value of an arithmetic expression in Reverse Polish Notation.

// Valid operators are +, -, *, /. Each operand may be an integer or another expression.

// Some examples:
//   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
//   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

bool isOperator(NSString* op) {
  return op.length == 1 && [@"+-*/" rangeOfString:op].location != NSNotFound;
}

int evalRPN(NSArray* tokens) {
  if (![tokens count]) {
    return 0;
  }
  NSMutableArray* stack = @[].mutableCopy;
  for (id token in tokens) {
    if (!isOperator(token)) {
      [stack addObject:@([token intValue])];
    } else {
      int y = [[stack lastObject] intValue]; [stack removeLastObject];
      int x = [[stack lastObject] intValue]; [stack removeLastObject];
      switch([token charValue]) {
        case '+' : x += y; break;
        case '-' : x -= y; break;
        case '*' : x *= y; break;
        case '/' : x /= y; break;
      }
      [stack addObject:@(x)];
    }
  }
  return [[stack lastObject] intValue];
}