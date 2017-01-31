//
//  graphNode.h
//  cloneGraph
//
//  Created by Tianji Li on 2015-01-21.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface graphNode : NSObject

@property (atomic, strong) NSNumber *label;
@property (atomic, strong) NSMutableArray *neighbors;

@end
