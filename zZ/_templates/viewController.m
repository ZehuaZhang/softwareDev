// View Controller

//// style

self.preferredContentSize = CGSizeMake(320, 202);

UIColor *barTintColor = [UIColor colorWithRed:20/255.0f green:160/255.0f blue:160/255.0f alpha:1.0f];
[[UISearchBar appearance] setBarTintColor:barTintColor];

[[UINavigationBar appearance] setBarTintColor:[UIColor blackColor]];

[[UINavigationBar appearance] setTitleTextAttributes:@{
  NSForegroundColorAttributeName : [UIColor whiteColor],
  }];

- (UIBarPosition)positionForBar:(id <UIBarPositioning>)bar {
  return UIBarPositionTopAttached;
}

self.tabBarController.tabBar.translucent = NO;

- (BOOL)tabBarController:(UITabBarController *)tabBarController shouldSelectViewController:(UIViewController *)viewController {
  tabBarController.tabBar.translucent = (viewController != self);
  return YES;
}

//// top view controller in app delegate
- (UIViewController *)topViewController {
  return [self topViewController:[UIApplication sharedApplication].keyWindow.rootViewController];
}

- (UIViewController *)topViewController:(UIViewController *)rootViewController {
  if (rootViewController.presentedViewController == nil) {
    return rootViewController;
  }
  
  if ([rootViewController isKindOfClass:[UINavigationController class]]) {
    return [self topViewController:[(UINavigationController *)rootViewController topViewController]];
  } else if ([rootViewController isKindOfClass:[UITabBarController class]]) {
    return [self topViewController:[(UITabBarController *)rootViewController selectedViewController]];
  }
  return [self topViewController:rootViewController.presentedViewController];
}

// UIAlertController

//// popover
UIControl *aControl = (UIControl *) sender;
CGRect frameInView = [aControl convertRect:aControl.bounds toView:self.view];
_alert.popoverPresentationController.sourceRect = frameInView;
_alert.popoverPresentationController.sourceView = self.view;
_alert.popoverPresentationController.permittedArrowDirections = UIPopoverArrowDirectionAny;
[self presentViewController:alertController animated:YES completion:nil];

// Pop over

//// Custome Controller

- (MenuViewController *)popoverMenu {
  if (_popoverMenu == nil) {
    _popoverMenu = [[MenuViewController alloc] initWithStyle:UITableViewStyleGrouped];
    _popoverMenu.detailViewController = self;
  }
  return _popoverMenu;
}

//// Bar Button
- (IBAction)barButtonLeft:(id)sender {
  // grab the view controller we want to show
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
  UIViewController *controller = [storyboard instantiateViewControllerWithIdentifier:@"Pop"];
  
  // present the controller
  // on iPad, this will be a Popover
  // on iPhone, this will be an action sheet
  controller.modalPresentationStyle = UIModalPresentationPopover;
  [self presentViewController:controller animated:YES completion:nil];
  
  // configure the Popover presentation controller
  UIPopoverPresentationController *popController = [controller popoverPresentationController];
  popController.permittedArrowDirections = UIPopoverArrowDirectionAny;
  popController.barButtonItem = self.leftButton;
  popController.delegate = self;
}

//// Anchor
- (IBAction)popoverWithoutBarButton:(id)sender {  
  // grab the view controller we want to show
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
  UIViewController *controller = [storyboard instantiateViewControllerWithIdentifier:@"Pop"];
  
  // present the controller
  // on iPad, this will be a Popover
  // on iPhone, this will be an action sheet
  controller.modalPresentationStyle = UIModalPresentationPopover;
  [self presentViewController:controller animated:YES completion:nil];
  
  // configure the Popover presentation controller
  UIPopoverPresentationController *popController = [controller popoverPresentationController];
  popController.permittedArrowDirections = UIPopoverArrowDirectionUp;
  popController.delegate = self;
  
  // in case we don't have a bar button as reference
  popController.sourceView = self.view;
  popController.sourceRect = CGRectMake(30, 50, 10, 10);
}

//// Delegate
- (void)popoverPresentationControllerDidDismissPopover:(UIPopoverPresentationController *)popoverPresentationController {
  // called when a Popover is dismissed
}

- (BOOL)popoverPresentationControllerShouldDismissPopover:(UIPopoverPresentationController *)popoverPresentationController {
  // return YES if the Popover should be dismissed
  // return NO if the Popover should not be dismissed
  return YES;
}

- (void)popoverPresentationController:(UIPopoverPresentationController *)popoverPresentationController willRepositionPopoverToRect:(inout CGRect *)rect inView:(inout UIView *__autoreleasing  _Nonnull *)view {   
  // called when the Popover changes position
}

// Email Controller

- (void)sendSupportEmail {
  MFMailComposeViewController *controller = [[MFMailComposeViewController alloc] init];
  if (controller != nil) {
    [controller setSubject:NSLocalizedString(@"Support Request", @"Email subject")];
    [controller setToRecipients:@[@"your@email-address-here.com"]];
    controller.mailComposeDelegate = self;
    controller.modalPresentationStyle = UIModalPresentationFormSheet;
    [self presentViewController:controller animated:YES completion:nil];
  }
}

- (void)mailComposeController:(MFMailComposeViewController *)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError *)error {
  [self dismissViewControllerAnimated:YES completion:nil];
}
