//
//  main.m
//  PlusOne
//
//  Created by Tianli Zhang on 2016-12-18.
//  Copyright (c) 2016 Tianli Zhang. All rights reserved.

/**
 Question:
 Given a number represented as an array of digits, plus one to the number.
 Example Questions Candidate Might Ask:
 Q: Could the number be negative?
 A: No. Assume it is a non-negative number.
 Q: How are the digits ordered in the list? For example, is the number 12 represented by [1,2] or [2,1]?
 A: The digits are stored such that the most significant digit is at the head of the list.
 Q: Could the number contain leading zeros, such as [0,0,1]? A: No.
 */
#import <Foundation/Foundation.h>

NSArray* plusOne(NSArray *a)
{
    NSMutableArray *arr = a.mutableCopy;
    NSUInteger len = a.count;
    NSUInteger i = len-1;
    bool carryFlag = NO;
    while(i>0) {
        if ([arr[i] intValue]+1 == 10) {
            arr[i] = @0;
            i--;
            carryFlag = YES;
        }else{
            arr[i] = @([arr[i] intValue]+1);
            carryFlag = NO;
            break;
        }
    }
    
    if (carryFlag) {
        arr[0] = @1;
        [arr addObject:@0];
    }
    
    return [arr copy];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *a = @[@1,@4,@5,@6];
        NSLog(@"a=%@, PlusOne=%@", [a description], [plusOne(a) description]);
        a = @[@1,@4,@5,@9];
        NSLog(@"a=%@, PlusOne=%@", [a description], [plusOne(a) description]);
        a = @[@9,@9,@9,@9];
        NSLog(@"a=%@, PlusOne=%@", [a description], [plusOne(a) description]);
    }
    return 0;
}
