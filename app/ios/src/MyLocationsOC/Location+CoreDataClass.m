//
//  Location+CoreDataClass.m
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//  This file was automatically generated and should not be edited.
//

#import "Location+CoreDataClass.h"

@implementation Location

- (CLLocationCoordinate2D)coordinate {
  return CLLocationCoordinate2DMake([self.latitude doubleValue], [self.longitude doubleValue]);
}

- (NSString *)title {
  if ([self.locationDescription length] > 0) {
    return self.locationDescription;
  } else {
    return @"(No Description)";
  }
}

- (NSString *)subtitle {
  return self.category;
}

- (BOOL)hasPhoto {
  return (self.photoId != nil) && ([self.photoId integerValue] != -1);
}

- (NSString*)documentsDirectory {
  NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString* documentsDirectory = [paths lastObject];
  return documentsDirectory;
}

- (NSString*)photoPath {
  NSString *filename = [NSString stringWithFormat:@"Photo-%ld.jpg", [self.photoId integerValue]];
  return [[self documentsDirectory] stringByAppendingPathComponent:filename];
}

- (UIImage *)photoImage {
  return [UIImage imageWithContentsOfFile:[self photoPath]];
}

+ (NSInteger)nextPhotoId {
  NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
  NSInteger photoId = [defaults integerForKey:@"PhotoID"];
  [defaults setInteger:photoId + 1 forKey:@"PhotoID"];
  [defaults synchronize];
  return photoId;
}

- (void)removePhotoFile {
  NSString* path = [self photoPath];
  NSFileManager* fileManager = [NSFileManager defaultManager];
  if ([fileManager fileExistsAtPath:path]) {
    NSError* error;
    if (![fileManager removeItemAtPath:path error:&error]) {
      
    }
  }
}

@end
