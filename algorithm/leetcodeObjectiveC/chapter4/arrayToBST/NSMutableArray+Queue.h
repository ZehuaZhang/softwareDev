//
//  NSMutableArray+Queue.h
//  arrayToBST
//
//  Created by Tianji Li on 2015-01-19.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 A naive implementation of FIFO queue that is not thread safe
 */
@interface NSMutableArray (Queue)

- (id)dequeue;
- (void)enqueue:(id)obj;

@end
