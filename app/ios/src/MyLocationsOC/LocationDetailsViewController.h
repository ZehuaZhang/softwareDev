//
//  LocationDetailsViewController.h
//  MyLocations
//
//  Created by ZhangZehua on 2/21/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

@class Location;

@interface LocationDetailsViewController : UITableViewController <UITextViewDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate>

@property (nonatomic) CLLocationCoordinate2D coordinate;
@property (nonatomic, strong) CLPlacemark* placemark;
@property (nonatomic, strong) NSManagedObjectContext* managedObjectContext;
@property (nonatomic, strong) Location* locationToEdit;

@end
