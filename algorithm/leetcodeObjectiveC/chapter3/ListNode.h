#import <Foundation/Foundation.h>

@interface ListNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) ListNode *next;

- (id)initWithValue:(NSInteger)value andNext:(ListNode *)next;
- (id)initWithValue:(NSInteger)value;
- (id)init;

@end
