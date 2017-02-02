//
//  main.m
//  ReverseWordsInString
//
//  Created by Tianji Li on 2015-01-10.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given an input string s, reverse the string word by word.
 For example, given s = "the sky is blue", return "blue is sky the".
 
 NOTE: defination of a word is "A sequence of non-space characters constitutes a word". Weired? Yes, it is. But who cares.
 */

#import <Foundation/Foundation.h>


NSString *reversedString(NSString *s)
{
    NSUInteger strSize = [s length];
    NSMutableString *rs = @"".mutableCopy;
    NSMutableString *aWord = @"".mutableCopy;
    NSUInteger i = 0;
    
    while ( i < strSize ) {
        unichar c = [s characterAtIndex:i];
        if ( c != ' ' )
            [aWord appendFormat:@"%c", c];
        
        if ( c == ' ' || i == strSize - 1 ) {
            if ([aWord length] > 0) {
                [rs insertString:aWord atIndex:0];
                [rs insertString:@" " atIndex:aWord.length];
                aWord = @"". mutableCopy;
            }
        }
            
        i++;
    }
    
    return rs;
}

NSArray* convertStringToArray(NSString* s){
    NSUInteger strlen = [s length];
    NSMutableArray *stack= [NSMutableArray new];
    NSMutableString *tmp = [[NSMutableString alloc]init];
    
    for(int i = 0; i<strlen; i++){
        if ([s characterAtIndex:i] != 32) {
            [tmp appendFormat:@"%c",[s characterAtIndex:i]];
        }else{
            if (i != 0) {
                [stack addObject:tmp];
                tmp = @"".mutableCopy;
            }
        }
    }
    NSLog(@"stack is %@",[stack description]);
    return [stack copy];
}

NSString *reversedString2(NSString *s)
{
    NSMutableArray *stack = convertStringToArray(s).mutableCopy;
    NSUInteger stackSize = [stack count];
    NSMutableString *reveredString = [[NSMutableString alloc]init];
    for (int i = 0; i < stackSize; i++) {
        [reveredString appendString:[stack lastObject]];
        [reveredString appendString:@" "];
        [stack removeLastObject];
    }
    
    return reveredString;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *s = @" ! the sky is blue ? ";
        NSDate* start = [NSDate date];
        NSLog(@"reversedString: s=%@, reversed s=%@", s, reversedString(s));
        NSDate* end = [NSDate date];
        NSLog(@"reversedString: %f ms",[end timeIntervalSinceDate:start]*1000);

        start = [NSDate date];
        NSLog(@"reversedString2: s=%@, reversed s=%@", s, reversedString2(s));
        end = [NSDate date];
        NSLog(@"reversedString2: %f ms",[end timeIntervalSinceDate:start]*1000);

    }
    return 0;
}
