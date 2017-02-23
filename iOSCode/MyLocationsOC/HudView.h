//
//  HudView.h
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HudView : UIView

+ (instancetype)hudInView:(UIView*)view animated:(BOOL)animated;

@property (nonatomic, strong) NSString* text;

@end
