//
//  GeneralFunctions.m
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "GeneralFunctions.h"

@implementation GeneralFunctions

+ (void)fatalCoreDataError:(NSError*)error {
  extern NSString * const ManagedObjectContextSaveDidFailNotification;
  NSLog(@"*** Fatal error in %s:%d\n%@\n%@", __FILE__, __LINE__, error, [error userInfo]);
  [[NSNotificationCenter defaultCenter] postNotificationName:ManagedObjectContextSaveDidFailNotification object:error];
  
}

@end
