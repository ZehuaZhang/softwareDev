//
//  main.m
//  MissingRange
//
//  Created by Tianli Zhang on 2016-12-17.
//  Copyright (c) 2016 Tianli Zhang. All rights reserved.
//

/**
 Question:
 Given a sorted integer array where the range of elements are [0, 99] inclusive, return its missing ranges.
 For example, given [0, 1, 3, 50, 75], return [“2”, “4->49”, “51->74”, “76->99”]
 */

#import <Foundation/Foundation.h>

NSArray *findMissingRange(NSArray *intArray){
    
    NSMutableArray *missingRange = @[].mutableCopy;
    NSUInteger count = intArray.count;
    if (intArray.count == 0) {
        return @[];
    }
    
    
    if (![intArray[0]isEqualToNumber:@0]) {
        if ([intArray[0] isEqualToNumber:@1]) {
            [missingRange addObject:@"0"];
        }else{
            [missingRange addObject:[NSString stringWithFormat:@"0->%d",[intArray[0] intValue]-1]];
        }
    }
    
    
    for (NSUInteger i=1; i<intArray.count; i++) {
        int diff = [intArray[i] intValue] - [intArray[i-1] intValue];
        if (diff!=1) {
            if (diff == 2) {
                [missingRange addObject:[NSString stringWithFormat:@"%d",[intArray[i] intValue] - 1]];
            }else{
                [missingRange addObject:[NSString stringWithFormat:@"%d->%d",[intArray[i-1] intValue] + 1,[intArray[i] intValue] - 1]];
            }
        }
    }
    
    if (![[intArray lastObject] isEqualToNumber:@99]) {
        if ([[intArray lastObject] isEqualToNumber:@98]) {
            [missingRange addObject:@"99"];
        }else{
            [missingRange addObject:[NSString stringWithFormat:@"%d->99",[intArray[count-1] intValue] + 1]];
        }
    }
    
    return [missingRange copy];
}
int main(int argc, const char * argv[]) {
    @autoreleasepool {
       
        NSArray *intArray = @[@2,@4,@6,@78];
        NSLog(@"%@",[findMissingRange(intArray) description]);
        
        intArray = @[@0,@4,@6,@99];
        NSLog(@"%@",[findMissingRange(intArray) description]);
        
        intArray = @[@8,@9,@88,@98];
        NSLog(@"%@",[findMissingRange(intArray) description]);
        
        intArray = @[];
        NSLog(@"%@",[findMissingRange(intArray) description]);
    }
    return 0;
}
