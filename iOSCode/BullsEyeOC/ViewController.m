//
//  ViewController.m
//  iOSApprenticeOCBullsEye
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController {
  int _currentValue;
  int _targetValue;
  int _score;
  int _round;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self startNewGame];
  [self updateLabels];
  UIImage* thumbImageNormal = [UIImage imageNamed:@"SliderThumb-Normal"];
  [self.slider setThumbImage:thumbImageNormal forState:UIControlStateNormal];
  UIImage* thumbImageHighlighted = [UIImage imageNamed:@"SliderThumb-Highlighted"];
  [self.slider setThumbImage:thumbImageHighlighted forState:UIControlStateHighlighted];
  UIImage* trackLeftImage = [[UIImage imageNamed:@"SliderTrackLeft"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 14, 0, 14)];
  [self.slider setMinimumTrackImage:trackLeftImage forState:UIControlStateNormal];
  UIImage* trackRightImage = [[UIImage imageNamed:@"SliderTrackRight"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 14, 0, 14)];
  [self.slider setMaximumTrackImage:trackRightImage forState:UIControlStateNormal];
}

- (void)startNewRound {
  _round += 1;
  _targetValue = 1 + arc4random_uniform(100);
  _currentValue = 50;
  self.slider.value = _currentValue;
}

- (void)startNewGame {
  _score = 0;
  _round = 0;
  [self startNewRound];
}

- (void)updateLabels {
  self.targetLabel.text = [NSString stringWithFormat:@"%d", _targetValue];
  self.scoreLabel.text = [NSString stringWithFormat:@"%d", _score];
  self.roundLabel.text = [NSString stringWithFormat:@"%d", _round];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (IBAction)showAlert {
  int difference = abs(_targetValue - _currentValue);
  int points = 100 - difference;
  
  NSString* title;
  if (difference == 0) {
    title = @"Perfect!";
    points += 100;
  } else if (difference < 5) {
    title = @"You almost had it!";
    if (difference == 1) {
      points += 50;
    }
  } else if (difference < 10) {
    title = @"Pretty good!";
  } else {
    title = @"Not even close...";
  }

  _score += points;
  
  NSString* message = [NSString stringWithFormat:@"You scored %d points", points];
  
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:title
                                                                 message:message
                                                          preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* action = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    [self startNewRound];
    [self updateLabels];
  }];
  
  [alert addAction:action];
  [self presentViewController:alert animated:true completion:nil];
  
}

- (IBAction)sliderMoved:(UISlider*)slider {
  _currentValue = roundf(slider.value);
}

- (IBAction)startOver {
  CATransition* transition = [CATransition animation];
  transition.type = kCATransitionFade;
  transition.duration = 1;
  transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseOut];
  
  [self startNewGame];
  [self updateLabels];
  
  [self.view.layer addAnimation:transition forKey:nil];
}

- (BOOL)prefersStatusBarHidden {
  return YES;
}

@end
