// 252. Meeting Rooms
// Difficulty : Easy

// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei),
// determine if a person could attend all meetings.

// For example,
// Given [[0, 30],[5, 10],[15, 20]],
// return false.

// Time:  O(nlogn)
// Space: O(n)

#import <Foundation/Foundation.h>

@interface Interval : NSObject

@property (atomic, assign) int start;
@property (atomic, assign) int end;

@end

BOOL canAttendMeetings(NSArray* intervals) {
  NSArray* sorted = [intervals sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    Interval* i1 = (Interval*)obj1;
    Interval* i2 = (Interval*)obj2;
    return [@(i1.start) compare:@(i2.start)];
  }];
  
  for (NSInteger i = 1; i < [intervals count]; ++i) {
    if ([(Interval*)intervals[i] start] < [(Interval*)intervals[i - 1] end]) {
      return NO;
    }
  }
  return YES;
}
