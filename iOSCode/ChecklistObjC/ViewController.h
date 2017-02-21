//
//  ViewController.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "itemDetailViewController.h"

@class Checklist;

@interface ViewController : UITableViewController <ItemDetailViewControllerDelegate>

@property (nonatomic, strong) Checklist* checklist;

@end

