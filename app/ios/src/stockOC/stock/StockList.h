//
//  StockList.h
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, ButtonState) {
  ButtonStateTrendPercentage,
  ButtonStateTrend,
  ButtonStateMarketCap,
};

static NSString* NCButtonClicked = @"ButtonClicked";

@interface StockList : NSObject

@property (nonatomic, strong) NSMutableArray* stockList;
@property (nonatomic) ButtonState btnState;
@property (nonatomic) NSDate* lastDownloadDate;

+ (StockList *)sharedStockList;

@end
