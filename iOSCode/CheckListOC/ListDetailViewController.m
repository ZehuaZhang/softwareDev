//
//  ListDetailViewController.m
//  ChecklistsOC
//
//  Created by ZhangZehua on 2/20/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "ListDetailViewController.h"
#import "Checklist.h"

@interface ListDetailViewController ()

@end

@implementation ListDetailViewController {
  NSString* _iconName;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
  self = [super initWithCoder:coder];
  if (self) {
    _iconName = @"Folder";
  }
  return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
  if (self.checklistToEdit != nil) {
    self.title = @"Edit Checklist";
    self.textField.text = self.checklistToEdit.name;
    self.doneBarButoon.enabled = YES;
    _iconName = self.checklistToEdit.iconName;
  }
  self.iconImageView.image = [UIImage imageNamed:_iconName];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  
  [self.textField becomeFirstResponder];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (IBAction)cancel {
  [self.delegate listDetailViewControllerDidCancel:self];
}

- (IBAction)done {
  if (self.checklistToEdit == nil) {
    Checklist* checklist = [[Checklist alloc] init];
    checklist.name = self.textField.text;
    checklist.iconName = _iconName;
    [self.delegate listDetailViewController:self didFinishAddingChecklist:checklist];
  } else {
    self.checklistToEdit.name = self.textField.text;
    self.checklistToEdit.iconName = _iconName;
    [self.delegate listDetailViewController:self didFinishEditingChecklist:self.checklistToEdit];
  }
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  if (indexPath.section == 1) {
    return indexPath;
  } else {
    return nil;
  }
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
  NSString* newText = [textField.text stringByReplacingCharactersInRange:range withString:string] ;
  self.doneBarButoon.enabled = newText.length > 0;
  return YES;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
  if ([segue.identifier isEqualToString:@"PickIcon"]) {
    IconPickerViewController* controller = segue.destinationViewController;
    controller.delegate = self;
  }
}

- (void)iconPicker:(IconPickerViewController *)picker didPickIcon:(NSString *)iconName {
  _iconName = iconName;
  self.iconImageView.image = [UIImage imageNamed:_iconName];
  [self.navigationController popViewControllerAnimated:YES];
}

@end
