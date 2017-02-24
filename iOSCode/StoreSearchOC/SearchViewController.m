//
//  SearchViewController.m
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "SearchViewController.h"
#import "SearchResult.h"
#import "SearchResultCell.h"
#import "DetailViewController.h"
#import "LandscapeViewController.h"
#import "Search.h"

static NSString* const SearchResultCellIdentifier = @"SearchResultCell";
static NSString* const NothingFoundCellIdentifier = @"NothingFoundCell";
static NSString* const LoadingCellIdentifier = @"LoadingCell";

@interface SearchViewController () <UITableViewDataSource, UITableViewDelegate, UISearchBarDelegate>

@property (weak, nonatomic) IBOutlet UISearchBar* searchBar;
@property (weak, nonatomic) IBOutlet UITableView* tableView;
@property (weak, nonatomic) IBOutlet UISegmentedControl *segmentedControl;

@end

@implementation SearchViewController {
  LandscapeViewController* _landscapeViewController;
  Search* _search;
  UIStatusBarStyle _statusBarStyle;
}

- (IBAction)segmentValueChanged:(UISegmentedControl *)sender {
  if (_search) {
    [self performSearch];
  }
}

- (void)viewDidLoad {
  [super viewDidLoad];
  if (UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPad) {
    [self.searchBar becomeFirstResponder];
  }
  
  _statusBarStyle = UIStatusBarStyleDefault;
  
  self.tableView.contentInset = UIEdgeInsetsMake(108, 0, 0, 0);
  self.tableView.rowHeight = 80;
  
  UINib* cellNib = [UINib nibWithNibName:SearchResultCellIdentifier bundle:nil];
  [self.tableView registerNib:cellNib forCellReuseIdentifier:SearchResultCellIdentifier];
  cellNib = [UINib nibWithNibName:NothingFoundCellIdentifier bundle:nil];
  [self.tableView registerNib:cellNib forCellReuseIdentifier:NothingFoundCellIdentifier];
  cellNib = [UINib nibWithNibName:LoadingCellIdentifier bundle:nil];
  [self.tableView registerNib:cellNib forCellReuseIdentifier:LoadingCellIdentifier];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (UIStatusBarStyle)preferredStatusBarStyle {
  return _statusBarStyle;
}

- (void)showNetworkError {
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:NSLocalizedString(@"Whoops...", @"Error Alert Title") message:NSLocalizedString(@"There was an error reading from the itunes Store. Please try again later.", @"Error Alert Content") preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* action = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
  [alert addAction:action];
  [self presentViewController:alert animated:YES completion:nil];
}

- (void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration {
  [super willRotateToInterfaceOrientation:toInterfaceOrientation duration:duration];
  if (UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPad) {
    if (UIInterfaceOrientationIsPortrait(toInterfaceOrientation)) {
      [self hideLandscapeViewWithDuration:duration];
    } else {
      [self showLandscapeViewWithDuration:duration];
    }
  }
}

- (void)showLandscapeViewWithDuration:(NSTimeInterval)duration {
  if (!_landscapeViewController) {
    _landscapeViewController = [[LandscapeViewController alloc] initWithNibName:@"LandscapeViewController" bundle:nil];
    _landscapeViewController.search = _search;
    _landscapeViewController.view.frame = self.view.bounds;
    _landscapeViewController.view.alpha = 0.0f;
    
    [self.view addSubview:_landscapeViewController.view];
    [self addChildViewController:_landscapeViewController];
    
    [UIView animateWithDuration:duration animations:^{
      _landscapeViewController.view.alpha = 1.0f;
      _statusBarStyle = UIStatusBarStyleLightContent;
      [self setNeedsStatusBarAppearanceUpdate];
    } completion:^(BOOL finished) {
      [_landscapeViewController didMoveToParentViewController:self];
    }];
    [self.searchBar resignFirstResponder];
    [self.detailViewController dismissFromParentViewControllerWithAnimationType:DetailViewControllerAnimationTypeFade];
  }
}

- (void)hideLandscapeViewWithDuration:(NSTimeInterval)duration {
  if (_landscapeViewController) {
    [_landscapeViewController willMoveToParentViewController:nil];
    [UIView animateWithDuration:duration animations:^{
      _landscapeViewController.view.alpha = 0.0f;
      _statusBarStyle = UIStatusBarStyleDefault;
      [self setNeedsStatusBarAppearanceUpdate];
    } completion:^(BOOL finished) {
      [_landscapeViewController.view removeFromSuperview];
      [_landscapeViewController removeFromParentViewController];
      _landscapeViewController = nil;
    }];
  }
}

#pragma mark - UITableViewDataSource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  if (!_search) {
    return 0;
  } else if (_search.isLoading || ![_search.searchResults count]) {
    return 1;
  }
  return [_search.searchResults count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  if ([_search.searchResults count]) {
    SearchResultCell* cell = (SearchResultCell*)[tableView dequeueReusableCellWithIdentifier:SearchResultCellIdentifier forIndexPath:indexPath];
    SearchResult* searchResult = _search.searchResults[indexPath.row];
    [cell configureSeachResult:searchResult];
    return cell;
  }
  if (_search.isLoading) {
    UITableViewCell* cell = [tableView dequeueReusableCellWithIdentifier:LoadingCellIdentifier forIndexPath:indexPath];
    UIActivityIndicatorView* spinner = (UIActivityIndicatorView*)[cell viewWithTag:100];
    [spinner startAnimating];
    return cell;
  }
  return [tableView dequeueReusableCellWithIdentifier:NothingFoundCellIdentifier forIndexPath:indexPath];
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.searchBar resignFirstResponder];
  
  SearchResult* searchResult = _search.searchResults[indexPath.row];
  if (UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPad) {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    DetailViewController *controller = [[DetailViewController alloc] initWithNibName:@"DetailViewController" bundle:nil];
    controller.searchResult = searchResult;
    [controller presentInParentViewController:self];
    self.detailViewController = controller;
  } else {
    self.detailViewController.searchResult = searchResult;
  }
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  if ([_search.searchResults count] && !_search.isLoading) {
    return indexPath;
  }
  return nil;
}

#pragma mark - UISearchBarDelegate

- (void)performSearch {
  _search = [[Search alloc] init];
  
  [_search performSearchForText:self.searchBar.text category:self.segmentedControl.selectedSegmentIndex completion:^(BOOL success) {
    if (!success) {
      [self showNetworkError];
    }
    [_landscapeViewController searchResultsReceived];
    [self.tableView reloadData];
  }];
  [self.tableView reloadData];
  [self.searchBar resignFirstResponder];
}

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
  [self performSearch];
}

- (UIBarPosition)positionForBar:(id<UIBarPositioning>)bar {
  return UIBarPositionTopAttached;
}

@end
