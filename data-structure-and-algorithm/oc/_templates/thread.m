// thread

+ (void)initialize {
  if (self == [Search class]) {
    queue = [[NSOperationQueue alloc] init];
  }
}

// perform search, update UI after user types for sometime

UISearchBar* searchBar;

NSTimer* someTimer;
NSInteger delay = 1;

NSOperationQueue* queue = [[NSOperationQueue alloc] init];
queue.maxConcurrentOperationCount = 1;


- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
  if (someTimer.isValid) {
    [someTimer invalidate];
    [queue cancelAllOperations];
  }
  someTimer = [NSTimer timerWithTimeInterval:delay target:self selector:@selector(search) userInfo:nil repeats:NO];
  [[NSRunLoop mainRunLoop] addTimer:someTimer forMode:NSDefaultRunLoopMode];
  
  return YES;
}

- (void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText {
  [NSObject cancelPreviousPerformRequestsWithTarget:self];
  [queue cancelAllOperations];
  
  [self performSelector:@selector(search) withObject:searchText afterDelay:delay];
}

- (void)search {
  [queue addOperationWithBlock:^{
    NSURL *url = [self urlWithSearchText:searchBar.text];
    NSString *jsonString = [self performStoreRequestWithURL:url];
    NSDictionary *dictionary = [self parseJSON:jsonString];
    // parse dictionary to data
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
      [self.tableView reloadData];
    }];
  }];
}

- (void)search {
  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
  dispatch_async(queue, ^{
    NSURL *url = [self urlWithSearchText:searchBar.text];
    NSString *jsonString = [self performStoreRequestWithURL:url];
    NSDictionary *dictionary = [self parseJSON:jsonString];
    // parse dictionary to data
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.tableView reloadData];
    });
  });
}

- (NSURL *)urlWithSearchText:(NSString *)searchText {
  NSString *escapedSearchText = [searchText stringByAddingPercentEscapesUsingEncoding: NSUTF8StringEncoding];
  NSString *urlString = [NSString stringWithFormat: @"http://itunes.apple.com/search?term=%@", escapedSearchText];
  NSURL *url = [NSURL URLWithString:urlString];
  return url;
}

- (NSString *)performStoreRequestWithURL:(NSURL *)url {
  NSError *error;
  NSString *resultString = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:&error];

  return resultString;
}

- (NSDictionary *)parseJSON:(NSString *)jsonString {
  NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *error;
  id resultObject = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
  return resultObject;
}

// url

//// deserialize
dispatch_async(kBgQueue, ^{
    NSData* data = [NSData dataWithContentsOfURL: [NSURL URLWithString:@"http://api.kivaws.org/v1/loans/search.json?status=fundraising"]];
    [self performSelectorOnMainThread:@selector(fetchedData:) withObject:data waitUntilDone:YES];
});
NSError* error;
NSDictionary* json = [NSJSONSerialization JSONObjectWithData:responseData options:kNilOptions error:&error];

//// serialzie
//build an info object and convert to json
NSDictionary* info = [NSDictionary dictionaryWithObjectsAndKeys:
  [loan objectForKey:@"name"], @"who",
  [(NSDictionary*)[loan objectForKey:@"location"] objectForKey:@"country"], @"where",
  [NSNumber numberWithFloat: outstandingAmount], @"what", nil];

NSData* jsonData = [NSJSONSerialization dataWithJSONObject:info options:NSJSONWritingPrettyPrinted error:&error];

jsonSummary.text = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

//// dictionary helper
@interface NSDictionary(JSONCategories)
+(NSDictionary*)dictionaryWithContentsOfJSONURLString:
  (NSString*)urlAddress;
-(NSData*)toJSON;
@end

@implementation NSDictionary(JSONCategories)
+(NSDictionary*)dictionaryWithContentsOfJSONURLString:
  (NSString*)urlAddress {
    NSData* data = [NSData dataWithContentsOfURL: [NSURL URLWithString: urlAddress] ];
    NSError* error = nil;
    id result = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&error];
    return error != nil ? nil : result;
}

-(NSData*)toJSON {
    NSError* error = nil;
    id result = [NSJSONSerialization dataWithJSONObject:self options:kNilOptions error:&error];
    return error != nil ? nil : result;
}
@end

// add delay

dispatch_after(dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * delay), dispatch_get_current_queue(), block);

// NSThread

[NSThread sleepForTimeInterval: delay];