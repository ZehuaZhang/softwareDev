//
//  LocationCell.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LocationCell : UITableViewCell

@property (nonatomic, weak) IBOutlet UILabel* decriptionLabel;
@property (nonatomic, weak) IBOutlet UILabel* addressLabel;
@property (weak, nonatomic) IBOutlet UIImageView *photoImageView;

@end
