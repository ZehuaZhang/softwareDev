// Singleton

#import <Foundation/Foundation.h>

@interface Singleton : NSObject

+ (Singleton *)instance;
+ (float)frameRate;
+ (void)setFrameRate:(float)fr;

@end

@interface Singleton ()

@property (nonatomic) iFrameRate;

@end

@implementation Singleton {
static Singleton * _gInstance = nil;
}

+ (Singleton *)instance {
  @synchronized(self) {
    if (_gInstance == NULL)
      _gInstance = [[super allocWithZone:NULL] init];
  }
  return _gInstance;
}

+ (id)allocWithZone:(NSZone *)zone {
  return [self instance];
}

- (id)copyWithZone:(NSZone *)zone {
  return self;
}

+ (float)frameRate {
  return [[Singleton instance] iFrameRate];
}

+ (void)setFrameRate:(float)fr {
  [[Singleton instance] setIFrameRate:fr];
}

@end