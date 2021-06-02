//
//  AppDelegate.m
//  MyLocations
//
//  Created by ZhangZehua on 2/21/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <CoreData/CoreData.h>
#import "AppDelegate.h"
#import "CurrentLocationViewController.h"
#import "LocationsViewController.h"
#import "MapViewController.h"


NSString * const ManagedObjectContextSaveDidFailNotification = @"ManagedObjectContextSaveDidFailNotification";

@interface AppDelegate ()

@property (nonatomic, strong) NSManagedObjectContext* managedObjectContext;
@property (nonatomic, strong) NSManagedObjectModel* managedObjectModel;
@property (nonatomic, strong) NSPersistentStoreCoordinator* persistentStoreCoordinator;

@end

@implementation AppDelegate

- (NSManagedObjectModel*)managedObjectModel {
  NSString* modelPath = [[NSBundle mainBundle] pathForResource:@"DataModel" ofType:@"momd"];
  NSURL* modelURL = [NSURL fileURLWithPath:modelPath];
  _managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
  return _managedObjectModel;
}

- (NSString*)documentsDirectory {
  NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString* documentsDirectory = [paths lastObject];
  return documentsDirectory;
}

- (NSString*)dataStorePath {
  return [[self documentsDirectory] stringByAppendingPathComponent:@"DataStore.sqlite"];
}

- (NSPersistentStoreCoordinator*)persistentStoreCoordinator {
  if (_persistentStoreCoordinator == nil) {
    NSURL* storeURL = [NSURL fileURLWithPath:[self dataStorePath]];
    _persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:self.managedObjectModel];
    NSError* error;
    if (![_persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeURL options:nil error:&error]) {
      NSLog(@"Error adding persistent store %@, %@", error, [error userInfo]);
    }
  }
  return _persistentStoreCoordinator;
}

- (NSManagedObjectContext*)managedObjectContext {
  if (_managedObjectContext == nil) {
    NSPersistentStoreCoordinator* coordinator = self.persistentStoreCoordinator;
    if (coordinator != nil) {
      _managedObjectContext = [[NSManagedObjectContext alloc] initWithConcurrencyType:NSMainQueueConcurrencyType];
      [_managedObjectContext setPersistentStoreCoordinator:coordinator];
    }
  }
  return _managedObjectContext;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  UITabBarController* tbc = (UITabBarController*)self.window.rootViewController;
  CurrentLocationViewController* currentLocationVC = (CurrentLocationViewController*)tbc.viewControllers[0];
  currentLocationVC.managedObjectContext = self.managedObjectContext;
  
  UINavigationController* nvc = (UINavigationController*)tbc.viewControllers[1];
  LocationsViewController* locationsVC = (LocationsViewController*)nvc.viewControllers[0];
  locationsVC.managedObjectContext = self.managedObjectContext;
  
  MapViewController* mapVC = (MapViewController*)tbc.viewControllers[2];
  mapVC.managedObjectContext = self.managedObjectContext;
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fatalCoreDataError:) name:ManagedObjectContextSaveDidFailNotification object:nil];
  
  return YES;
}

- (void)fatalCoreDataError:(NSNotification*)notification {
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:NSLocalizedString(@"Internal Error", nil)
                                                                 message:NSLocalizedString(@"There was a fatal error in the app and it cannot continue." "\n\nPress OK to terminate the app. Sorry for the inconvenience.", nil)
                                                          preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* action = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
  
  [alert addAction:action];
  [self.window.rootViewController presentViewController:alert animated:true completion:nil];
}

- (void)applicationWillResignActive:(UIApplication *)application {
  // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
  // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
  // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
  // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
  // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
  // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
