//
//  ViewController.h
//  iOSApprenticeOCBullsEye
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController

@property (nonatomic, weak) IBOutlet UISlider* slider;
@property (nonatomic, weak) IBOutlet UILabel* targetLabel;
@property (nonatomic, weak) IBOutlet UILabel* scoreLabel;
@property (nonatomic, weak) IBOutlet UILabel* roundLabel;

- (IBAction)showAlert;
- (IBAction)sliderMoved:(id)slider;
- (IBAction)startOver;

@end

