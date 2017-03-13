// 227. Basic Calculator II
// Difficulty: Medium

// Implement a basic calculator to evaluate a simple expression string.

// The expression string contains only non-negative integers, +, -, *, / operators and empty spaces .
// The integer division should truncate toward zero.

// You may assume that the given expression is always valid.

// Some examples:
// "3+2*2" = 7
// " 3/2 " = 1
// " 3+5 / 2 " = 5

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (BOOL)isEmpty;
-(NSInteger)count;

@end

@implementation Stack

NSMutableArray* _array;

- (instancetype)init {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
  }
  return self;
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array lastObject];
  if (element) {
    [_array removeLastObject];
  }
  return element;
}

- (id)top {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

-(NSInteger)count {
  return [_array count];
}

@end

#pragma mark Solution

// Support +, -, *, /, (, ).

bool isOperator(NSString* op) {
  return [@"+-*/(" rangeOfString:op].location != NSNotFound;
}

int precedence(const char op) {
  switch(op) {
    case '+' : return 1;
    case '-' : return 1;
    case '*' : return 2;
    case '/' : return 2;
    case '(' : return 3;
  }
  return 0;
}

void compute(Stack* operands, Stack* operators) {
  const int y = [[operands pop] intValue];
  const int x = [[operands pop] intValue];
  const char op = [[operators pop] charValue];
  
  switch (op) {
    case '+' : [operands push:@(x + y)]; break;
    case '-' : [operands push:@(x - y)]; break;
    case '*' : [operands push:@(x * y)]; break;
    case '/' : [operands push:@(x / y)]; break;
  }
}

int calculate(NSString* s) {
  Stack* operands = [[Stack alloc] init];
  Stack* operators = [[Stack alloc] init];
  
  int d = 0;
  for (int i = 0; i < s.length; ++i) {
    if (isdigit([s characterAtIndex:i])) {
      d = d * 10 + [s characterAtIndex:i] - '0';
      if (i == s.length - 1 || !isdigit([s characterAtIndex:i + 1])) {
        [operands push:@(d)];
        d = 0;
      }
    } else if (isOperator([s substringWithRange:NSMakeRange(i, 1)])) {
      while (![operators isEmpty] && precedence([s characterAtIndex:i]) <= precedence([[operators top] charValue])) {
        compute(operands, operators);
      }
      [operators push:@([s characterAtIndex:i])];
    } else if ([s characterAtIndex:i] == ')') {
      // operators at least one element, i.e. ')'.
      while (![[operators top] isEqual: @('(')]) {
        compute(operands, operators);
      }
      [operators pop];
    }
  }
  while (![operators isEmpty]) {
    compute(operands, operators);
  }
  return [[operands top] intValue];
}
