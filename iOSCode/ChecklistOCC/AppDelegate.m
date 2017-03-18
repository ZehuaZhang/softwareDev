//
//  AppDelegate.m
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "AppDelegate.h"
#import "UserNotifications/UserNotifications.h"
#import "AllListsViewController.h"
#import "DataModel.h"

@interface AppDelegate ()

@end

@implementation AppDelegate {
  DataModel* _dataModel;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [DataModel setUpNotification];
  
  _dataModel = [[DataModel alloc] init];
  UINavigationController* navigationController = (UINavigationController*)self.window.rootViewController;
  AllListsViewController* controller = navigationController.viewControllers[0];
  controller.dataModel = _dataModel;
  return YES;
}

- (void)saveData {
  [_dataModel saveChecklists];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [self saveData];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [self saveData];
}


- (void)applicationWillResignActive:(UIApplication *)application {
  // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
  // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

@end
