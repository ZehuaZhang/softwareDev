//
//  main.m
//  palindromeNumber
//
//  Created by Tianji Li on 2015-01-11.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Determine whether an integer is a palindrome. Do this without extra space.
 Example Questions Candidate Might Ask:
 Q: Does negative integer such as –1 qualify as a palindrome?
 A: For the purpose of discussion here, we define negative integers as non-palindrome.
 */
#import <Foundation/Foundation.h>

BOOL isPalinNumber(int num)
{
    BOOL isPalin = NO;
    
    if ( num <= 9 ) return isPalin;
    
    // check the number of digits
    int digitCount = 0;
    int numCopy = num;
    while ( num != 0 ) {
        digitCount ++;
        num /= 10;
    }
    
    isPalin = YES;
    int left = pow(10 , (digitCount - 1));
    int right = 10;
    int numLeft;
    int numRight;
    num = numCopy;
    for (int i=0; i<digitCount/2; i++){
        numLeft = num / left;
        numRight = num % right;
        
        if ( numLeft != numRight ) {
            isPalin = NO;
            break;
        } else {
            num = num % left / right;
        }

        left = left / 100;
    }
    
    return isPalin;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int num = 20202;
        NSLog(@"num=%d, isPalin=%d", num, isPalinNumber(num));
    }
    return 0;
}
