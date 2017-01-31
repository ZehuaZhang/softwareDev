//
//  main.m
//  excelTitle
//
//  Created by Tianji Li on 2015-02-07.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 https://oj.leetcode.com/problems/excel-sheet-column-title/
 
 Given a positive integer, return its corresponding column title as appear in an Excel sheet.
 
 For example:
 
 1 -> A
 2 -> B
 3 -> C
 ...
 26 -> Z
 27 -> AA
 28 -> AB
 */

#import <Foundation/Foundation.h>

NSString *convertToTitle(int n) {
    char a = 'A';
    int size = n;
    NSMutableString *title = @"".mutableCopy;
    
    while (size) {
        int rem = size % 26;
        int diff = rem ? rem - 1 : 25;
        char other = a + diff;
        [title insertString:[NSString stringWithFormat:@"%c", other] atIndex:0];
        size = rem ? size / 26 : size / 26 - 1;
    }
    
    return title;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"%@", convertToTitle(0));
        NSLog(@"%@", convertToTitle(1));
        NSLog(@"%@", convertToTitle(2));
        NSLog(@"%@", convertToTitle(26));
        
        NSLog(@"%@", convertToTitle(27));
        NSLog(@"%@", convertToTitle(28));
        NSLog(@"%@", convertToTitle(51));
        NSLog(@"%@", convertToTitle(52));
        
        NSLog(@"%@", convertToTitle(53));
        NSLog(@"%@", convertToTitle(77));
        NSLog(@"%@", convertToTitle(78));
        NSLog(@"%@", convertToTitle(26*26));
        NSLog(@"%@", convertToTitle(26*26+1));
        NSLog(@"%@", convertToTitle(26*26+26));
        NSLog(@"%@", convertToTitle(26*26+26+1));
    }
    return 0;
}
