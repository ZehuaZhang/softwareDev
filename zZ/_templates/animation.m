// Animation & sound

//// CATransition
CATransition *transition = [CATransition animation];
transition.type = kCATransitionFade;
transition.duration = 1;
transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseOut];

[self startNewRound];
[self updateLabels];

[self.view.layer addAnimation:transition forKey:nil];

//// UIview CG
self.alpha = 0.0f;
self.transform = CGAffineTransformMakeScale(1.3f, 1.3f);

[UIView animateWithDuration:0.3 animations:^{
  self.alpha = 1.0f;
  self.transform = CGAffineTransformIdentity;
}];

//// CA Basic Animation
self.containerView.center = CGPointMake(self.view.bounds.size.width * 2.0f, 40.0f + self.containerView.bounds.size.height / 2.0f);

CABasicAnimation *panelMover = [CABasicAnimation animationWithKeyPath:@"position"];
panelMover.removedOnCompletion = NO;
panelMover.fillMode = kCAFillModeForwards;
panelMover.duration = 0.6;
panelMover.fromValue = [NSValue valueWithCGPoint:self.containerView.center];
panelMover.toValue = [NSValue valueWithCGPoint:CGPointMake(self.view.bounds.size.width / 2.0f, self.containerView.center.y)];
panelMover.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseOut];
panelMover.delegate = self;
[self.containerView.layer addAnimation:panelMover forKey:@"panelMover"];

CABasicAnimation *logoMover = [CABasicAnimation animationWithKeyPath:@"position"];
logoMover.removedOnCompletion = NO;
logoMover.fillMode = kCAFillModeForwards;
logoMover.duration = 0.5;
logoMover.fromValue = [NSValue valueWithCGPoint:_logoButton.center];
logoMover.toValue = [NSValue valueWithCGPoint:CGPointMake(-_logoButton.center.x, _logoButton.center.y)];
logoMover.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
[_logoButton.layer addAnimation:logoMover forKey:@"logoMover"];

CABasicAnimation *logoRotator = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];
logoRotator.removedOnCompletion = NO;
logoRotator.fillMode = kCAFillModeForwards;
logoRotator.duration = 0.5;
logoRotator.fromValue = @0.0f;
logoRotator.toValue = @(-2.0f * M_PI);
logoRotator.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
[_logoButton.layer addAnimation:logoRotator forKey:@"logoRotator"];

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
  [self.containerView.layer removeAllAnimations];
  self.containerView.center = CGPointMake(self.view.bounds.size.width / 2.0f, 40.0f + self.containerView.bounds.size.height / 2.0f);

  [_logoButton.layer removeAllAnimations];
  [_logoButton removeFromSuperview];
  _logoButton = nil;
}

//// CA Key Frame, Basic, UIView

- (void)presentInParentViewController:(UIViewController *)parentViewController {
  _gradientView = [[GradientView alloc] initWithFrame:parentViewController.view.bounds];
  [parentViewController.view addSubview:_gradientView];

  self.view.frame = parentViewController.view.bounds;
  [parentViewController.view addSubview:self.view];
  [parentViewController addChildViewController:self];

  CAKeyframeAnimation *bounceAnimation = [CAKeyframeAnimation animationWithKeyPath:@"transform.scale"];

  bounceAnimation.duration = 0.4;
  bounceAnimation.delegate = self;

  bounceAnimation.values = @[ @0.7, @1.2, @0.9, @1.0 ];
  bounceAnimation.keyTimes = @[ @0.0, @0.334, @0.666, @1.0 ];

  bounceAnimation.timingFunctions = @[
    [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut],
    [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut],
    [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut]];

  [self.view.layer addAnimation:bounceAnimation forKey:@"bounceAnimation"];

  CABasicAnimation *fadeAnimation = [CABasicAnimation animationWithKeyPath:@"opacity"];
  fadeAnimation.fromValue = @0.0f;
  fadeAnimation.toValue = @1.0f;
  fadeAnimation.duration = 0.2;
  [_gradientView.layer addAnimation:fadeAnimation forKey:@"fadeAnimation"];
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
  [self didMoveToParentViewController:self.parentViewController];
}

- (void)dismissFromParentViewControllerWithAnimationType:(DetailViewControllerAnimationType)animationType {
  [self willMoveToParentViewController:nil];

  [UIView animateWithDuration:0.3 animations:^{

    if (animationType == DetailViewControllerAnimationTypeSlide) {
      CGRect rect = self.view.bounds;
      rect.origin.y += rect.size.height;
      self.view.frame = rect;
    } else {
      self.view.alpha = 0.0f;
    }
    _gradientView.alpha = 0.0f;

  } completion:^(BOOL finished) {
    [self.view removeFromSuperview];
    [self removeFromParentViewController];
    [_gradientView removeFromSuperview];
  }];
}


//// Sound

//// AudioService
- (void)loadSoundEffect {
  NSString *path = [[NSBundle mainBundle] pathForResource:@"Sound.caf" ofType:nil];

  NSURL *fileURL = [NSURL fileURLWithPath:path isDirectory:NO];
  if (fileURL == nil) {
    NSLog(@"NSURL is nil for path: %@", path);
    return;
  }

  OSStatus error = AudioServicesCreateSystemSoundID((__bridge CFURLRef)fileURL, &_soundID);
  if (error != kAudioServicesNoError) {
    NSLog(@"Error code %ld loading sound at path: %@", error, path);
    return;
  }
}

- (void)unloadSoundEffect {
  AudioServicesDisposeSystemSoundID(_soundID);
  _soundID = 0;
}

- (void)playSoundEffect {
  AudioServicesPlaySystemSound(_soundID);
}

//// AV
bgm = [self setupAudioPlayerWithFile:@"HallOfTheMountainKing" type:@"mp3"];

[bgm setVolume:0.3];
[bgm play];

- (AVAudioPlayer *)setupAudioPlayerWithFile:(NSString *)file type:(NSString *)type {
  NSString* path = [[NSBundle mainBundle] pathForResource:file ofType:type];
  NSURL* url = [NSURL fileURLWithPath:path];

  NSError* error;
  AVAudioPlayer* audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];

  if (!audioPlayer) {
    NSLog(@"%@", [error description]);
  }

  return audioPlayer;
}
