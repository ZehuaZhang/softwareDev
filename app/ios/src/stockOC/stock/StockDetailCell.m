//
//  StockDetailCell.m
//  stock
//
//  Created by ZhangZehua on 5/11/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "StockDetailCell.h"

@implementation StockDetailCell

- (void)awakeFromNib {
    [super awakeFromNib];
  
  self.name1.textColor = [UIColor lightGrayColor];
  self.name2.textColor = [UIColor lightGrayColor];
  
  self.detailName1.textColor = [UIColor whiteColor];
  self.detailName2.textColor = [UIColor whiteColor];
  
  [self setBackgroundColor:[UIColor darkGrayColor]];
  [self setSeparatorInset:UIEdgeInsetsMake(0, 20, 0, 20)];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
