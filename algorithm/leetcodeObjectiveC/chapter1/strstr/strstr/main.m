//
//  main.m
//  strstr
//
//  Created by Tianji Li on 2015-01-10.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>

int strStr(NSString *needle, NSString *haystack)
{
    NSUInteger needleSize = [needle length];
    NSUInteger haystackSize = [haystack length];
    
    for (NSUInteger i=0; ; i++) {
        for (NSUInteger j=0; ; j++){
            
            if ( j == needleSize )
                return (int)i;

            if ( i + j == haystackSize )
                return (int)-1;
            
            if ( [haystack characterAtIndex:i + j] != [needle characterAtIndex:j] )
                break;
        }
    }
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *needle = @"bat";
        NSString *haystack = @"abatl";
        NSLog(@"needle=%@, haystack=%@, strstr=%d", needle, haystack, strStr(needle, haystack));
    }
    return 0;
}
