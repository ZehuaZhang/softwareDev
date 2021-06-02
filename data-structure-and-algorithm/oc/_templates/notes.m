// Image

locationCell.photoImageView.layer.cornerRadius = locationCell.photoImageView.bounds.size.width / 2.0f;
locationCell.photoImageView.clipsToBounds = YES;

imageView.contentMode = UIViewContentModeScaleAspectFit;

//// Pattern Color
self.view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"LandscapeBackground"]];

//// Template Image
UIImage *image = [[UIImage imageNamed:@"PriceButton"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 5, 0, 5)];
image = [image imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
[self.priceButton setBackgroundImage:image forState:UIControlStateNormal];

//// UISlider Image inset
[[UIImage imageNamed:@"SliderTrackLeft"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 14, 0, 14)]; // top left bottom right

//// Resize
- (UIImage *)resizedImageWithBounds:(CGSize)bounds {
  CGFloat horizontalRatio = bounds.width / self.size.width;
  CGFloat verticalRatio = bounds.height / self.size.height;
  CGFloat ratio = MIN(horizontalRatio, verticalRatio);
  CGSize newSize = CGSizeMake(self.size.width * ratio, self.size.height * ratio);

  UIGraphicsBeginImageContextWithOptions(newSize, YES, 0);
  [self drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
  UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();

  return newImage;
}

//// Set image
self.imageView.image = image;
self.imageView.frame = CGRectMake(10, 10, 260, 260);

//// resize to thumbnail
UIImage *thumbImage = [fullImage imageByScalingAndCroppingForSize:CGSizeMake(44, 44)];

// Spinner View

_spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
_spinner.center = CGPointMake(self.messageLabel.center.x, self.messageLabel.center.y + _spinner.bounds.size.height/2.0f + 15.0f);
[_spinner startAnimating];
[self.containerView addSubview:_spinner];

[_spinner removeFromSuperview];

// Button

[self.getButton setTitle:@"Stop" forState:UIControlStateNormal];

//// Custom Button
_logoButton = [UIButton buttonWithType:UIButtonTypeCustom];
[_logoButton setBackgroundImage:[UIImage imageNamed:@"Logo"] forState:UIControlStateNormal];
[_logoButton sizeToFit];
[_logoButton addTarget:self action:@selector(getLocation:) forControlEvents:UIControlEventTouchUpInside];
_logoButton.center = CGPointMake(self.view.bounds.size.width / 2.0f, self.view.bounds.size.height / 2.0f);

[self.view addSubview:_logoButton];

// NSCoding

//// coding
- (id)initWithCoder:(NSCoder *)aDecoder {
  if ((self = [super init])) {
    self.name = [aDecoder decodeObjectForKey:@"Name"];
    self.items = [aDecoder decodeObjectForKey:@"Items"];
    self.iconName = [aDecoder decodeObjectForKey:@"IconName"];
  }
  return self;
}

//// decoding
- (void)encodeWithCoder:(NSCoder *)aCoder
{
  [aCoder encodeObject:self.name forKey:@"Name"];
  [aCoder encodeObject:self.items forKey:@"Items"];
  [aCoder encodeObject:self.iconName forKey:@"IconName"];
}

- (NSString *)documentsDirectory {
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  return [paths firstObject];
}

- (NSString *)dataFilePath {
  return [[self documentsDirectory] stringByAppendingPathComponent:@"Checklists.plist"];
}

//// Archive
- (void)saveChecklists {
  NSMutableData *data = [[NSMutableData alloc] init];
  NSKeyedArchiver *archiver = [[NSKeyedArchiver alloc] initForWritingWithMutableData:data];
  [archiver encodeObject:self.lists forKey:@"Checklists"];
  [archiver finishEncoding];
  [data writeToFile:[self dataFilePath] atomically:YES];
}

//// Unarchive
- (void)loadChecklists {
  NSString *path = [self dataFilePath];
  if ([[NSFileManager defaultManager] fileExistsAtPath:path]) {
    NSData *data = [[NSData alloc] initWithContentsOfFile:path];
    NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:data];
    self.lists = [unarchiver decodeObjectForKey:@"Checklists"];
    [unarchiver finishDecoding];
  } else {
    self.lists = [[NSMutableArray alloc] initWithCapacity:20];
  }
}

// User Defaults

- (void)registerDefaults {
  NSDictionary *dictionary = @{
  @"ChecklistIndex" : @-1,
  @"FirstTime" : @YES,
  @"ChecklistItemId" : @0,
  };
  [[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
}

- (void)handleFirstTime {
  BOOL firstTime = [[NSUserDefaults standardUserDefaults] boolForKey:@"FirstTime"];
  if (firstTime) {
    Checklist *checklist = [[Checklist alloc] init];
    checklist.name = @"List";
    [self.lists addObject:checklist];
    [self setIndexOfSelectedChecklist:0];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"FirstTime"];
    [userDefaults synchronize];
  }
}

- (id)init {
  if ((self = [super init])) {
    [self loadChecklists];
    [self registerDefaults];
    [self handleFirstTime];
  }
  return self;
}

// App Delegate

//// Did finishing launching
@implementation ChecklistsAppDelegate {
  DataModel *_dataModel;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  _dataModel = [[DataModel alloc] init];

  UINavigationController *navigationController = (UINavigationController *)self.window.rootViewController;
  AllListsViewController *controller = navigationController.viewControllers[0];
  controller.dataModel = _dataModel;

  return YES;
}

@end

//// Init without storyboard
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  [self customizeAppearance];

  self.searchViewController = [[SearchViewController alloc] initWithNibName:@"SearchViewController" bundle:nil];

  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
    self.splitViewController = [[UISplitViewController alloc] init];

    DetailViewController *detailViewController = [[DetailViewController alloc] initWithNibName:@"DetailViewController" bundle:nil];
    UINavigationController *detailNavigationController = [[UINavigationController alloc] initWithRootViewController:detailViewController];

    self.splitViewController.delegate = detailViewController;
    self.splitViewController.viewControllers = @[self.searchViewController, detailNavigationController];

    self.searchViewController.detailViewController = detailViewController;

    self.window.rootViewController = self.splitViewController;
  } else {
    self.window.rootViewController = self.searchViewController;
  }

  [self.window makeKeyAndVisible];
  return YES;
}

// Date Formatter

static NSDateFormatter *formatter = nil;
if (formatter == nil) {
  formatter = [[NSDateFormatter alloc] init];
  [formatter setDateStyle:NSDateFormatterMediumStyle];
  [formatter setTimeStyle:NSDateFormatterShortStyle];
}
return [formatter stringFromDate:theDate];

// Date Picker

UIDatePicker *datePicker = [[UIDatePicker alloc] initWithFrame:CGRectMake(0.0f, 0.0f, 320.0f, 216.0f)];
[datePicker setDate:_dueDate animated:NO];
[datePicker addTarget:self action:@selector(dateChanged:) forControlEvents:UIControlEventValueChanged];

// Check version

#define XCODE_VERSION_GREATER_THAN_OR_EQUAL_TO_8    __has_include(<UserNotifications/UserNotifications.h>)

#define SYSTEM_VERSION_GRATERTHAN_OR_EQUALTO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)

// User Notication

UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
[center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert)
                      completionHandler:^(BOOL granted, NSError * _Nullable error) {
                      }];

- (void)scheduleNotification {
  [self cancelNotification];

  if (self.shouldRemind && [self.dueDate compare:[NSDate date]] != NSOrderedAscending) {
    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
    content.title = [NSString localizedUserNotificationStringForKey:@"Hey!" arguments:nil];
    content.body = [NSString localizedUserNotificationStringForKey:self.text arguments:nil];;
    content.sound = [UNNotificationSound defaultSound];
    content.badge = [NSNumber numberWithInteger:[[UIApplication sharedApplication] applicationIconBadgeNumber] + 1];
    
    NSDateComponents* triggerDate = [[NSCalendar currentCalendar] components:NSCalendarUnitYear + NSCalendarUnitMonth + NSCalendarUnitDay + NSCalendarUnitHour + NSCalendarUnitMinute + NSCalendarUnitSecond
                                                                    fromDate:self.dueDate];
    
    UNCalendarNotificationTrigger* trigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:triggerDate repeats:NO];
    
    
    NSString* identifier = [NSString stringWithFormat:@"%ld", self.itemId];
    
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier
                                                                          content:content
                                                                          trigger:trigger];
    
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {

    }];
  }
}

- (void)cancelNotification {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  NSString* identifier = [NSString stringWithFormat:@"%ld", self.itemId];
  
  [center removeDeliveredNotificationsWithIdentifiers:@[identifier]];
  [center removePendingNotificationRequestsWithIdentifiers:@[identifier]];
}

// NSNotification Center

[[NSNotificationCenter defaultCenter] addObserver:self
  selector:@selector(applicationDidEnterBackground)
  name:UIApplicationDidEnterBackgroundNotification
  object:nil];

[[NSNotificationCenter defaultCenter] addObserver:self
  selector:@selector(contextDidChange:)
  name:NSManagedObjectContextObjectsDidChangeNotification
  object:self.managedObjectContext];

// PCH

// 1. Add new PCH file to the project: New file > Other > PCH file.
// 2. At the Target's Build Settings option, set the value of Prefix Header to your PCH file name,
//    with the project name as prefix (i.e. for project named TestProject and PCH file named MyPrefixHeaderFile,
//    add the value TestProject/MyPrefixHeaderFile.pch to the plist).
//    TIP: You can use things like $(SRCROOT) or $(PROJECT_DIR) to get to the path of where you put the .pch in the project.
// 3. At the Target's Build Settings option, set the value of Precompile Prefix Header to YES.

#ifdef __OBJC__
  #import <UIKit/UIKit.h>
  #import <Foundation/Foundation.h>
    #import <CoreLocation/CoreLocation.h>
    #import <CoreData/CoreData.h>
    #import <MapKit/MapKit.h>
#endif

extern NSString * const ManagedObjectContextSaveDidFailNotification;

#define FATAL_CORE_DATA_ERROR(__error__)\
  NSLog(@"*** Fatal error in %s:%d\n%@\n%@",\
      __FILE__, __LINE__, error, [error userInfo]);\
  [[NSNotificationCenter defaultCenter] postNotificationName:\
      ManagedObjectContextSaveDidFailNotification object:error];

// Status Bar

- (UIStatusBarStyle)preferredStatusBarStyle {
  return UIStatusBarStyleLightContent;
}

- (BOOL)prefersStatusBarHidden {
  return YES;
}

// Error

_lastLocationError = [NSError errorWithDomain:@"MyLocationsErrorDomain" code:1 userInfo:nil];

// UILabel

//// Size To Fit
CGRect rect = CGRectMake(100, 10, 205, 10000);
self.addressLabel.frame = rect;
[self.addressLabel sizeToFit];
rect.size.height = self.addressLabel.frame.size.height;
self.addressLabel.frame = rect;

// Block

typedef void (^SearchBlock)(BOOL success);
- (void)performSearchForText:(NSString *)text category:(NSInteger)category completion:(SearchBlock)block;

// AF Networking

//// cell
- (void)prepareForReuse {
  [super prepareForReuse];
  [self.artworkImageView cancelImageRequestOperation];
  self.nameLabel.text = nil;
  self.artistNameLabel.text = nil;
}

[self.artworkImageView setImageWithURL:[NSURL URLWithString:searchResult.artworkURL60] placeholderImage:[UIImage imageNamed:@"Placeholder"]];

//// button
- (void)downloadImageForSearchResult:(SearchResult *)searchResult andPlaceOnButton:(UIButton *)button {
  NSURL *url = [NSURL URLWithString:searchResult.artworkURL60];

  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
  [request addValue:@"image/*" forHTTPHeaderField:@"Accept"];

  __weak UIButton *weakButton = button;

  [button setImageForState:UIControlStateNormal withURLRequest:request placeholderImage:nil success:^(NSHTTPURLResponse *response, UIImage *image) {

    UIImage *unscaledImage = [UIImage imageWithCGImage:image.CGImage scale:1.0 orientation:image.imageOrientation];
    [weakButton setImage:unscaledImage forState:UIControlStateNormal];
  }
  failure:nil];
}

// String

/* Format for artist name label */
"ARTIST_NAME_LABEL_FORMAT" = "%1$@ (%2$@)";

self.artistNameLabel.text = [NSString stringWithFormat:NSLocalizedString(@"ARTIST_NAME_LABEL_FORMAT", @"Format for artist name label"), artistName, kind];

// Search Bar

- (UIBarPosition)positionForBar:(id <UIBarPositioning>)bar {
  return UIBarPositionTopAttached;
}

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
  [self performSearch];
}

- (void)performSearch {
  _search = [[Search alloc] init];

  [_search performSearchForText:self.searchBar.text
    category:self.segmentedControl.selectedSegmentIndex
    completion:^(BOOL success) {
     if (!success) {
       [self showNetworkError];
     }

     [_landscapeViewController searchResultsReceived];
     [self.tableView reloadData];
  }];

  [self.tableView reloadData];
  [self.searchBar resignFirstResponder];
}

- (void)showNetworkError {
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:NSLocalizedString(@"Whoops...", @"Error alert: title")
                                                                 message:NSLocalizedString(@"Error reading iTunes Store. Please try again.", @"Error alert: message")
                                                          preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* action = [UIAlertAction actionWithTitle:NSLocalizedString(@"OK", @"Error alert: cancel button")
                                                   style:UIAlertActionStyleCancel
                                                 handler:nil];
  [alert addAction:action];
  [self presentViewController:alert animated:YES completion:nil];
}

- (IBAction)segmentChanged:(UISegmentedControl *)sender {
  if (_search != nil) {
    [self performSearch];
  }
}

// enum

typedef NS_ENUM(NSUInteger, DetailViewControllerAnimationType) {
  DetailViewControllerAnimationTypeSlide,
  DetailViewControllerAnimationTypeFade
};

// shared application

//// open url
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:self.searchResult.storeURL]];

// page control
self.pageControl.numberOfPages = 0;

//// with scroll view
self.scrollView.contentSize = CGSizeMake(numPages*scrollViewWidth, self.scrollView.bounds.size.height);

- (void)scrollViewDidScroll:(UIScrollView *)theScrollView {
  CGFloat width = self.scrollView.bounds.size.width;
  int currentPage = (self.scrollView.contentOffset.x + width/2.0f) / width;
  self.pageControl.currentPage = currentPage;
}

- (IBAction)pageChanged:(UIPageControl *)sender {
  [UIView animateWithDuration:0.3
    delay:0
    options:UIViewAnimationOptionCurveEaseInOut
    animations:^{
      self.scrollView.contentOffset = CGPointMake(self.scrollView.bounds.size.width * sender.currentPage, 0);
    }
    completion:nil];
}
