//
//  StockCell.m
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "StockCell.h"
#import "StockList.h"
#import "Stock.h"

@implementation StockCell {
}

- (void)awakeFromNib {
  [super awakeFromNib];
  // Initialization code
  
  self.stockBtn.layer.cornerRadius = 5;
  self.clipsToBounds = YES;
  [self.stockBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  
  self.priceLabel.textColor = [UIColor whiteColor];
  self.stockNameLabel.textColor = [UIColor whiteColor];
  
  [self setBackgroundColor:[UIColor blackColor]];
  [self setSeparatorInset:UIEdgeInsetsMake(0, 20, 0, 20)];
  
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
  [super setSelected:selected animated:animated];
  if (selected) {
    [self setBackgroundColor:[UIColor darkGrayColor]];
    self.layer.borderColor = [[UIColor darkGrayColor] CGColor];
    self.layer.borderWidth = 1;
  } else {
    [self setBackgroundColor:[UIColor blackColor]];
    self.layer.borderColor = [[UIColor clearColor] CGColor];
    self.layer.borderWidth = 0;
  }
}

- (IBAction)btnPressed:(id)sender {
  ButtonState state = [[StockList sharedStockList] btnState];
  
  [[StockList sharedStockList] setBtnState:(state + 1) % 3];
  
  [[NSNotificationCenter defaultCenter] postNotificationName:NCButtonClicked object:self];
}

- (void)updateForStock:(Stock *)stock {
  self.stockNameLabel.text = stock.name;
  self.priceLabel.text = [NSString stringWithFormat:@"%.2f", stock.price];
  
  [self updateBtnForStock:stock];
}

- (void)updateBtnForStock:(Stock *)stock {
  float priceDiff = stock.price - stock.openPrice;
  float priceDiffPercentage = priceDiff * 100 / stock.openPrice;
  
  self.stockBtn.backgroundColor = priceDiff > 0 ? [UIColor colorWithRed:0 green:1 blue:0 alpha:0.8] : [UIColor colorWithRed:1 green:0 blue:0 alpha:0.8];
  
  NSString* stockBtnTitle;
  switch ([[StockList sharedStockList] btnState]) {
    case ButtonStateTrendPercentage:
      stockBtnTitle = [(priceDiff > 0 ? @"+ " : @"- ") stringByAppendingFormat:@"%2.2f%%", fabs(priceDiffPercentage)];
      break;
    case ButtonStateTrend:
      stockBtnTitle = [(priceDiff > 0 ? @"+ " : @"- ") stringByAppendingFormat:@"%8.2f", fabs(priceDiff)];
      break;
    case ButtonStateMarketCap:
      stockBtnTitle = [self capTitleForStock:stock];
      break;
    default:
      break;
  }
  
  [UIView animateWithDuration:0.5f delay:0.0f options:UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionAllowUserInteraction animations:^{
    [self.stockBtn setTitle:stockBtnTitle forState:UIControlStateNormal];
  } completion:nil];
}

- (NSString *) capTitleForStock:(Stock *)stock {
  NSArray* units = @[@"", @"K", @"M", @"B", @"T", @"P"];
  float cap = stock.cap;
  int idx = 0;
  for (; cap > 1000.0f; cap /= 1000, ++idx);
  return cap ? [NSString stringWithFormat:@"%4.2f%@", cap, units[idx]] : @"--";
}


@end
