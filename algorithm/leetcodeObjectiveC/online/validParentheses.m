//
//  main.m
//  validParentheses
//
//  Created by Tianji Li on 2015-02-11.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**

 https://oj.leetcode.com/problems/valid-parentheses/
 
 Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 
 The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
 
 */
#import <Foundation/Foundation.h>

bool isValidParentheses(NSString* string){
    NSDictionary *dict = @{@"(":@")",@"[":@"]",@"{":@"}"};
    NSMutableArray *stack = @[].mutableCopy;
    
    for (NSUInteger i=0;i<string.length;i++) {
        NSString *c = [NSString stringWithFormat:@"%c",[string characterAtIndex:i]];
        if([dict objectForKey:c]){
            [stack addObject:c];
        }else{
            if(![[dict objectForKey:[stack lastObject]] isEqualToString:c]||stack.count == 0)
                return false;
            [stack removeLastObject];
        }
    }
    
    return stack.count == 0;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *s = @"[][][][][][]";
        NSLog(@"isValidParentheses = %d",isValidParentheses(s));
        s = @"[][][[[][][]";
        NSLog(@"isValidParentheses = %d",isValidParentheses(s));
        s = @"{][][][][][]";
        NSLog(@"isValidParentheses = %d",isValidParentheses(s));
    }
    return 0;
}
