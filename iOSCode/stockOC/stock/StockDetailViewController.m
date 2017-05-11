//
//  StockDetailViewController.m
//  stock
//
//  Created by ZhangZehua on 5/11/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "StockDetailViewController.h"
#import "StockDetailCell.h"
#import "Stock.h"
#import "StockList.h"

@interface StockDetailViewController ()

@property (nonatomic) NSDateFormatter* formatter;

@end

static NSString* cellIdentifier = @"StockDetailCell";

@implementation StockDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  [self.tableView setBackgroundColor:[UIColor darkGrayColor]];
  [self.tableView setSeparatorColor:[UIColor lightGrayColor]];
  
  self.tableView.sectionHeaderHeight = 40;
  self.tableView.sectionFooterHeight = 40;
}

- (NSDateFormatter *) formatter {
  if (_formatter == nil) {
    _formatter = [[NSDateFormatter alloc] init];
    [_formatter setDateStyle:NSDateFormatterShortStyle];
    [_formatter setTimeStyle:NSDateFormatterShortStyle];
  }
  return _formatter;
}

- (BOOL)prefersStatusBarHidden {
  return YES;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 5;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  StockDetailCell* cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
  
  switch (indexPath.row) {
    case 0:
      cell.name1.text = self.stock ? [@"open" uppercaseString] : @"";
      cell.detailName1.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.price] : @"";
      cell.name2.text = self.stock ? [@"mkt cap" uppercaseString] : @"";
      cell.detailName2.text = self.stock ? [self abreviate:self.stock.cap] : @"";
      break;
    case 1:
      cell.name1.text = self.stock ? [@"high" uppercaseString] : @"";
      cell.detailName1.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.maxPrice] : @"";
      cell.name2.text = self.stock ? [@"52w high" uppercaseString] : @"";
      cell.detailName2.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.maxPriceAnnaul] : @"";
      break;
    case 2:
      cell.name1.text = self.stock ? [@"low" uppercaseString] : @"";
      cell.detailName1.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.minPrice] : @"";
      cell.name2.text = self.stock ? [@"52w low" uppercaseString] : @"";
      cell.detailName2.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.minPriceAnnaul] : @"";
      break;
    case 3:
      NSLog(@"currVol = %f", self.stock.vol);
      NSLog(@"currVol = %f", self.stock.averVol);
      cell.name1.text = self.stock ? [@"vol" uppercaseString] : @"";
      cell.detailName1.text = self.stock ? [self abreviate:self.stock.vol] : @"";
      cell.name2.text = self.stock ? [@"avg vol" uppercaseString] : @"";
      cell.detailName2.text = self.stock ? [self abreviate:self.stock.averVol] : @"";
      break;
    case 4:
      cell.name1.text = self.stock ? [@"p/e" uppercaseString] : @"";
      cell.detailName1.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.ratio] : @"";
      cell.name2.text = self.stock ? [@"yield" uppercaseString] : @"";
      cell.detailName2.text = self.stock ? [NSString stringWithFormat:@"%.2f", self.stock.yield] : @"";
      break;
    default:
      break;
  }
  
  return cell;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, tableView.frame.size.width, 40)];
  
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, tableView.frame.size.width, 40)];
  [label setFont:[UIFont boldSystemFontOfSize:12]];
  [label setTextColor:[UIColor whiteColor]];
  [label setTextAlignment:NSTextAlignmentCenter];
  [label setText:self.stock.name];
  if (self.stock) {
    [view addSubview:label];
  }
  [view setBackgroundColor:[UIColor darkGrayColor]];
  
  return view;
}

- (UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section {
  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, tableView.frame.size.width, 40)];
  
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, tableView.frame.size.width, 40)];
  [label setFont:[UIFont boldSystemFontOfSize:12]];
  [label setTextColor:[UIColor whiteColor]];
  [label setTextAlignment:NSTextAlignmentCenter];
  
  NSDate* date = [[StockList sharedStockList] lastDownloadDate];
  [label setText:date ? [@"Last Updated On: " stringByAppendingString:[self.formatter stringFromDate:date]] : @"Connection Error"];
  
  if (self.stock) {
    [view addSubview:label];
  }
  [view setBackgroundColor:[UIColor darkGrayColor]];
  
  return view;
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:NO];
}

- (NSString *) abreviate:(float)number {
  NSArray* units = @[@"", @"K", @"M", @"B", @"T", @"P"];
  float cap = number;
  int idx = 0;
  for (; cap > 1000.0f; cap /= 1000, ++idx);
  return cap ? [NSString stringWithFormat:@"%4.2f%@", cap, units[idx]] : @"--";
}

@end
