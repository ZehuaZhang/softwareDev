//
//  ChecklistItem.m
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "ChecklistItem.h"
#import "DataModel.h"
#import "UserNotifications/UserNotifications.h"

@implementation ChecklistItem

- (instancetype)initWithCoder:(NSCoder *)coder
{
  self = [super init];
  if (self) {
    self.text = [coder decodeObjectForKey:@"Text"];
    self.checked = [coder decodeBoolForKey:@"Checked"];
    self.dueDate = [coder decodeObjectForKey:@"DueDate"];
    self.shouldRemind = [coder decodeBoolForKey:@"ShouldRemind"];
    self.itemId = [coder decodeIntegerForKey:@"ItemID"];
  }
  return self;
}

- (void)encodeWithCoder:(NSCoder *)coder
{
  [coder encodeObject:self.text forKey:@"Text"];
  [coder encodeBool:self.checked forKey:@"Checked"];
  [coder encodeObject:self.dueDate forKey:@"DueDate"];
  [coder encodeBool:self.shouldRemind forKey:@"ShouldRemind"];
  [coder encodeInteger:self.itemId forKey:@"ItemID"];
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.itemId = [DataModel nextChecklistItemId];
  }
  return self;
}

- (void)toggleChecked {
  self.checked = !self.checked;
}

- (void)scheduleNotification {
  [[DataModel getCenter] removePendingNotificationRequestsWithIdentifiers:@[[NSString stringWithFormat:@"%ld", self.itemId]]];
  
  if (self.shouldRemind && [self.dueDate compare:[NSDate date]] != NSOrderedAscending) {
    UNMutableNotificationContent *content = [UNMutableNotificationContent new];
    content.body = self.text;
    content.sound = [UNNotificationSound defaultSound];
    content.userInfo = @{@"ItemID" : @(self.itemId) };
    
    NSDateComponents *triggerDate = [[NSCalendar currentCalendar] componentsInTimeZone:[NSTimeZone defaultTimeZone] fromDate:self.dueDate];
    UNCalendarNotificationTrigger *trigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:triggerDate
                                                                                                      repeats:NO];
    NSString* identifier = [NSString stringWithFormat:@"%ld", self.itemId];
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier content:content trigger:trigger];
    
    [[DataModel getCenter] addNotificationRequest:request withCompletionHandler:nil];
  }
}

- (void)dealloc {
  [[DataModel getCenter] removePendingNotificationRequestsWithIdentifiers:@[[NSString stringWithFormat:@"%ld", self.itemId]]];
}

@end
