// Gesture

//// hide keyboard
UITapGestureRecognizer *gestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(hideKeyboard:)];
gestureRecognizer.cancelsTouchesInView = NO;
[self.tableView addGestureRecognizer:gestureRecognizer];

- (void)hideKeyboard:(UIGestureRecognizer *)gestureRecognizer {
  CGPoint point = [gestureRecognizer locationInView:self.tableView];
  NSIndexPath *indexPath = [self.tableView indexPathForRowAtPoint:point];

  // If the user is tapping in the row with the text field, then we
  // don't want to hide the keyboard.

  if (indexPath != nil && indexPath.section == 0 && indexPath.row == 0) {
    return;
  }

  [self.descriptionTextView resignFirstResponder];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch {
  return (touch.view == self.view);
}

// touch

- (void)handleTouchAtLocation:(CGPoint)touchLocation {
    if (!self.editable) return;
    
    int newRating = 0;
    for(int i = self.imageViews.count - 1; i >= 0; i--) {
        UIImageView *imageView = [self.imageViews objectAtIndex:i];        
        if (touchLocation.x > imageView.frame.origin.x) {
            newRating = i+1;
            break;
        }
    }
    
    self.rating = newRating;
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    UITouch *touch = [touches anyObject];
    CGPoint touchLocation = [touch locationInView:self];
    [self handleTouchAtLocation:touchLocation];
}

- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    UITouch *touch = [touches anyObject];
    CGPoint touchLocation = [touch locationInView:self];
    [self handleTouchAtLocation:touchLocation];
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event {
    [self.delegate rateView:self ratingDidChange:self.rating];
}