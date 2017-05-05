// Hud View

//// checkmark and text
@implementation HudView

+ (instancetype)hudInView:(UIView *)view animated:(BOOL)animated {
  HudView *hudView = [[HudView alloc] initWithFrame:view.bounds];
  hudView.opaque = NO;

  [view addSubview:hudView];
  view.userInteractionEnabled = NO;

  [hudView showAnimated:animated];
  return hudView;
}

- (void)showAnimated:(BOOL)animated {
  if (animated) {
    self.alpha = 0.0f;
    self.transform = CGAffineTransformMakeScale(1.3f, 1.3f);

    [UIView animateWithDuration:0.3 animations:^{
      self.alpha = 1.0f;
      self.transform = CGAffineTransformIdentity;
    }];
  }
}

- (void)drawRect:(CGRect)rect {
  const CGFloat boxWidth = 96.0f;
  const CGFloat boxHeight = 96.0f;

  CGRect boxRect = CGRectMake(
    roundf(self.bounds.size.width - boxWidth) / 2.0f,
    roundf(self.bounds.size.height - boxHeight) / 2.0f,
    boxWidth,
    boxHeight);

  UIBezierPath *roundedRect = [UIBezierPath bezierPathWithRoundedRect:boxRect cornerRadius:10.0f];
  [[UIColor colorWithWhite:0.3f alpha:0.8f] setFill];
  [roundedRect fill];

  UIImage *image = [UIImage imageNamed:@"Checkmark"];

  CGPoint imagePoint = CGPointMake(
    self.center.x - roundf(image.size.width / 2.0f),
    self.center.y - roundf(image.size.height / 2.0f) - boxHeight / 8.0f);

  [image drawAtPoint:imagePoint];
  
  NSDictionary *attributes = @{
    NSFontAttributeName : [UIFont systemFontOfSize:16.0f],
    NSForegroundColorAttributeName : [UIColor whiteColor]
  };

  CGSize textSize = [self.text sizeWithAttributes:attributes];

  CGPoint textPoint = CGPointMake(
    self.center.x - roundf(textSize.width / 2.0f),
    self.center.y - roundf(textSize.height / 2.0f) + boxHeight / 4.0f);

  [self.text drawAtPoint:textPoint withAttributes:attributes];
}

@end

// Gradient View

@implementation GradientView

- (id)initWithFrame:(CGRect)frame {
  if ((self = [super initWithFrame:frame])) {
    self.backgroundColor = [UIColor clearColor];
    self.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  }
  return self;
}

- (void)dealloc {
  NSLog(@"dealloc %@", self);
}

- (void)drawRect:(CGRect)rect {
  const CGFloat components[8] = { 0.0f, 0.0f, 0.0f, 0.3f, 0.0f, 0.0f, 0.0f, 0.7f };
  const CGFloat locations[2] = { 0.0f, 1.0f };

  CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB();
  CGGradientRef gradient = CGGradientCreateWithColorComponents(space, components, locations, 2);
  CGColorSpaceRelease(space);

  CGFloat x = CGRectGetMidX(self.bounds);
  CGFloat y = CGRectGetMidY(self.bounds);
  CGPoint point = CGPointMake(x, y);
  CGFloat radius = MAX(x, y);

  CGContextRef context = UIGraphicsGetCurrentContext();
  CGContextDrawRadialGradient(context, gradient, point, 0, point, radius, kCGGradientDrawsAfterEndLocation);
  CGGradientRelease(gradient);
}

@end

// Add, Remove View, View Controllers programmatically

- (void)showLandscapeViewWithDuration:(NSTimeInterval)duration {
  if (_landscapeViewController == nil) {
    _landscapeViewController = [[LandscapeViewController alloc] initWithNibName:@"LandscapeViewController" bundle:nil];

    _landscapeViewController.search = _search;
    
    _landscapeViewController.view.frame = self.view.bounds;
    _landscapeViewController.view.alpha = 0.0f;
    
    [self.view addSubview:_landscapeViewController.view];
    [self addChildViewController:_landscapeViewController];

    [UIView animateWithDuration:duration animations:^{
      _landscapeViewController.view.alpha = 1.0f;
    
      _statusBarStyle = UIStatusBarStyleLightContent;
      [self setNeedsStatusBarAppearanceUpdate];

    } completion:^(BOOL finished) {
      [_landscapeViewController didMoveToParentViewController:self];
    }];

    [self.searchBar resignFirstResponder];
    [self.detailViewController dismissFromParentViewControllerWithAnimationType:DetailViewControllerAnimationTypeFade];
  }
}

- (void)hideLandscapeViewWithDuration:(NSTimeInterval)duration {
  if (_landscapeViewController != nil) {
    [_landscapeViewController willMoveToParentViewController:nil];

    [UIView animateWithDuration:duration animations:^{
      _landscapeViewController.view.alpha = 0.0f;
    
      _statusBarStyle = UIStatusBarStyleDefault;
      [self setNeedsStatusBarAppearanceUpdate];

    } completion:^(BOOL finished) {
      [_landscapeViewController.view removeFromSuperview];
      [_landscapeViewController removeFromParentViewController];
      _landscapeViewController = nil;
    }];
  }
}

[self.detailViewController dismissFromParentViewControllerWithAnimationType:DetailViewControllerAnimationTypeFade];
