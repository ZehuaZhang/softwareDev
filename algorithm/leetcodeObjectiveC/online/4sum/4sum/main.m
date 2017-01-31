//
//  main.m
//  4sum
//
//  Created by Tianji Li on 2015-02-10.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 https://oj.leetcode.com/problems/4sum/
 
 Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
 
 Note:
 Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
 The solution set must not contain duplicate quadruplets.
 For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
 
 A solution set is:
 (-1,  0, 0, 1)
 (-2, -1, 1, 2)
 (-2,  0, 0, 2)
 */

#import <Foundation/Foundation.h>

NSArray *sortedA(NSArray *a)
{
    NSArray *sorted = [a sortedArrayUsingComparator:
                       ^NSComparisonResult(id obj1, id obj2) {
                           if ([obj1 integerValue] < [obj2 integerValue]) {
                               return NSOrderedAscending;
                           } else if ([obj1 integerValue] > [obj2 integerValue]) {
                               return NSOrderedDescending;
                           } else {
                               return NSOrderedSame;
                           }
                       }];
    return sorted;
}

NSSet *fourSum(NSArray *a, NSInteger target)
{
    NSInteger sizeA = [a count];
    
    if ( sizeA < 4 )
        return nil;
    
    // an array to hold results
    NSMutableSet *res = [[NSMutableSet alloc] init];
    
    // sort a in O(nlogn) time
    NSArray *sorted = sortedA(a);
    
    // move first and forth indices from front and end towards middle
    NSInteger firstIdx = 0;
    NSInteger forthIdx = sizeA - 1;
    while ( firstIdx + 3 <= forthIdx ) {
        NSInteger secondIdx = firstIdx + 1;
        NSInteger thirdIdx = forthIdx - 1;
        while ( secondIdx < thirdIdx ) {
            NSNumber *firstNumber = sorted[firstIdx];
            NSNumber *secondNumber = sorted[secondIdx];
            NSNumber *thirdNumber = sorted[thirdIdx];
            NSNumber *forthNumber = sorted[forthIdx];
            NSInteger firstValue = [firstNumber integerValue];
            NSInteger secondValue = [secondNumber integerValue];
            NSInteger thirdValue = [thirdNumber integerValue];
            NSInteger forthValue = [forthNumber integerValue];
            NSInteger sum4 = firstValue + secondValue + thirdValue + forthValue;
            if ( sum4 == target ) {
                [res addObject:@[firstNumber, secondNumber, thirdNumber, forthNumber]];
                secondIdx ++;
                thirdIdx --;
            } else if ( sum4 > target ) {
                thirdIdx --;
            } else {
                secondIdx ++;
            }
        }
        firstIdx ++;
        forthIdx --;
    }
    
    return res;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *a = @[@1, @0, @-1, @0, @-2, @2];
        NSLog(@"%@", fourSum(a, 0));
    }
    return 0;
}
