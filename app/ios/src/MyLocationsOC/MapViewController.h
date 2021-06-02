//
//  MapViewController.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <CoreData/CoreData.h>

@interface MapViewController : UIViewController

@property (nonatomic, strong) NSManagedObjectContext* managedObjectContext;

@end
