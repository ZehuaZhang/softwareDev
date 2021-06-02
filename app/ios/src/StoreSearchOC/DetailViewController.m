//
//  DetailViewController.m
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <QuartzCore/QuartzCore.h>
#import <MessageUI/MessageUI.h>
#import "DetailViewController.h"
#import "MenuViewController.h"
#import "SearchResult.h"
#import "GradientView.h"

@interface DetailViewController () <UIGestureRecognizerDelegate, CAAnimationDelegate, MFMailComposeViewControllerDelegate>

@property (nonatomic, weak) IBOutlet UIView *popupView;
@property (nonatomic, weak) IBOutlet UIImageView *artworkImageView;
@property (nonatomic, weak) IBOutlet UILabel *nameLabel;
@property (nonatomic, weak) IBOutlet UILabel *artistNameLabel;
@property (nonatomic, weak) IBOutlet UILabel *kindLabel;
@property (nonatomic, weak) IBOutlet UILabel *genreLabel;
@property (nonatomic, weak) IBOutlet UIButton *priceButton;
@property (weak, nonatomic) IBOutlet UIButton *closeButton;
@property (nonatomic, strong) UITableViewController* menuPopoverController;

@end

@implementation DetailViewController {
  GradientView *_gradientView;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  UIImage *image = [[UIImage imageNamed:@"PriceButton"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 5, 0, 5)];
  image = [image imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
  [self.priceButton setBackgroundImage:image forState:UIControlStateNormal];
  self.view.tintColor = [UIColor colorWithRed:20/255.0f green:160/255.0f blue:160/255.0f alpha:1.0f];
  self.popupView.layer.cornerRadius = 10.0f;
  
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemAction target:self action:@selector(menuButtonPressed:)];
    self.view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"LandscapeBackground"]];
    self.title = [[[NSBundle mainBundle] localizedInfoDictionary] objectForKey:@"CFBundleDisplayName"];
    self.popupView.hidden = (self.searchResult == nil);
  } else {
    UITapGestureRecognizer *gestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(close:)];
    gestureRecognizer.cancelsTouchesInView = NO;
    gestureRecognizer.delegate = self;
    [self.view addGestureRecognizer:gestureRecognizer];
    
    if (self.searchResult) {
      [self updateUI];
    }
    self.view.backgroundColor = [UIColor clearColor];
  }
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (UITableViewController *)menuPopoverController {
  if (!_menuPopoverController) {
    MenuViewController* menuPopoverController = [[MenuViewController alloc] initWithStyle:UITableViewStyleGrouped];
    menuPopoverController.detailViewController = self;
    _menuPopoverController = menuPopoverController;
  }
  return _menuPopoverController;
}

- (void)menuButtonPressed:(UIBarButtonItem *)sender {
  if ([self.menuPopoverController isBeingPresented]) {
    [self dismissViewControllerAnimated:YES completion:nil];
  } else {
  self.menuPopoverController.modalPresentationStyle = UIModalPresentationPopover;
  self.menuPopoverController.popoverPresentationController.sourceView = (UIView*)sender;
  [self presentViewController:self.menuPopoverController animated:YES completion:nil];
  }
}

- (IBAction)close:(id)sender {
  [self dismissFromParentViewControllerWithAnimationType:DetailViewControllerAnimationTypeSlide];
}

- (IBAction)openInStore:(id)sender {
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:self.searchResult.storeURL] options:@{} completionHandler:nil];
}

- (void)setSearchResult:(SearchResult *)newSearchResult {
  if (_searchResult != newSearchResult) {
    _searchResult = newSearchResult;
    if ([self isViewLoaded]) {
      [self updateUI];
    }
  }
}

- (void)dismissFromParentViewControllerWithAnimationType:(DetailViewControllerAnimationType)animationType {
  [self willMoveToParentViewController:nil];
  [UIView animateWithDuration:0.3 animations:^{
    if (animationType == DetailViewControllerAnimationTypeSlide) {
      CGRect rect = self.view.bounds;
      rect.origin.y += rect.size.height;
      self.view.frame = rect;
    } else {
      self.view.alpha = 0.0f;
    }
    _gradientView.alpha = 0.0f;
  } completion:^(BOOL finished) {
    [self.view removeFromSuperview];
    [self removeFromParentViewController];
    [_gradientView removeFromSuperview];
  }];
}

- (void)presentInParentViewController:(UIViewController *)parentViewController {
  _gradientView = [[GradientView alloc] initWithFrame:parentViewController.view.bounds];
  [parentViewController.view addSubview:_gradientView];
  
  self.view.frame = parentViewController.view.bounds;
  [parentViewController.view addSubview:self.view];
  [parentViewController addChildViewController:self];
  
  CAKeyframeAnimation *bounceAnimation = [CAKeyframeAnimation animationWithKeyPath:@"transform.scale"];
  bounceAnimation.duration = 0.4;
  bounceAnimation.delegate = self;
  bounceAnimation.values = @[ @0.7, @1.2, @0.9, @1.0 ];
  bounceAnimation.keyTimes = @[ @0.0, @0.334, @0.666, @1.0 ];
  bounceAnimation.timingFunctions = @[[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut],
                                      [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut],
                                      [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut]];
  [self.view.layer addAnimation:bounceAnimation forKey:@"bounceAnimation"];
  
  CABasicAnimation *fadeAnimation = [CABasicAnimation animationWithKeyPath:@"opacity"];
  fadeAnimation.fromValue = @0.0f;
  fadeAnimation.toValue = @1.0f;
  fadeAnimation.duration = 0.2;
  [_gradientView.layer addAnimation:fadeAnimation forKey:@"fadeAnimation"];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch {
  return (touch.view == self.view);
}

- (void)updateUI {
  self.nameLabel.text = self.searchResult.name;
  NSString *artistName = self.searchResult.artistName;
  if (!artistName) {
    artistName = NSLocalizedString(@"Unknown", @"Artist Name Label Unkwown");
  }
  self.artistNameLabel.text = artistName;
  self.kindLabel.text = [self.searchResult kindForDisplay];
  self.genreLabel.text = self.searchResult.genre;
  
  NSNumberFormatter* formatter = [[NSNumberFormatter alloc] init];
  [formatter setNumberStyle:NSNumberFormatterCurrencyStyle];
  [formatter setCurrencyCode:self.searchResult.currency];
  NSString* priceText = @"Free";
  if ([self.searchResult.price floatValue] != 0.0f) {
    priceText = [formatter stringFromNumber:self.searchResult.price];
  }
  [self.priceButton setTitle:priceText forState:UIControlStateNormal];
  
  [self.artworkImageView setImage:[UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:self.searchResult.artworkURL100]]]];
  
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
    self.popupView.hidden = NO;
    [self.splitViewController dismissViewControllerAnimated:YES completion:nil];
  }
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
  [self didMoveToParentViewController:self.parentViewController];
}

#pragma mark - MFMailComposeViewControllerDelegate
- (void)mailComposeController:(MFMailComposeViewController*)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError*)error {
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)sendSupportEmail {
  [self dismissViewControllerAnimated:YES completion:nil];
  MFMailComposeViewController* controller = [[MFMailComposeViewController alloc] init];
  if (controller) {
    controller.mailComposeDelegate = self;
    controller.modalPresentationStyle = UIModalPresentationFormSheet;
    [controller setSubject:NSLocalizedString(@"Support Request", @"Email subject")];
    [controller setToRecipients:@[@"your@email-address-here.com"]];
    [self presentViewController:controller animated:YES completion:nil];
  }
}

#pragma mark - UISplitViewControllerDelegate

- (void)splitViewController:(UISplitViewController *)svc willChangeToDisplayMode:(UISplitViewControllerDisplayMode)displayMode {
  if (displayMode == UISplitViewControllerDisplayModePrimaryHidden) {
    self.navigationItem.leftBarButtonItem = svc.displayModeButtonItem;
  } else {
    if ([self.menuPopoverController isBeingPresented]) {
      [self dismissViewControllerAnimated:YES completion:nil];
    }
    [self.navigationItem setLeftBarButtonItem:nil animated:YES];
  }
}

@end
