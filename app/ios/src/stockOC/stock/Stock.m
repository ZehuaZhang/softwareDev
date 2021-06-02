//
//  Stock.m
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "Stock.h"

@implementation Stock

+ (instancetype)stockWithName:(NSString *)name
                        price:(float)price
                    openPrice:(float)openPrice
                     maxPrice:(float)maxPrice
               maxPriceAnnaul:(float)maxPriceAnnaul
                     minPrice:(float)minPrice
               minPriceAnnaul:(float)minPriceAnnaul
                      vol:(float)vol
                      averVol:(float)averVol
                        ratio:(float)ratio
                          cap:(float)cap
                        yield:(float)yield {
  
  Stock* stock = [[Stock alloc] init];
  
  stock.name = name;
  stock.price = price;
  stock.openPrice = openPrice;
  stock.maxPrice = maxPrice;
  stock.maxPriceAnnaul = maxPriceAnnaul;
  stock.minPrice = minPrice;
  stock.minPriceAnnaul = minPriceAnnaul;
  stock.vol = vol;
  stock.averVol = averVol;
  stock.ratio = ratio;
  stock.cap = cap;
  stock.yield = yield;
  
  return stock;
}

@end
