//
//  main.m
//  arrayToBST
//
//  Created by Tianji Li on 2015-01-18.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NSMutableArray+Queue.h"
#import "LTTreeNode.h"


LTTreeNode *arrayToBST(NSArray *arr, NSInteger left, NSInteger right, NSNumber *level)
{
    if ( left > right ) return nil;
    
    NSInteger middle = (left + right) / 2;
    
    LTTreeNode *node = [[LTTreeNode alloc] init];
    [node setKey:[arr objectAtIndex:middle]];
    [node setLevel:level];
    [node setLeft:arrayToBST(arr, left, middle - 1, @([level integerValue] + 1))];
    [node setRight:arrayToBST(arr, middle + 1, right, @([level integerValue] + 1))];
    
    return node;
}

void printBST(LTTreeNode *node)
{
    if ( !node ) {
        NSLog(@"\n\n %s, empty tree!", __func__);
        return ;
    }
    
    // breath first printing a tree level by level
    NSMutableArray *queue = [[NSMutableArray alloc] init];
    NSUInteger level = 0;
    while ( node ) {
        if ([node left]) {
            [queue enqueue:[node left]];
        }
        
        if ([node right])
            [queue enqueue:[node right]];
        
        printf("%d", [[node key] intValue]);
        
        id a = [queue dequeue];
        node = (LTTreeNode *)a;
        
        if ( [[node level] integerValue] > level ) {
            level ++;
            printf("\n");
        } else {
            printf("\t");
        }
            
    }
    
    return;
}


int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *arr = @[@1, @2, @3, @4, @5, @6, @7];
        /**
                4
            2        6
         1    3   5     7
         */
        LTTreeNode *root = arrayToBST(arr, 0, [arr count] - 1, 0);
        
        printBST(root);
    }
    return 0;
}
