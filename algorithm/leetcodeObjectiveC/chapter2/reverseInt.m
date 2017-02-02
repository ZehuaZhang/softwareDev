//
//  main.m
//  reverseInt
//
//  Created by Tianji Li on 2015-01-11.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Reverse digits of an integer. For example: x = 123, return 321. Example Questions Candidate Might Ask:
 Q: What about negative integers?
 A: For input x = –123, you should return –321.
 Difficulty: Easy, Frequency: High
 ￼￼Q: What if the integer’s last digit is 0? For example, x = 10, 100, ...
 A: Ignore the leading 0 digits of the reversed integer. 10 and 100 are both reversed as 1.
 Q: What if the reversed integer overflows? For example, input x = 1000000003. A: In this case, your function should return 0.
 */
#import <Foundation/Foundation.h>

int reverseInt(int a)
{
    int b = 0;
    while ( a != 0 ){
        if ( a > 0 )
            b = b < INT32_MAX/10 ? b * 10 + a % 10 : 0;
        if ( a < 0 )
            b = b > INT32_MIN/10 ? b * 10 + a % 10 : 0;
//        if (abs(b) > 214748364)
//            return 0; 
//        b = b * 10 + a % 10;
        a = a / 10;
    }
    
    return b;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int a = 1000000003;
        NSLog(@"a=%d, reverseInt=%d", a, reverseInt(a));
    }
    return 0;
}
