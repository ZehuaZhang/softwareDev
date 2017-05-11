//
//  Stock.h
//  stock
//
//  Created by ZhangZehua on 5/10/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Stock : NSObject

@property (nonatomic, copy) NSString* name;
@property (nonatomic) float price;
@property (nonatomic) float openPrice;
@property (nonatomic) float maxPrice;
@property (nonatomic) float maxPriceAnnaul;
@property (nonatomic) float minPrice;
@property (nonatomic) float minPriceAnnaul;
@property (nonatomic) float vol;
@property (nonatomic) float averVol;
@property (nonatomic) float ratio;
@property (nonatomic) float cap;
@property (nonatomic) float yield;

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
                        yield:(float)yield;


@end
