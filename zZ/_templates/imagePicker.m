// Image Picker

- (void)takePhoto {
  _imagePicker = [[UIImagePickerController alloc] init];
  _imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
  _imagePicker.delegate = self;
  _imagePicker.allowsEditing = YES;
  _imagePicker.view.tintColor = self.view.tintColor;
  [self presentViewController:_imagePicker animated:YES completion:nil];
}

- (void)choosePhotoFromLibrary {
  _imagePicker = [[UIImagePickerController alloc] init];
  _imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  _imagePicker.delegate = self;
  _imagePicker.allowsEditing = YES;
  _imagePicker.view.tintColor = self.view.tintColor;
  [self presentViewController:_imagePicker animated:YES completion:nil];
}

- (void)showPhotoMenu {
  if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
    _alert = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    UIAlertAction* takePhotoAction = [UIAlertAction actionWithTitle:@"Take Photo" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      [self takePhoto];
    }];
    UIAlertAction* chooseLibraryAction = [UIAlertAction actionWithTitle:@"Choose From Library" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      [self choosePhotoFromLibrary];
    }];
    UIAlertAction* cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:nil];
    
    [_alert addAction:takePhotoAction];
    [_alert addAction:chooseLibraryAction];
    [_alert addAction:cancelAction];
    
    [self presentViewController:_alert animated:YES completion:nil];
  } else {
    [self choosePhotoFromLibrary];
  }
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
  _image = info[UIImagePickerControllerEditedImage];

  [self showImage:_image];
  [self.tableView reloadData];

  [self dismissViewControllerAnimated:YES completion:nil];
  _imagePicker = nil;
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
  [self dismissViewControllerAnimated:YES completion:nil];
  _imagePicker = nil;
}

// async
- (IBAction)addPictureTapped:(id)sender {
  if (self.picker == nil) {

        // 1) Show status
    [SVProgressHUD showWithStatus:@"Loading picker..."];

        // 2) Get a concurrent queue form the system
    dispatch_queue_t concurrentQueue =
    dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

        // 3) Load picker in background
    dispatch_async(concurrentQueue, ^{

      self.picker = [[UIImagePickerController alloc] init];
      self.picker.delegate = self;
      self.picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
      self.picker.allowsEditing = NO;

            // 4) Present picker in main thread
      dispatch_async(dispatch_get_main_queue(), ^{
        [self presentViewController:_picker animated:YES completion:nil];
        [SVProgressHUD dismiss];
      });

    });

  }  else {
    [self presentViewController:_picker animated:YES completion:nil];
  }
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
  
  UIImage *fullImage = (UIImage *) [info objectForKey:UIImagePickerControllerOriginalImage];
  
    // 1) Show status
  [SVProgressHUD showWithStatus:@"Resizing image..."];
  
    // 2) Get a concurrent queue form the system
  dispatch_queue_t concurrentQueue =
  dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
  
    // 3) Resize image in background
  dispatch_async(concurrentQueue, ^{
    
    UIImage *thumbImage = [fullImage imageByScalingAndCroppingForSize:CGSizeMake(44, 44)];
    
        // 4) Present image in main thread
    dispatch_async(dispatch_get_main_queue(), ^{
      self.detailItem.fullImage = fullImage;
      self.detailItem.thumbImage = thumbImage;
      self.imageView.image = fullImage;
      [SVProgressHUD dismiss];
    });
    
  });
  
  [self dismissViewControllerAnimated:YES completion:nil];

}