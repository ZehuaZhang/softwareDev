// 346. Moving Average from Data Stream
// Difficulty : Easy

// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

// For example,
// MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1 + 10) / 2
// m.next(3) = (1 + 10 + 3) / 3
// m.next(5) = (10 + 3 + 5) / 3

/**
 * Your MovingAverage object will be instantiated and called as such:
 * MovingAverage obj = new MovingAverage(size);
 * double param_1 = obj.next(val);
 */

// Time:  O(1)
// Space: O(w)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
-(BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark Solution

@interface MovingAverage : NSObject
@end

@implementation MovingAverage

int _size;
int _sum;
Queue* _queue;

-(instancetype)initWithSize:(int)size {
  self = [super init];
  if (self) {
    _queue = [[Queue alloc] init];
    _size = size;
    _sum = 0;
  }
  return self;
}

-(double)next:(int)value {
  if ([_queue count] == _size) {
    _sum -= [[_queue pop] intValue];
  }
  [_queue push:@(value)];
  _sum += value;
  return 1.0 * _sum / [_queue count];
}

@end