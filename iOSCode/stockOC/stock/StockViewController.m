//
//  StockViewController.m
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "StockViewController.h"
#import "StockDetailViewController.h"
#import "StockList.h"
#import "StockCell.h"
#import "Stock.h"

@interface StockViewController ()

@property (weak, nonatomic) IBOutlet UITableView *masterView;
//@property (weak, nonatomic) IBOutlet UITableView *detailView;

@end

static NSString* cellIdentifier = @"StockCell";
static NSString* segueIdentifier = @"Show";

@implementation StockViewController {
  ButtonState _btnState;
  NSMutableArray* _stockList;
  Stock* _selectedStock;
  StockDetailViewController* _dvc;
}

- (BOOL)prefersStatusBarHidden {
  return NO;
}

- (UIStatusBarStyle)preferredStatusBarStyle {
  return UIStatusBarStyleLightContent;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [self.view setBackgroundColor:[UIColor blackColor]];
  
  [self.masterView setContentInset:UIEdgeInsetsMake(20, 0, 0, 0)];
  [self.masterView setBackgroundColor:[UIColor blackColor]];
  [self.masterView setSeparatorColor:[UIColor grayColor]];
  
  _btnState = [[StockList sharedStockList] btnState];
  _stockList = [[StockList sharedStockList] stockList];
  
  _dvc = [[self childViewControllers] firstObject];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(updateBtn) name:NCButtonClicked object:nil];
}

- (void)updateBtn {
  _btnState = [[StockList sharedStockList] btnState];
  
  for (StockCell* cell in [self.masterView visibleCells]) {
    [cell updateForStock:_stockList[[self.masterView indexPathForCell:cell].row]];
  }
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  if (tableView == self.masterView) {
    return [_stockList count];
  }
  return 5;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  if (tableView == _masterView) {
    StockCell* cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    Stock* stock = _stockList[indexPath.row];
    [cell updateForStock:stock];
    return cell;
  }
  return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  _selectedStock = _stockList[indexPath.row];
  _dvc.stock = _selectedStock;
  [_dvc.tableView reloadData];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
  if ([segue.identifier isEqualToString:segueIdentifier]) {
    StockDetailViewController* detailVC = segue.destinationViewController;
    detailVC.stock = _selectedStock;
    NSLog(@"stock = %@", detailVC.stock);
  }
}

@end
