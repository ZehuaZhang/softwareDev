//
//  main.m
//  3sum
//
//  Created by Tianji Li on 2015-02-10.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 https://oj.leetcode.com/problems/3sum/
 
 Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
 
 Note:
 Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)
 The solution set must not contain duplicate triplets.
 For example, given array S = {-1 0 1 2 -1 -4},
 
 A solution set is:
 (-1, 0, 1)
 (-1, -1, 2)
 
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

NSSet *threeSum(NSArray *a)
{
    NSInteger sizeA = [a count];
    
    if ( sizeA < 3 )
        return nil;

    // an array to hold results
    NSMutableSet *res = [[NSMutableSet alloc] init];
    
    // sort a in O(nlogn) time
    NSArray *sorted = sortedA(a);
    
    // fix first idx, move second and third when necesarry
    for (NSInteger firstIdx = 0; firstIdx < sizeA - 2; firstIdx++) {
        NSInteger secondIdx = firstIdx + 1;
        NSInteger thirdIdx = sizeA - 1;
        while ( secondIdx < thirdIdx ) {
            NSNumber *firstNumber = sorted[firstIdx];
            NSNumber *secondNumber = sorted[secondIdx];
            NSNumber *thirdNumber = sorted[thirdIdx];
            NSInteger firstValue = [firstNumber integerValue];
            NSInteger secondValue = [secondNumber integerValue];
            NSInteger thirdValue = [thirdNumber integerValue];
            NSInteger sum3 = firstValue + secondValue + thirdValue;
            if ( sum3 == 0 ) {
                [res addObject:@[firstNumber, secondNumber, thirdNumber]];
                secondIdx ++;
                thirdIdx --;
            } else if ( sum3 > 0 ) {
                thirdIdx --;
            } else {
                secondIdx ++;
            }
        }
        
    }
    
    return res;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *a = @[@-1, @0, @1, @2, @-1, @-4];
        NSLog(@"%@", threeSum(a));
    }
    return 0;
}
