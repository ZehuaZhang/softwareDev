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