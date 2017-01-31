//
//  main.m
//  amaciblePair
//
//  Created by Tianji Li on 2015-02-09.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Q: find all pairs of amacible numbers.
 
 The pair of numbers 220 and 284 have the curious property that each "contains" the other.  In what way?  In the sense that the sum of the proper positive divisors of each, sum to the other.
 For 220	1+2+4+5+10+11+20+22+44+55+110 = 284
 For 284	1+2+4+71+142 = 220
 Such pairs of numbers are called amicable numbers (amicable means friendly--but there is a different set of number actually called friendly number.).
 */

#import <Foundation/Foundation.h>

NSInteger properDivSum(NSInteger i)
{
    NSInteger sum = 0;
    
    BOOL overflew = NO;
    NSInteger sqrt_i = (NSInteger)sqrt((double)i);
    for (NSInteger j=1; j<=sqrt_i; j++) {
        if ( i % j == 0) {
            if ( INT32_MAX - j > sum ) {
                sum += j;
                if ( j != i/j && i/j != i ) {
                    sum += i / j;
                }
            } else {
                overflew = YES;
                break;
            }
        }
    }
    
    return sum;
}

NSDictionary *amaciblePair()
{
    NSMutableDictionary *pair = @{}.mutableCopy;
    
    NSMutableDictionary *map = @{}.mutableCopy;
    for (NSInteger i=1; i<INT32_MAX; i++) {
        NSNumber *iValue = [[NSNumber alloc] initWithInteger:i];
        NSNumber *sumValue = [[NSNumber alloc] initWithInteger:properDivSum(i)];

        
        if ( [map objectForKey:sumValue] == iValue ) {
            // find a pair
            [pair setObject:sumValue forKey:iValue];
            NSLog(@"%@", pair);
        } else {
            [map setObject:sumValue forKey:iValue];
        }
    }


    return pair;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"%@", amaciblePair());
    }
    return 0;
}
