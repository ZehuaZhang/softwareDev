//
//  Location+CoreDataProperties.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//  This file was automatically generated and should not be edited.
//

#import "Location+CoreDataClass.h"
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Location (CoreDataProperties)

+ (NSFetchRequest<Location *> *)fetchRequest;

@property (nonatomic) NSNumber* latitude;
@property (nonatomic) NSNumber* longitude;
@property (nonatomic, retain) NSNumber* photoId;
@property (nullable, nonatomic, copy) NSDate *date;
@property (nullable, nonatomic, copy) NSString *locationDescription;
@property (nullable, nonatomic, copy) NSString *category;
@property (nullable, nonatomic, retain) CLPlacemark *placemark;

@end

NS_ASSUME_NONNULL_END
