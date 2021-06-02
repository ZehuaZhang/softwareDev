//
//  IconPickerViewController.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@class IconPickerViewController;

@protocol IconPickerViewControllerDelegate <NSObject>

- (void)iconPicker:(IconPickerViewController*)picker didPickIcon:(NSString*)iconName;

@end

@interface IconPickerViewController : UITableViewController

@property (nonatomic, weak) id <IconPickerViewControllerDelegate> delegate;

@end
