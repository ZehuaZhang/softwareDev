//
//  main.m
//  searcInsertPosition
//
//  Created by Tianji Li on 2015-01-20.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a sorted array and a target value, return the index if the target is found. If not,
 return the index where it would be if it were inserted in order.
 You may assume no duplicates in the array.
 Here are few examples.
 [1,3,5,6], 5 → 2
 [1,3,5,6], 2 → 1
 [1,3,5,6], 7 → 4
 [1,3,5,6], 0 → 0
 */

#import <Foundation/Foundation.h>

NSInteger insertPosition(NSArray *A, NSInteger target)
{
    NSInteger pos = -1;
    NSInteger L = 0;
    NSInteger R = [A count] - 1;
    NSInteger M = L;
    
    NSInteger mValue;
    while ( L <= R ) {
        M = ( L + R ) / 2;
        mValue = [[A objectAtIndex:M] integerValue];
        if ( target == mValue ) {
            pos = M;
            break;
        } else if ( target > mValue )
            L = M + 1;
        else
            R = M - 1;
    }
    
    mValue = [[A objectAtIndex:M] integerValue];
    if (target > mValue) {
        pos = R + 1;
    } else if (target < mValue) {
        pos = L;
    }
    
    return pos;
}

NSInteger insertPosition2(NSArray *A, NSInteger target)
{
    NSInteger L = 0;
    NSInteger R = [A count] - 1;
    NSInteger M;
    
    while ( L < R ) {
        M = ( L + R ) / 2;
        NSInteger mValue = [[A objectAtIndex:M] integerValue];
        if ( target > mValue )
            L = M + 1;
        else
            R = M;
    }
    
    return [[A objectAtIndex:L] integerValue] < target ? L + 1 : L;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *A = @[@1, @3, @4, @5, @6];
        
        NSLog(@"insert position=%lu, position2=%lu", insertPosition(A, 5), insertPosition2(A, 5));
        NSLog(@"insert position=%lu, position2=%lu", insertPosition(A, 2), insertPosition2(A, 2));
        NSLog(@"insert position=%lu, position2=%lu", insertPosition(A, 7), insertPosition2(A, 7));
        NSLog(@"insert position=%lu, position2=%lu", insertPosition(A, 0), insertPosition2(A, 0));
        NSLog(@"insert position=%lu, position2=%lu", insertPosition(A, 4), insertPosition2(A, 4));
    }
    return 0;
}
