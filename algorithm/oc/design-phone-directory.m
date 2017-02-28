// 379. Design Phone Directory
// Difficulty : Medium

// Design a Phone Directory which supports the following operations:

// get: Provide a number which is not assigned to anyone.
// check: Check if a number is available or not.
// release: Recycle or release a number.
// Example:

// Init a phone directory containing a total of 3 numbers: 0, 1, and 2.
// PhoneDirectory directory = new PhoneDirectory(3);

// It can return any available phone number. Here we assume it returns 0.
// directory.get();

// Assume it returns 1.
// directory.get();

// The number 2 is available, so return true.
// directory.check(2);

// It returns 2, the only number that is left.
// directory.get();

// The number 2 is no longer available, so return false.
// directory.check(2);

// Release number 2 back to the pool.
// directory.release(2);

// Number 2 is available again, return true.
// directory.check(2);

/**
 * Your PhoneDirectory object will be instantiated and called as such:
 * PhoneDirectory obj = new PhoneDirectory(maxNumbers);
 * int param_1 = obj.get();
 * bool param_2 = obj.check(number);
 * obj.release(number);
 */

// init:     Time: O(n), Space: O(n)
// get:      Time: O(1), Space: O(1)
// check:    Time: O(1), Space: O(1)
// release:  Time: O(1), Space: O(1)

#import <Foundation/Foundation.h>

@interface PhoneDirectory : NSObject
@end

@implementation PhoneDirectory

int _curr;
NSMutableArray* _numbers;
NSMutableArray* _used;

/** Initialize your data structure here
 @param maxNumbers - The maximum numbers that can be stored in the phone directory. */
-(instancetype)initWithMaxNumber:(int)maxNumbers {
  self = [super init];
  if (self) {
    _curr = 0;
    _numbers = @[].mutableCopy;
    _used = @[].mutableCopy;
    
    for (int i = 0; i < maxNumbers; i++) {
      _numbers[i] = @(i);
      _used[i] = @NO;
    }
  }
  return self;
}

/** Provide a number which is not assigned to anyone.
 @return - Return an available number. Return -1 if none is available. */
-(int)get {
  if (_curr == _numbers.count) {
    return -1;
  }
  int number = [_numbers[_curr++] intValue];
  _used[number] = @YES;
  return number;
}

/** Check if a number is available or not. */
-(BOOL)check:(int)number {
  if (number < 0 || number >= _numbers.count) {
    return NO;
  }
  return ![_used[number] boolValue];
}

/** Recycle or release a number. */
-(void)release:(int)number {
  if (number < 0 || number >= _numbers.count || ![_used[number] boolValue]) {
    return;
  }
  _used[number] = @NO;
  _numbers[--_curr] = @(number);
}

@end