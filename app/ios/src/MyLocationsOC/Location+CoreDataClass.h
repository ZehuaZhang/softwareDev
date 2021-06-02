//
//  Location+CoreDataClass.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//  This file was automatically generated and should not be edited.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>
#import <MapKit/MapKit.h>

@class NSObject;

NS_ASSUME_NONNULL_BEGIN

@interface Location : NSManagedObject <MKAnnotation>

+ (NSInteger)nextPhotoId;

- (BOOL)hasPhoto;
- (NSString*)photoPath;
- (UIImage*)photoImage;
- (void)removePhotoFile;

@end

NS_ASSUME_NONNULL_END

#import "Location+CoreDataProperties.h"
