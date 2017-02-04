#import "ListNode.h"

@implementation ListNode

- (id)initWithValue:(NSInteger)value andNext:(ListNode *)next {
  self = [super init];
  if (self) {
    self.value = value;
    self.next = next;
  }
  return self;
}

- (id)initWithValue:(NSInteger)value {
  return [self initWithValue:value andNext:nil];
}

- (id)init {
  return [self initWithValue:0 andNext:nil];
}

@end
