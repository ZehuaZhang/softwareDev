// 56. Merge Intervals
// Difficulty: Hard

// Given a collection of intervals, merge all overlapping intervals.

// For example,
// Given [1,3],[2,6],[8,10],[15,18],
// return [1,6],[8,10],[15,18].

// Time:  O(nlogn)
// Space: O(1)

#import <Foundation/Foundation.h>

@interface Interval : NSObject

@property (assign) NSInteger start;
@property (assign) NSInteger end;

-(id) initWithStart:(NSInteger)start end:(NSInteger)end;
-(id) init;

@end

@implementation Interval

-(id) initWithStart:(NSInteger)start end:(NSInteger)end {
  self = [super init];
  if (self) {
    self.start = start;
    self.end = end;
  }
  return self;
}

-(id) init {
  return [self initWithStart:0 end:0];
}

@end

NSArray* merge(NSArray* intervals) {
  if ([intervals count] <= 1) {
    return intervals;
  }
  
  NSArray* sorted = [intervals sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    NSNumber* start1 = [NSNumber numberWithInteger: [(Interval*)obj1 start]];
    NSNumber* start2 = [NSNumber numberWithInteger: [(Interval*)obj2 start]];
    return [start1 compare: start2];
  }];
  
  NSMutableArray* result = [NSMutableArray arrayWithObject:sorted[0]];
  for (int i = 1; i < [sorted count]; ++i) {
    if ([(Interval*)[sorted objectAtIndex:i] start] <= [(Interval*)[result lastObject] end]) {
      [[result lastObject] setEnd:MAX([(Interval*)[result lastObject] end], [(Interval*)[sorted objectAtIndex:i] end])];
    } else {
      [result addObject:sorted[i]];
    }
  }
  
  return result;
}