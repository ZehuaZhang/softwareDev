//
//  main.m
//  spiralMatrix
//
//  Created by Tianji Li on 2015-01-21.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a matrix of m ✕ n elements (m rows, n columns), return all elements of the
 matrix in spiral order.
 For example, given the following matrix:
 [
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
 ]
 You should return [1,2,3,6,9,8,7,4,5].
 */


#import <Foundation/Foundation.h>

/*
 matrix is an NSArray, holding NSArray
 */
NSArray *spiralMatrix(NSArray *matrix)
{
    NSInteger rowStart = 0;
    NSInteger rowEnd = [matrix count] - 1;
    NSInteger colStart = 0;
    NSInteger colEnd =  [matrix count] ? [matrix[0] count] - 1 : 0;
    NSMutableArray *arr = @[].mutableCopy;
    
    // loop through columns
    printf("[");
    while ( colStart <= colEnd ) {
     
     // 1. print ‘up’
     for ( NSInteger i = colStart; i <= colEnd; i++ ) {
         if ( i == 0 )
             printf("%lu", [matrix[rowStart][i] integerValue]);
         else
             printf(", %lu", [matrix[rowStart][i] integerValue]);
         
         [arr addObject:matrix[rowStart][i]];
     }
     
     // 2. print ‘right’
     for ( NSInteger i = rowStart + 1; i <= rowEnd; i++ ) {
         printf(", %lu", [matrix[i][colEnd] integerValue]);
         [arr addObject:matrix[i][colEnd]];
     }
     
     // 3. print ‘down’
     for ( NSInteger i = colEnd - 1; i >= colStart; i-- ) {
         printf(", %lu", [matrix[rowEnd][i] integerValue]);
         [arr addObject:matrix[rowEnd][i]];
     }
     
     // 4. print ‘left’
     for ( NSInteger i = rowEnd - 1; i >= rowStart + 1; i-- ) {
         printf(", %lu", [matrix[i][colStart] integerValue]);
         [arr addObject:matrix[i][colStart]];
     }
     
     colStart ++;
     colEnd --;
     
     rowStart ++;
     rowEnd --;
    }
    printf("]");
    
    return arr;
 }

             
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *row1 = @[@1, @2, @3];
        NSArray *row2 = @[@10, @11, @4];
        NSArray *row3 = @[@9, @12, @5];
        NSArray *row4 = @[@8, @7, @6];
        NSArray *matrix = @[row1, row2, row3, row4];

//        NSArray *row1 = @[@1, @2, @3];
//        NSArray *row2 = @[@4, @5, @6];
//        NSArray *row3 = @[@7, @8, @9];
//        NSArray *matrix = @[row1, row2, row3];
        
//        NSArray *row1 = @[@1, @2];
//        NSArray *row2 = @[@4, @5];
//        NSArray *row3 = @[@7, @8];
//        NSArray *matrix = @[row1, row2, row3];
        
//        NSArray *row1 = @[@1, @2, @3];
//        NSArray *row2 = @[@4, @5, @6];
//        NSArray *matrix = @[row1, row2];
        
//        NSArray *row1 = @[@1, @2];
//        NSArray *row2 = @[@4, @5];
//        NSArray *matrix = @[row1, row2];

//        NSArray *row1 = @[@1];
//        NSArray *row2 = @[@4];
//        NSArray *matrix = @[row1, row2];

//        NSArray *row1 = @[];
//        NSArray *row2 = @[];
//        NSArray *matrix = @[row1, row2];
        
        NSLog(@"%@", spiralMatrix(matrix));
    }
    return 0;
}
