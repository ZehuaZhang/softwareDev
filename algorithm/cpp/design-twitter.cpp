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

class Twitter {
public:
    /** Initialize your data structure here. */
    Twitter() : _time(0) {
        
    }
    
    /** Compose a new tweet. */
    void postTweet(int userId, int tweetId) {
        _messages[userId].emplace_back(make_pair(++_time, tweetId));
    }
    
    /** Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. */
    vector<int> getNewsFeed(int userId) {
        using RIT = deque<pair<size_t, int>>::reverse_iterator;
        priority_queue<tuple<size_t, RIT, RIT>> heap;

        if (_messages[userId].size()) {
            heap.emplace(make_tuple(_messages[userId].rbegin()->first,
                                    _messages[userId].rbegin(),
                                    _messages[userId].rend()));
        }
        for (const auto& id : _followings[userId]) {
            if (_messages[id].size()) {
                heap.emplace(make_tuple(_messages[id].rbegin()->first,
                                        _messages[id].rbegin(),
                                        _messages[id].rend()));
            }
        }
        vector<int> res;
        while (!heap.empty() && res.size() < _number_of_most_recent_tweets) {
            const auto& top = heap.top();
            size_t t;
            RIT begin, end;
            tie(t, begin, end) = top;
            heap.pop();

            if (next(begin) != end) {
                heap.emplace(make_tuple(next(begin)->first, next(begin), end));
            }

            res.emplace_back(begin->second);
        }
        return res;
    }
    
    /** Follower follows a followee. If the operation is invalid, it should be a no-op. */
    void follow(int followerId, int followeeId) {
        if (followerId != followeeId && !_followings[followerId].count(followeeId)) {
            _followings[followerId].emplace(followeeId);
        }
    }
    
    /** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
    void unfollow(int followerId, int followeeId) {
        if (_followings[followerId].count(followeeId)) {
            _followings[followerId].erase(followeeId);
        }
    }

private:
    const size_t _number_of_most_recent_tweets = 10;
    unordered_map<int, unordered_set<int>> _followings;
    unordered_map<int, deque<pair<size_t, int>>> _messages;
    size_t _time;
};