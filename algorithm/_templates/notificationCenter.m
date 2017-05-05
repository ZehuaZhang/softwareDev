// notification center

[[NSNotificationCenter defaultCenter] addObserver:self
  selector:@selector(fatalCoreDataError:)
  name:ManagedObjectContextSaveDidFailNotification
  object:nil];