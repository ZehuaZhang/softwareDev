//
//  DetailViewController.h
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SearchResult;

typedef NS_ENUM(NSUInteger, DetailViewControllerAnimationType) {
  DetailViewControllerAnimationTypeSlide,
  DetailViewControllerAnimationTypeFade
};

@interface DetailViewController : UIViewController <UISplitViewControllerDelegate>

@property (nonatomic, strong) SearchResult *searchResult;

- (void)presentInParentViewController:(UIViewController *)parentViewController;
- (void)dismissFromParentViewControllerWithAnimationType:(DetailViewControllerAnimationType)animationType;
- (void)sendSupportEmail;

@end
