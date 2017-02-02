//
//  LTTreeNode.h
//  arrayToBST
//
//  Created by Tianji Li on 2015-01-19.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LTTreeNode : NSObject

@property (atomic, strong) NSNumber *key;
@property (atomic, strong) NSNumber *level;
@property (atomic, strong) LTTreeNode *left;
@property (atomic, strong) LTTreeNode *right;

@end
