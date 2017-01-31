//
//  main.m
//  missingPositive
//
//  Created by Tianji Li on 2015-02-09.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 https://oj.leetcode.com/problems/first-missing-positive/
 
 Given an unsorted integer array, find the first missing positive integer.
 
 For example,
 Given [1,2,0] return 3,
 and [3,4,-1,1] return 2.
 
 Your algorithm should run in O(n) time and uses constant space.
 */

#import <Foundation/Foundation.h>

NSNumber *missingInt(NSArray *a)
{
    NSMutableSet *b = [[NSMutableSet alloc] init];
    
    for (NSNumber *anInt in a) {
        [b addObject:anInt];
    }
    
    for (NSInteger i=1; i<=[a count]; i++) {
        NSNumber *aValue = [[NSNumber alloc] initWithInteger:i];
        if ( ![b containsObject:aValue] )
            return aValue;
    }
    
    return nil;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"%@", missingInt(@[]));
        NSLog(@"%@", missingInt(@[@1, @2, @0]));
        NSLog(@"%@", missingInt(@[@3, @4, @-1, @1]));
    }
    return 0;
}
