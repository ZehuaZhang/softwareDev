//
//  DataModel.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <Foundation/Foundation.h>

@class UNUserNotificationCenter;

@interface DataModel : NSObject

@property (nonatomic, strong) NSMutableArray* lists;

- (void)saveChecklists;
- (NSInteger)indexOfSelectedChecklist;
- (void)setIndexOfSelectedChecklist:(NSInteger)index;
- (void)sortChecklists;

+ (NSInteger)nextChecklistItemId;
+ (UNUserNotificationCenter*)getCenter;
+ (void)setUpNotification;

@end
