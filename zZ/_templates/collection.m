// collection

// array

//// predicate
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"category == %@", selectedCatogory];
NSArray *filteredArr = [self.movieQuotes filteredArrayUsingPredicate:predicate];