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