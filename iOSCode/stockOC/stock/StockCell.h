//
//  StockCell.h
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@class Stock;

@interface StockCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *stockNameLabel;
@property (weak, nonatomic) IBOutlet UILabel *priceLabel;
@property (weak, nonatomic) IBOutlet UIButton *stockBtn;

- (IBAction)btnPressed:(id)sender;

- (void)updateForStock:(Stock *)stock;
- (void)updateBtnForStock:(Stock *)stock;


@end
