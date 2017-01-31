//
//  main.m
//  twosum
//
//  Created by Tianji Li on 2015-01-05.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given an array of integers, find two numbers such that they add up to a specific target number.
 The function twoSum should return indices of the two numbers such that they add up to the target, 
 where index1 must be less than index2. Please note that your returned answers (both index1 and index2) 
 are not zero-based.
 You may assume that each input would have exactly one solution.
 */

#import <Foundation/Foundation.h>

NSArray *twoSum(NSArray *intArray,  NSNumber *target)
{
    // use a hash to save searching time
    NSMutableDictionary *map = @{}.mutableCopy;
    
    for (NSInteger i=0; i<intArray.count; i++){
        
        // use objective c objects on all numbers so that they word with NSDictionay. Plain C does not work with NSDictionary
        NSNumber *currValue = (NSNumber *)[intArray objectAtIndex:i];
        NSNumber *diffValue = @([target integerValue] - [currValue integerValue]);
        NSNumber *diffIdx = [map objectForKey:diffValue];
        NSNumber *currIdx = @(i+1);
        
        if (diffIdx) {
            // find it, return index in hash first as it is smaller than current index
            return @[diffIdx, currIdx];
        }
        
        // no match, keep in hash
        [map setObject:currIdx forKey:currValue];
    };
    
    // did not find the target
    return nil;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *intArray = @[@55,@66,@77];
        NSNumber *target = @121;
        NSArray *indices = twoSum(intArray, target);
        if (indices.count == 2)
            NSLog(@"\n\n %s, found index1 = %@, index2 = %@, for target = %lu in array = %@",
                  __func__, [indices objectAtIndex:0], [indices objectAtIndex:1], [target integerValue], intArray);
        else
            NSLog(@"\n\n %s, did not find the two sum!", __func__);
    }
    return 0;
}
