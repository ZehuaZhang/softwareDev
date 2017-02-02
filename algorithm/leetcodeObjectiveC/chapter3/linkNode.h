//
//  linkNode.h
//  addTwoNumbers
//
//  Created by Tianji Li on 2015-01-20.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface linkNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) linkNode *next;

@end
