//
//  StockList.m
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "StockList.h"
#import "Stock.h"

@implementation StockList

static StockList* _sharedInstance = nil;

+ (StockList *)sharedStockList {
  
  static dispatch_once_t one;
  dispatch_once(&one, ^{
    _sharedInstance = [[StockList alloc] init];
    [_sharedInstance createDefault];
  });
  return _sharedInstance;
}

- (void)createDefault {
  NSArray* names = @[@"GOOG", @"FB", @"AAPL", @"TSLA", @"MSFT", @"AMZN"];
  NSString* base = @"http://localhost:8080/stocks/";
  _stockList = @[].mutableCopy;
  for (NSString *name in names) {
    NSString* urlStr = [NSString stringWithFormat:@"%@%@", base, name];
    NSURL* url = [NSURL  URLWithString:urlStr];
    NSError* error = nil;
    NSData* data = [NSData dataWithContentsOfURL:url options:kNilOptions error:&error];
    if (error) {
      NSLog(@"error");
    }
    NSDictionary* json = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    NSLog(@"json = %@", json);
    Stock* stock = [Stock stockWithName:name
                                  price:[json[@"price"] floatValue]
                              openPrice:[json[@"open"] floatValue]
                               maxPrice:[json[@"intradayMax"] floatValue]
                         maxPriceAnnaul:[json[@"fiftyTwoWeekMax"] floatValue]
                               minPrice:[json[@"intradayMin"] floatValue]
                         minPriceAnnaul:[json[@"fiftyTwoWeekMin"] floatValue]
                                    vol:[json[@"intradayVolume"] floatValue]
                                averVol:[json[@"averageVolume"] floatValue]
                                  ratio:[json[@"peRatio"] floatValue]
                                    cap:[json[@"marketCap"] floatValue]
                                  yield:[json[@"dividendYield"] floatValue]];
    [_stockList addObject:stock];
    _lastDownloadDate = [NSDate date];
  }
  _btnState = ButtonStateTrendPercentage;
}

@end
