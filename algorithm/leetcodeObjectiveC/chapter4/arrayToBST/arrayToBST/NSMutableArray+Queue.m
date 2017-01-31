//
//  NSMutableArray+Queue.m
//  arrayToBST
//
//  Created by Tianji Li on 2015-01-19.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import "NSMutableArray+Queue.h"

@implementation NSMutableArray (Queue)

- (void)enqueue:(id)obj
{
    [self addObject:obj];
}

- (id)dequeue
{
    id obj = [self firstObject];
 
    if (obj)
        [self removeObjectAtIndex:0];
    
    return obj;
}

@end
