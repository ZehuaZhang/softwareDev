// file

// Web View

NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"BullsEye" ofType:@"html"];
NSData *htmlData = [NSData dataWithContentsOfFile:htmlFile];
NSURL *baseURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] bundlePath]];
[self.webView loadData:htmlData MIMEType:@"text/html" textEncodingName:@"UTF-8" baseURL:baseURL];

// plist

NSString *plistFilePath = [[NSBundle mainBundle] pathForResource:@"quotes" ofType:@"plist"];
self.movieQuotes = [NSMutableArray arrayWithContentsOfFile:plistFilePath];