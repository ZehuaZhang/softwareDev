//
//  Checklist.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Checklist : NSObject <NSCoding>

@property (nonatomic, copy) NSString* name;
@property (nonatomic, strong) NSMutableArray* items;
@property (nonatomic, copy) NSString* iconName;

- (int)countUncheckedItems;

@end
