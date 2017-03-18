//
//  ListDetailViewController.h
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "IconPickerViewController.h"

@class ListDetailViewController;
@class Checklist;

@protocol ListDetailViewControllerDelegate <NSObject>

- (void)listDetailViewControllerDidCancel:(ListDetailViewController*)controller;
- (void)listDetailViewController:(ListDetailViewController*)controller didFinishAddingChecklist:(Checklist*)checklist;
- (void)listDetailViewController:(ListDetailViewController*)controller didFinishEditingChecklist:(Checklist*)checklist;

@end

@interface ListDetailViewController : UITableViewController<UITextFieldDelegate, IconPickerViewControllerDelegate>

@property (nonatomic, weak) IBOutlet UITextField* textField;
@property (nonatomic, weak) IBOutlet UIBarButtonItem* doneBarButoon;
@property (nonatomic, weak) id <ListDetailViewControllerDelegate> delegate;
@property (nonatomic, strong) Checklist* checklistToEdit;

@property (weak, nonatomic) IBOutlet UIImageView *iconImageView;

- (IBAction)cancel;
- (IBAction)done;

@end
