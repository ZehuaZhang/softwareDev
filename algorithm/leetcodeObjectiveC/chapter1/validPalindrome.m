//
//  main.m
//  ValidPalindrome
//
//  Created by Tianji Li on 2015-01-07.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
 For example: "A man, a plan, a canal: Panama" is a palindrome. "race a car" is not a palindrome.
 */

#import <Foundation/Foundation.h>

BOOL isASCII(unichar c)
{
    return ( c <= 'z' && c >= 'a' ) ? YES : NO;
}

NSString *asciiOnly(NSString *s)
{
    NSMutableString *asciiOnlyStr = @"".mutableCopy;

    for (int i=0; i<[s length]; i++) {
        unichar c = [s characterAtIndex:i];
        if ( isASCII(c) )
            [asciiOnlyStr appendFormat:@"%c", c];
    }
    
    return asciiOnlyStr;
}

BOOL validPalindrome(NSString *aStr)
{
    BOOL returnFlag = YES;
    NSString *lowCaseASCIIOnlyStr = asciiOnly([aStr lowercaseString]);
    
    
    NSUInteger i = 0;
    NSUInteger j = lowCaseASCIIOnlyStr.length ? lowCaseASCIIOnlyStr.length - 1 : 0;
    while ( i < j ) {
        unichar a = [lowCaseASCIIOnlyStr characterAtIndex:i];
        unichar b = [lowCaseASCIIOnlyStr characterAtIndex:j];
        if ( a != b ) {
            returnFlag = NO;
            break;
        } else {
            i ++;
            j --;
        }
    }
    
    return returnFlag;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"isPalin = %d", validPalindrome(@""));
        NSLog(@"isPalin = %d", validPalindrome(@"!!!"));
        NSLog(@"isPalin = %d", validPalindrome(@"a"));
        NSLog(@"isPalin = %d", validPalindrome(@"ab"));
        NSLog(@"isPalin = %d", validPalindrome(@"a!"));
        NSLog(@"isPalin = %d", validPalindrome(@"a!ba"));
        NSLog(@"isPalin = %d", validPalindrome(@"A man, a plan, a canal: Panama"));
        NSLog(@"isPalin = %d", validPalindrome(@"race a car"));
        NSLog(@"isPalin = %d", validPalindrome(@"racecar"));
        NSLog(@"isPalin = %d", validPalindrome(@"race  car"));
    }
    return 0;
}
