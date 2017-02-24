//
//  Search.m
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "Search.h"
#import "SearchResult.h"

static NSOperationQueue *queue = nil;

@interface Search ()

@property (nonatomic, readwrite, strong) NSMutableArray* searchResults;

@end

@implementation Search

+ (void)initialize {
  if (self == [Search class]) {
    queue = [[NSOperationQueue alloc] init];
  }
}

- (void)performSearchForText:(NSString *)text category:(NSInteger)category completion:(SearchBlock)block {
  if ([text length] > 0) {
    self.isLoading = YES;
    self.searchResults = [NSMutableArray arrayWithCapacity:10];
    
    [queue cancelAllOperations];
    [queue addOperationWithBlock:^{
      NSURL* url = [self urlWithSearchText:text category:category];
      NSString* jsonString = [self performStoreRequestWithURL:url];
      if (!jsonString) {
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
          self.isLoading = NO;
          block(NO);
          return;
        }];
      }
      
      NSDictionary* dictionary = [self parseJSON:jsonString];
      if (!dictionary) {
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
          self.isLoading = NO;
          block(NO);
          return;
        }];
      }
      [self parseDictionary:dictionary];
      [self.searchResults sortUsingSelector:@selector(compareName:)];
      
      [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        self.isLoading = NO;
        block(YES);
      }];
    }];
  }
}

- (NSString*)performStoreRequestWithURL:(NSURL*)url {
  return [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
}

- (NSDictionary*)parseJSON:(NSString*)jsonString {
  NSData* data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  
  id resultObject = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
  if ([resultObject isKindOfClass:[NSDictionary class]]) {
    return resultObject;
  }
  return nil;
}

- (void)parseDictionary:(NSDictionary*)dictionary {
  NSArray* array = dictionary[@"result"];
  if (!array) {
    return;
  }
  for (NSDictionary* resultDict in array) {
    SearchResult* searchResult;
    NSString* wrapperType = resultDict[@"wrapperType"];
    NSString* kind = resultDict[@"kind"];
    if ([wrapperType isEqualToString:@"track"]) {
      searchResult = [self parseTrack:resultDict];
    } else if ([wrapperType isEqualToString:@"audiobook"]) {
      searchResult = [self parseAudioBook:resultDict];
    } else if ([wrapperType isEqualToString:@"software"]) {
      searchResult = [self parseSoftware:resultDict];
    } else if ([kind isEqualToString:@"ebook"]) {
      searchResult = [self parseEBook:resultDict];
    }
    if (searchResult != nil) {
      [self.searchResults addObject:searchResult];
    }
  }
}

- (NSURL*)urlWithSearchText:(NSString*)searchText category:(NSInteger)category {
  NSString *categoryName;
  switch (category) {
    case 0: categoryName = @""; break;
    case 1: categoryName = @"musicTrack"; break;
    case 2: categoryName = @"software"; break;
    case 3: categoryName = @"ebook"; break;
  }
  
  NSLocale *locale = [NSLocale autoupdatingCurrentLocale];
  NSString *language = [locale localeIdentifier];
  NSString *countryCode = [locale objectForKey:NSLocaleCountryCode];
  
  NSString* escapedSearchText = [searchText stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]];
  NSString* urlString = [NSString stringWithFormat:@"http://itunes.apple.com/search?term=%@&limit=200&entity=%@&lang=%@&country=%@",escapedSearchText, categoryName, language, countryCode];
  NSURL* url = [NSURL URLWithString:urlString];
  return url;
}

- (SearchResult*)parseTrack:(NSDictionary*)dictionary {
  SearchResult* searchResult = [[SearchResult alloc] init];
  searchResult.name = dictionary[@"trackName"];
  searchResult.artistName = dictionary[@"artistName"];
  searchResult.artworkURL60 = dictionary[@"artworkUrl60"];
  searchResult.artworkURL100 = dictionary[@"artworkUrl100"];
  searchResult.storeURL = dictionary[@"trackViewUrl"];
  searchResult.kind = dictionary[@"kind"];
  searchResult.price = dictionary[@"trackPrice"];
  searchResult.currency = dictionary[@"currency"];
  searchResult.genre = dictionary[@"primaryGenreName"];
  return searchResult;
}

- (SearchResult *)parseAudioBook:(NSDictionary *)dictionary
{
  SearchResult *searchResult = [[SearchResult alloc] init];
  searchResult.name = dictionary[@"collectionName"];
  searchResult.artistName = dictionary[@"artistName"];
  searchResult.artworkURL60 = dictionary[@"artworkUrl60"];
  searchResult.artworkURL100 = dictionary[@"artworkUrl100"];
  searchResult.storeURL = dictionary[@"collectionViewUrl"];
  searchResult.kind = @"audiobook";
  searchResult.price = dictionary[@"collectionPrice"];
  searchResult.currency = dictionary[@"currency"];
  searchResult.genre = dictionary[@"primaryGenreName"];
  return searchResult;
}
- (SearchResult *)parseSoftware:(NSDictionary *)dictionary
{
  SearchResult *searchResult = [[SearchResult alloc] init];
  searchResult.name = dictionary[@"trackName"];
  searchResult.artistName = dictionary[@"artistName"];
  searchResult.artworkURL60 = dictionary[@"artworkUrl60"];
  searchResult.artworkURL100 = dictionary[@"artworkUrl100"];
  searchResult.storeURL = dictionary[@"trackViewUrl"];
  searchResult.kind = dictionary[@"kind"];
  searchResult.price = dictionary[@"price"];
  searchResult.currency = dictionary[@"currency"];
  searchResult.genre = dictionary[@"primaryGenreName"];
  return searchResult;
}

- (SearchResult *)parseEBook:(NSDictionary *)dictionary
{
  SearchResult *searchResult = [[SearchResult alloc] init];
  searchResult.name = dictionary[@"trackName"];
  searchResult.artistName = dictionary[@"artistName"];
  searchResult.artworkURL60 = dictionary[@"artworkUrl60"];
  searchResult.artworkURL100 = dictionary[@"artworkUrl100"];
  searchResult.storeURL = dictionary[@"trackViewUrl"];
  searchResult.kind = dictionary[@"kind"];
  searchResult.price = dictionary[@"price"];
  searchResult.currency = dictionary[@"currency"];
  searchResult.genre = [(NSArray *)dictionary[@"genres"]
                        componentsJoinedByString:@", "];
  return searchResult;
}




@end
