#import <Foundation/Foundation.h>

@interface Singleton : NSObject

+ (Singleton*) instance;
+ (float) frameRate;
+ (void) setFrameRate:(float)fr;

@end

@implementation Singleton

static Singleton* _gInstance = nil;
float _ivarFrameRate;

+ (Singleton*)instance
{
  @synchronized(self)
  {
    if (_gInstance == NULL)
      _gInstance = [[super allocWithZone:NULL] init];
  }
  return _gInstance;
}

+ (id) allocWithZone:(NSZone *)zone {
  return [self instance];
}

- (id) copyWithZone:(NSZone *)zone {
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