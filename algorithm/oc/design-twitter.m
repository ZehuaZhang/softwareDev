// 355. Design Twitter
// Difficulty: Medium

// Design a simplified version of Twitter where users can post tweets,
// follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed.
// Your design should support the following methods:

// postTweet(userId, tweetId): Compose a new tweet.
// getNewsFeed(userId): Retrieve the 10 most recent tweet ids in the user's news feed.
// Each item in the news feed must be posted by users who the user followed or by the user herself.
// Tweets must be ordered from most recent to least recent.
// follow(followerId, followeeId): Follower follows a followee.
// unfollow(followerId, followeeId): Follower unfollows a followee.
// Example:

// Twitter twitter = new Twitter();

// User 1 posts a new tweet (id = 5).
// twitter.postTweet(1, 5);

// User 1's news feed should return a list with 1 tweet id -> [5].
// twitter.getNewsFeed(1);

// User 1 follows user 2.
// twitter.follow(1, 2);

// User 2 posts a new tweet (id = 6).
// twitter.postTweet(2, 6);

// User 1's news feed should return a list with 2 tweet ids -> [6, 5].
// Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
// twitter.getNewsFeed(1);

// User 1 unfollows user 2.
// twitter.unfollow(1, 2);

// User 1's news feed should return a list with 1 tweet id -> [5],
// since user 1 is no longer following user 2.
// twitter.getNewsFeed(1);

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter obj = new Twitter();
 * obj.postTweet(userId,tweetId);
 * vector<int> param_2 = obj.getNewsFeed(userId);
 * obj.follow(followerId,followeeId);
 * obj.unfollow(followerId,followeeId);
 */

// Time:  O(klogu), k is most recently number of tweets,
//                  u is the number of the user's following.
// Space: O(t + f), t is the total number of tweets,
//                  f is the total number of followings.

#import <Foundation/Foundation.h>

#pragma mark PriorityQueue

@interface PriorityQueue : NSObject

- (instancetype)initIsMinHeap:(BOOL)isMinHeap;
- (instancetype)init;
- (id)top;
- (id)pop;
- (void)push:(id)element;
-(NSInteger)count;
- (BOOL)isEmpty;

@end

#pragma mark DeQueue

@interface DeQueue : NSMutableArray

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

#pragma mark Solution

@interface Twitter : NSObject
@end

@implementation Twitter

const NSInteger _numberOfMostRecentTweets = 10;
NSMutableDictionary* _followings;
NSMutableDictionary* _messages;
NSInteger _time;

/** Initialize your data structure here. */
-(instancetype)initWithTime:(NSInteger)time {
  self = [super init];
  if (self) {
    _time = time;
    _messages = @{}.mutableCopy;
    _followings = @{}.mutableCopy;
  }
  return self;
}

/** Compose a new tweet. */
void postTweet(int userId, int tweetId) {
  if (_messages[@(userId)]) {
    _messages[@(userId)] = [[DeQueue alloc] init];
  }
  [_messages[@(userId)] pushBack:@[@(++_time), @(tweetId)]];
}

/** Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. */
NSArray* getNewsFeed(int userId) {
  PriorityQueue* heap = [[PriorityQueue alloc] init];
  
  if ([_messages[@(userId)] count]) {
    [heap push:@[_messages[@(userId)] reverseObjectEnumerator]];
  }
  for (id followeeID in _followings[@(userId)]) {
    if ([_messages[followeeID] count]) {
      [heap push:@[_messages[followeeID] reverseObjectEnumerator]];
    }
  }
  NSMutableArray* result = @[].mutableCopy;
  while (![heap isEmpty] && [result count] < _numberOfMostRecentTweets) {
    id obj;
    NSEnumerator* enum;
    do {
      enum = [heap pop];
      obj = [enum nextObject];
    } while (!obj)

    if ([heap isEmpty]) {
      break;
    }

    [result addObject:obj];
    [heap push:enum];
  }
  return result;
}

/** Follower follows a followee. If the operation is invalid, it should be a no-op. */
-(void)followFollowee:(int)followeeId fromFollower:(int)followerId {
  if (!_followings[@(followerId)]) {
    _followings[@(followerId)] = [[NSMutableSet alloc] init];
  }
  if (followerId != followeeId && ![_followings[@(followerId)] containsObject:@(followeeId)]) {
    [_followings[@(followerId)] addObject:@(followeeId)];
  }
}

/** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
void unfollow(int followerId, int followeeId) {
  if (_followings[@(followerId)] && [_followings[@(followerId)] containsObject:@(followeeId)]) {
    [_followings[@(followerId)] removeObject:@(followeeId)];
  }
}

@end