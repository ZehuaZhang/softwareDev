//
//  DataModel.m
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "DataModel.h"
#import "Checklist.h"
#import "UserNotifications/UserNotifications.h"

@implementation DataModel

static UNUserNotificationCenter* _center;

- (void)registerDefaults {
  NSDictionary* dictionary = @{@"ChecklistIndex":@-1, @"FirstTime":@YES, @"ChecklistItemId":@0};
  [[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
}

- (void)handleFirstTime {
  BOOL firstTime = [[NSUserDefaults standardUserDefaults] boolForKey:@"FirstTime"];
  if (firstTime) {
    Checklist* checklist = [[Checklist alloc] init];
    checklist.name = @"List";
    [self.lists addObject:checklist];
    [self setIndexOfSelectedChecklist:0];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"FirstTime"];
  }
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    [self loadChecklists];
    [self registerDefaults];
    [self handleFirstTime];
  }
  return self;
}

- (NSString*)documentsDirectory {
  NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString* documentsDirectory = [paths firstObject];
  return documentsDirectory;
}

- (NSString*)dataFilePath {
  return [[self documentsDirectory] stringByAppendingPathComponent:@"Checklists.plist"];
}

- (void)saveChecklists {
  NSMutableData* data = [[NSMutableData alloc] init];
  NSKeyedArchiver* archiver = [[NSKeyedArchiver alloc] initForWritingWithMutableData:data];
  [archiver encodeObject:self.lists forKey:@"Checklists"];
  [archiver finishEncoding];
  [data writeToFile:[self dataFilePath] atomically:YES];
}

- (void)loadChecklists {
  NSString* path = [self dataFilePath];
  if ([[NSFileManager defaultManager] fileExistsAtPath:path]) {
    NSData* data = [[NSData alloc] initWithContentsOfFile:path];
    NSKeyedUnarchiver* unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:data];
    self.lists = [unarchiver decodeObjectForKey:@"Checklists"];
    [unarchiver finishDecoding];
  } else {
    self.lists = [[NSMutableArray alloc] initWithCapacity:20];
  }
}

- (NSInteger)indexOfSelectedChecklist {
  return [[NSUserDefaults standardUserDefaults] integerForKey:@"ChecklistIndex"];
}

- (void)setIndexOfSelectedChecklist:(NSInteger)index {
  [[NSUserDefaults standardUserDefaults] setInteger:index forKey:@"ChecklistIndex"];
}

- (void)sortChecklists {
  [self.lists sortUsingSelector:@selector(compare:)];
}

+ (NSInteger)nextChecklistItemId {
  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  NSInteger itemId = [userDefaults integerForKey:@"ChecklistItemId"];
  [userDefaults setInteger:itemId + 1 forKey:@"ChecklistItemId"];
  [userDefaults synchronize];
  return itemId;
}

+ (UNUserNotificationCenter*)getCenter {
  [self setUpNotification];
  return _center;
}

+ (void)setUpNotification {
  if (_center == nil) {
  _center = [UNUserNotificationCenter currentNotificationCenter];
  [_center requestAuthorizationWithOptions:UNAuthorizationOptionAlert | UNAuthorizationOptionSound
                                   completionHandler:^(BOOL granted, NSError * _Nullable error) {
                                     if (!granted) {
                                       NSLog(@"Failed to instantiate notification center");
                                     }
                                   }];
  }
}

@end
