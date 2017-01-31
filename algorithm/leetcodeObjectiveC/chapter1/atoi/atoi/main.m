//
//  main.m
//  atoi
//
//  Created by Tianji Li on 2015-01-11.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Implement atoi to convert a string to an integer.
 The atoi function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.
 The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.
 If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.
 If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, the maximum integer value (2147483647) or the minimum integer value (–2147483648) is returned.
 */
#import <Foundation/Foundation.h>

BOOL isNegative(unichar c)
{
    return (c == '-') ? YES: NO;
}

BOOL isPositive(unichar c)
{
    return (c == '+') ? YES: NO;
}

int strToInt(NSString *s) {
    int n = (int)[s length];
    
    // ignore whitespaces
    int i = 0;
    while ( i < n && isspace([s characterAtIndex:i]) ) i++;
    
    // check optional sign
    int sign = 1;
    if ( i < n ) {
        if  (isNegative([s characterAtIndex:i]) ) {
            sign = -1;
            i++;
        }
        if  (isPositive([s characterAtIndex:i]) ) {
            i++;
        }
    }
    
    int res = 0;
    int maxDiv10 = INT32_MAX / 10;
    while ( i < n && isdigit([s characterAtIndex:i])) {
        int digit = (int)[s characterAtIndex:i] - (int)'0';

        // have to use two returns, otherwise, no way to represetn INT32_MIN using int
        if ( res > maxDiv10 || (res == maxDiv10 && digit >= 8) )
            return res > maxDiv10 ? INT32_MAX : INT32_MIN;
        
        res = res * 10 + digit;
        i++;
    }
    
    return sign * res;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *s = @"+ +1.1a";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
        s = @"13234234";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
        s = @"13234$234";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
        s = @"-13234234";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
        s = @"-13234.3";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
        s = @"13234234894729384798247892";
        NSLog(@"str=%@, strToInt=%d", s, strToInt(s));
    }
    return 0;
}
