// 359. Logger Rate Limiter
// Difficulty : Easy

// Design a logger system that receive stream of messages along with its timestamps,
// each message should be printed if and only if it is not printed in the last 10 seconds.

// Given a message and a timestamp (in seconds granularity),
// return true if the message should be printed in the given timestamp, otherwise returns false.

// It is possible that several messages arrive roughly at the same time.

// Example:

// Logger logger = new Logger();

// logging string "foo" at timestamp 1
// logger.shouldPrintMessage(1, "foo"); returns true;

// logging string "bar" at timestamp 2
// logger.shouldPrintMessage(2,"bar"); returns true;

// logging string "foo" at timestamp 3
// logger.shouldPrintMessage(3,"foo"); returns false;

// logging string "bar" at timestamp 8
// logger.shouldPrintMessage(8,"bar"); returns false;

// logging string "foo" at timestamp 10
// logger.shouldPrintMessage(10,"foo"); returns false;

// logging string "foo" at timestamp 11
// logger.shouldPrintMessage(11,"foo"); returns true;

/**
 * Your Logger object will be instantiated and called as such:
 * Logger obj = new Logger();
 * bool param_1 = obj.shouldPrintMessage(timestamp,message);
 */

// Time:  O(1), amortized
// Space: O(k), k is the max number of printed messages in last 10 seconds


#include <Foundation/Foundation.h>

#pragma mark DeQueue

@interface DeQueue : NSObject

- (instancetype)init;
- (id)popFront;
- (id)popBack;
- (void)pushFront:(id)element;
- (void)pushBack:(id)element;
- (id)front;
-(id)back;
-(BOOL)isEmpty;
-(NSInteger)count;

@end

@interface Logger : NSObject
@end

@implementation Logger

DeQueue* _dequeue;
NSMutableSet* _printed;

-(instancetype)init {
  self = [super init];
  if (self) {
    _dequeue = [[DeQueue alloc] init];
    _printed = [[NSMutableSet alloc] init];
  }
  return self;
}

/** Returns true if the message should be printed in the given timestamp, otherwise returns false. The timestamp is in seconds granularity. */
-(BOOL)shouldPrintMessage:(NSString*)message onTimestamp:(int)timestamp {
  while (![_dequeue isEmpty] && [[_dequeue front][0] intValue] <= timestamp - 10) {
    [_printed removeObject:[_dequeue popFront][1]];
  }
  if ([_printed containsObject:message]) {
    return NO;
  }
  [_dequeue pushBack:@[@(timestamp), message]];
  [_printed addObject:message];
  return YES;
}

@end