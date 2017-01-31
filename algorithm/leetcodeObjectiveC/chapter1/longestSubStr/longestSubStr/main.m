//
//  main.m
//  longestSubStr
//
//  Created by Tianji Li on 2015-01-24.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a string, find the length of the longest substring without repeating characters. For
 example, the longest substring without repeating letters for “abcabcbb” is “abc”, which
 the length is 3. For “bbbbb” the longest substring is “b”, with the length of 1.
 */

#import <Foundation/Foundation.h>

BOOL isUnique(NSString *s)
{
    NSMutableDictionary *uniqueMap = @{}.mutableCopy;
    
    for (NSUInteger i=0; i<[s length]; i++) {
        NSString *c = [s substringWithRange:NSMakeRange(i, 1)];
        if ( [uniqueMap objectForKey:c] )
            return NO;
        else {
            [uniqueMap setObject:c forKey:c];
        }
    }
    
    return YES;
}

NSUInteger longstSubStr(NSString *s)
{
    NSUInteger subStrLen = 0;
    NSUInteger lenS = [s length];
    
    // sanity check
    if ( 0 == lenS ) return subStrLen;
    
    for (NSUInteger i=lenS; i>0; i--) {
        for(NSUInteger j=0; j<=(lenS - i); j++) {
            NSString *subS = [s substringWithRange:NSMakeRange(j, i)];
            if ( isUnique(subS) ) {
                subStrLen = [subS length];
                return subStrLen;
            }
        }
    }

    return subStrLen;
}

NSUInteger lenOfLongestStr(NSString *s)
{
    NSMutableDictionary *charMap = @{}.mutableCopy;
    NSInteger lenS = [s length];
    NSInteger maxLen = 0;
    NSInteger start = 0;
    for ( NSInteger end = 0; end < lenS; end++) {
        NSString *c = [s substringWithRange:NSMakeRange(end, 1)];
        NSNumber *cPos = [charMap objectForKey:c];

        if ( cPos && [cPos integerValue] >= start ) {
            NSLog(@"%lu, %lu", [cPos integerValue], start);
            start = [cPos integerValue] + 1;
        }
        
        [charMap setObject:[[NSNumber alloc] initWithInteger:end] forKey:c];
        
        maxLen  = MAX(maxLen, end - start + 1);
    }
    
    return maxLen;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *s = @"abcdaaegfyufftrssesujkjigyrseeeerfhggfiusdgfiufhiuerhguihreiughrueihgi hfhh iihi oghi hi hihgihghgfhjhdkjdfkdsfgiufhicbjdsbjkdsbcjkdbjvbdjvbjdbvjdbvjdbvjkdsbvjdsbvjdsbjvbjkbfjjgcfugugeugcjjhckdhkjcdskjfjhfjdsjfhksdfhksjdhfkjdhfjkhfdsucbuiiufiugiusdviuvuiegfugeufgewuifgigfidsgfiudgsfuigiufgewuifgewiufgeuwfgiugfsdgdsvijdsbvibiuvgwugfuiwegfewbiethpi";
        NSDate *start = [NSDate date];
        NSLog(@"%lu", lenOfLongestStr(s));
        NSDate *end = [NSDate date];
        NSLog(@"time for lenOfLongestStr is %f",[end timeIntervalSinceDate:start]);
       start = [NSDate date];
        NSLog(@"%lu", longstSubStr(s));
        end = [NSDate date];
        NSLog(@"time for longstSubStr is %f",[end timeIntervalSinceDate:start]);

    }
    return 0;
}
