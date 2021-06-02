//
//  LandscapeViewController.h
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@class Search;

@interface LandscapeViewController : UIViewController

@property (nonatomic, strong) Search* search;

- (void)searchResultsReceived;

@end
