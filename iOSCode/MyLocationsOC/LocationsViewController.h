//
//  LocationsViewController.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>

@interface LocationsViewController : UITableViewController

@property (nonatomic, strong) NSManagedObjectContext* managedObjectContext;

@end
