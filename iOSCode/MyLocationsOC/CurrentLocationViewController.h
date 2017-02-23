//
//  FirstViewController.h
//  MyLocations
//
//  Created by ZhangZehua on 2/21/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

@interface CurrentLocationViewController : UIViewController <CLLocationManagerDelegate>

@property (nonatomic, weak) IBOutlet UILabel* messageLabel;
@property (nonatomic, weak) IBOutlet UILabel* latitudeLablel;
@property (nonatomic, weak) IBOutlet UILabel* longitudeLabel;
@property (nonatomic, weak) IBOutlet UILabel* addressLabel;
@property (nonatomic, weak) IBOutlet UIButton* tagButton;
@property (nonatomic, weak) IBOutlet UIButton* getButton;

@property (weak, nonatomic) IBOutlet UILabel *latitudeTextLabel;
@property (weak, nonatomic) IBOutlet UILabel *longitudeTextLabel;

@property (weak, nonatomic) IBOutlet UIView *containerView;
@property (nonatomic, strong) NSManagedObjectContext* managedObjectContext;

- (IBAction)getLocation:(id)sender;

@end

