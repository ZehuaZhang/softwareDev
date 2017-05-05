// Core Data

[[NSNotificationCenter defaultCenter] addObserver:self
  selector:@selector(fatalCoreDataError:)
  name:ManagedObjectContextSaveDidFailNotification
  object:nil];

- (NSManagedObjectModel *)managedObjectModel {
  if (_managedObjectModel == nil) {
    NSString *modelPath = [[NSBundle mainBundle] pathForResource:@"DataModel" ofType:@"momd"];
    NSURL *modelURL = [NSURL fileURLWithPath:modelPath];
    _managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
  }
  return _managedObjectModel;
}

- (NSString *)documentsDirectory {
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  return [paths lastObject];
}

- (NSString *)dataStorePath {
  return [[self documentsDirectory] stringByAppendingPathComponent:@"DataStore.sqlite"];
}

- (NSPersistentStoreCoordinator *)persistentStoreCoordinator {
  if (_persistentStoreCoordinator == nil) {
    NSURL *storeURL = [NSURL fileURLWithPath:[self dataStorePath]];

    _persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:self.managedObjectModel];

    NSError *error;
    if (![_persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeURL options:nil error:&error]) {
      NSLog(@"Error adding persistent store %@, %@", error, [error userInfo]);
    }
  }
  return _persistentStoreCoordinator;
}

- (NSManagedObjectContext *)managedObjectContext {
  if (_managedObjectContext == nil) {
    NSPersistentStoreCoordinator *coordinator = self.persistentStoreCoordinator;
    if (coordinator != nil) {
      _managedObjectContext = [[NSManagedObjectContext alloc] init];
      [_managedObjectContext setPersistentStoreCoordinator:coordinator];
    }
  }
  return _managedObjectContext;
}

- (void)fatalCoreDataError:(NSNotification *)notification {
  UIAlertController* alert = [UIAlertController
                              alertControllerWithTitle:NSLocalizedString(@"Internal Error", nil)
                              message:NSLocalizedString(@"A Fatal Error has occured", nil)
                              preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* action;
  [alert addAction:action];
  
  [[self topViewController] presentViewController:alert animated:YES completion:nil];
}

//// handling photo

+ (NSInteger)nextPhotoId {
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSInteger photoId = [defaults integerForKey:@"PhotoID"];
  [defaults setInteger:photoId + 1 forKey:@"PhotoID"];
  [defaults synchronize];
  return photoId;
}

- (BOOL)hasPhoto {
  return (self.photoId != nil) && ([self.photoId integerValue] != -1);
}

- (NSString *)documentsDirectory {
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  return [paths lastObject];
}

- (NSString *)photoPath {
  NSString *filename = [NSString stringWithFormat:@"Photo-%ld.jpg", [self.photoId integerValue]];
  return [[self documentsDirectory] stringByAppendingPathComponent:filename];
}

- (UIImage *)photoImage {
//  NSAssert(self.photoId != nil, @"No photo ID set");
//  NSAssert([self.photoId integerValue] != -1, @"Photo ID is -1");
  if ([self hasPhoto]) {
    return [UIImage imageWithContentsOfFile:[self photoPath]];
  }
  return nil;
}

- (void)removePhotoFile {
  NSString *path = [self photoPath];
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if ([fileManager fileExistsAtPath:path]) {
    NSError *error;
    if (![fileManager removeItemAtPath:path error:&error]) {
      NSLog(@"Error removing file: %@", error);
    }
  }
}

//// actual write photo to persistent store

if (_image != nil) {
  if (![location hasPhoto]) {
    location.photoId = @([Location nextPhotoId]);
  }

  NSData *data = UIImageJPEGRepresentation(_image, 0.5);
  NSError *error;
  if (![data writeToFile:[location photoPath] options:NSDataWritingAtomic error:&error]) {
    NSLog(@"Error writing file: %@", error);
  }
}

//// create and save an entity

location = [NSEntityDescription insertNewObjectForEntityForName:@"Location" inManagedObjectContext:self.managedObjectContext];

NSError *error;
if (![self.managedObjectContext save:&error]) {
  FATAL_CORE_DATA_ERROR(error);
  return;
}

//// fetch results
- (NSFetchedResultsController *)fetchedResultsController {
  if (_fetchedResultsController == nil) {

    NSFetchRequest *fetchRequest = [[NSFetchRequest alloc] init];

    NSEntityDescription *entity = [NSEntityDescription entityForName:@"Location" inManagedObjectContext:self.managedObjectContext];
    [fetchRequest setEntity:entity];

    NSSortDescriptor *sortDescriptor1 = [NSSortDescriptor sortDescriptorWithKey:@"category" ascending:YES];
    NSSortDescriptor *sortDescriptor2 = [NSSortDescriptor sortDescriptorWithKey:@"date" ascending:YES];
    [fetchRequest setSortDescriptors:@[sortDescriptor1, sortDescriptor2]];

    [fetchRequest setFetchBatchSize:20];

    _fetchedResultsController = [[NSFetchedResultsController alloc]
      initWithFetchRequest:fetchRequest
      managedObjectContext:self.managedObjectContext
      sectionNameKeyPath:@"category"
      cacheName:@"Locations"];

    _fetchedResultsController.delegate = self;
  }
  return _fetchedResultsController;
}

//// Update Table View

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return [[self.fetchedResultsController sections] count];
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
  id <NSFetchedResultsSectionInfo> sectionInfo = [self.fetchedResultsController sections][section];
  return [[sectionInfo name] uppercaseString];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  id <NSFetchedResultsSectionInfo> sectionInfo = [self.fetchedResultsController sections][section];
  return [sectionInfo numberOfObjects];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Location"];
  [self configureCell:cell atIndexPath:indexPath];
  return cell;
}

- (void)configureCell:(UITableViewCell *)cell atIndexPath:(NSIndexPath *)indexPath {
  LocationCell *locationCell = (LocationCell *)cell;
  Location *location = [self.fetchedResultsController objectAtIndexPath:indexPath];
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
  if (editingStyle == UITableViewCellEditingStyleDelete) {
    Location *location = [self.fetchedResultsController objectAtIndexPath:indexPath];
    [location removePhotoFile];
    [self.managedObjectContext deleteObject:location];

    NSError *error;
    if (![self.managedObjectContext save:&error]) {
      FATAL_CORE_DATA_ERROR(error);
      return;
    }
  }
}

- (void)controllerWillChangeContent:(NSFetchedResultsController *)controller {
  NSLog(@"*** controllerWillChangeContent");
  [self.tableView beginUpdates];
}

- (void)controller:(NSFetchedResultsController *)controller didChangeObject:(id)anObject atIndexPath:(NSIndexPath *)indexPath forChangeType:(NSFetchedResultsChangeType)type newIndexPath:(NSIndexPath *)newIndexPath {
  switch (type) {
    case NSFetchedResultsChangeInsert:
      NSLog(@"*** NSFetchedResultsChangeInsert (object)");
      [self.tableView insertRowsAtIndexPaths:@[newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;

    case NSFetchedResultsChangeDelete:
      NSLog(@"*** NSFetchedResultsChangeDelete (object)");
      [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;

    case NSFetchedResultsChangeUpdate:
      NSLog(@"*** NSFetchedResultsChangeUpdate (object)");
      [self configureCell:[self.tableView cellForRowAtIndexPath:indexPath] atIndexPath:indexPath];
      break;

    case NSFetchedResultsChangeMove:
      NSLog(@"*** NSFetchedResultsChangeMove (object)");
      [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
      [self.tableView insertRowsAtIndexPaths:@[newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;
  }
}

- (void)controller:(NSFetchedResultsController *)controller didChangeSection:(id <NSFetchedResultsSectionInfo>)sectionInfo atIndex:(NSUInteger)sectionIndex forChangeType:(NSFetchedResultsChangeType)type {
  switch (type) {
    case NSFetchedResultsChangeInsert:
      NSLog(@"*** NSFetchedResultsChangeInsert (section)");
      [self.tableView insertSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
      break;

    case NSFetchedResultsChangeDelete:
      NSLog(@"*** NSFetchedResultsChangeDelete (section)");
      [self.tableView deleteSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
      break;
  }
}

- (void)controllerDidChangeContent:(NSFetchedResultsController *)controller {
  NSLog(@"*** controllerDidChangeContent");
  [self.tableView endUpdates];
}

//// fetch result easy
NSEntityDescription *entity = [NSEntityDescription entityForName:@"Location" inManagedObjectContext:self.managedObjectContext];

NSFetchRequest *fetchRequest = [[NSFetchRequest alloc] init];
[fetchRequest setEntity:entity];

NSError *error;
NSArray * foundObjects = [self.managedObjectContext executeFetchRequest:fetchRequest error:&error];
if (foundObjects == nil) {
  FATAL_CORE_DATA_ERROR(error);
  return;
}
