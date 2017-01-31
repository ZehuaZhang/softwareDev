//
//  main.m
//  minInSortedArray
//
//  Created by Tianji Li on 2015-01-19.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Suppose a sorted array is rotated at some pivot unknown to you beforehand.
 (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
 Find the minimum element.
 You may assume no duplicate exists in the array.
 */

#import <Foundation/Foundation.h>

NSInteger minInSortedArray(NSArray *arr, NSInteger middleIdx)
{
    NSInteger leftIdx = middleIdx > 0 ? middleIdx - 1 : 0;
    NSInteger rightIdx = middleIdx < [arr count] - 1 ? middleIdx + 1 : [arr count] - 1;
    
    NSInteger middleValue = [[arr objectAtIndex:middleIdx] integerValue];
    NSInteger leftValue = [[arr objectAtIndex:leftIdx] integerValue];
    NSInteger rightValue = [[arr objectAtIndex:rightIdx] integerValue];
    
    /* .....5, 6, 7.....*/
    if ( leftValue >= middleValue && middleValue < rightValue )
        return middleValue;
    
    /* .....6, 7, 0.....*/
    if ( leftValue < middleValue && middleValue > rightValue )
        return rightValue;
    
    /* .....,2, 3 .....7 0*/
    if ( leftValue < middleValue && middleValue < rightValue && middleValue > [[arr lastObject] integerValue] )
        return minInSortedArray(arr, (rightIdx + [arr count] - 1)/ 2);
    
    return minInSortedArray(arr, leftIdx / 2);
}

NSInteger findMin(NSArray *arr)
{
    NSInteger L = 0;
    NSInteger R = arr.count - 1;
    while (L < R && [[arr objectAtIndex:L] integerValue] >= [[arr objectAtIndex:R] integerValue]) {
        NSInteger M = (L + R) / 2;
        if ( [[arr objectAtIndex:M] integerValue] > [[arr objectAtIndex:R] integerValue] ) {
            L = M + 1;
        } else {
            R = M;
        }
    }
    return [[arr objectAtIndex:L] integerValue];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSMutableArray *arr = @[@0, @1, @2, @3, @4, @5, @6].mutableCopy;
        
        for (NSInteger i = [arr count] - 1; i >= 0; i--) {
            
            NSLog(@"%min=%lu", minInSortedArray(arr, [arr count] / 2));
            NSLog(@"%min=%lu", findMin(arr));

            NSObject* obj = [arr lastObject];
            [arr insertObject:obj atIndex:0];
            [arr removeLastObject];
        }
        
    }
    return 0;
}
