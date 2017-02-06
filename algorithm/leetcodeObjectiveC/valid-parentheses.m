//20. Valid Parentheses
//Difficulty: Easy
//
//Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
//
//The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;

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

@end

#pragma mark Solution

BOOL isValid(NSString* s) {
  NSDictionary* dict = @{@")":@"(", @"]":@"[", @"}":@"{"};
  Stack* lefts = [[Stack alloc] init];
  
  for (NSInteger i = 0; i < [s length]; i++) {
    NSString* c = [NSString stringWithFormat:@"%c", [s characterAtIndex:i]];
    if ([dict objectForKey:c]) {
      if ([lefts isEmpty] || ![[lefts top] isEqualToString: [dict objectForKey:c]]) {
        return false;
      }
      [lefts pop];
    } else {
      [lefts push:c];
    }
  }
  return [lefts isEmpty];
}