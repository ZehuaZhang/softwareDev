//
//  AboutViewController.m
//  iOSApprenticeOCBullsEye
//
//  Created by ZhangZehua on 2/19/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "AboutViewController.h"

@interface AboutViewController ()

@end

@implementation AboutViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  NSString* htmlFile = [[NSBundle mainBundle] pathForResource:@"BullsEye" ofType:@"html"];
  NSData* htmlData = [NSData dataWithContentsOfFile:htmlFile];
  NSURL* baseURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] bundlePath]];
  [self.webView loadData:htmlData MIMEType:@"text/html" textEncodingName:@"UTF-8" baseURL:baseURL];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)close {
  [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
}

- (BOOL)prefersStatusBarHidden {
  return YES;
}

@end
