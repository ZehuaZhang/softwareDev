//
//  ChecklistItem.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ChecklistItem : NSObject <NSCoding>

@property (nonatomic, copy) NSString* text;
@property (nonatomic) BOOL checked;
@property (nonatomic, copy) NSDate* dueDate;
@property (nonatomic) BOOL shouldRemind;
@property (nonatomic) NSInteger itemId;

- (void)toggleChecked;
- (void)scheduleNotification;

@end
