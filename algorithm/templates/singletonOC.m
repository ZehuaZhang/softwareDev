#import <Foundation/Foundation.h>

@interface Singleton : NSObject

- (id) init;
+ (Singleton*) instance;
+ (float) frameRate;
+ (void) setFrameRate:(float)fr;

@end

@implementation Singleton

static Singleton* _gInstance = NULL;
float _ivarFrameRate;

+ (Singleton*)instance
{
  @synchronized(self)
  {
    if (_gInstance == NULL)
      _gInstance = [[self alloc] init];
  }
  return _gInstance;
}

- (id)init
{
  self = [super init];
  return self;
}

-(float)ivarFrameRate {
  return _ivarFrameRate;
}

-(void)setIvarFrameRate:(float)frameRate {
  _ivarFrameRate = frameRate;
}

+ (float) frameRate
{
  return [[Singleton instance] ivarFrameRate];
}

+ (void) setFrameRate:(float)fr;
{
  [[Singleton instance] setIvarFrameRate:fr];
}

@end

int main() {
  @autoreleasepool {
    NSLog(@"Singleton Framerate = %f", Singleton.frameRate);
    NSLog(@"Singleton Framerate = %f", Singleton.frameRate = 8.0);
    NSArray* hereIGo = @[@"Zehua Zhang"];
    NSArray* zehua = [NSArray arrayWithArray:hereIGo];
    NSLog(@"%@%@", zehua, @"Facebook!");
  }
}