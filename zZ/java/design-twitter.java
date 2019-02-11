/**
 * Design Twitter
 * 
 * Design a simplified version of Twitter where users can post tweets, follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed.
 * Your design should support the following methods:
 * 
 * postTweet(userId, tweetId): Compose a new tweet.
 * getNewsFeed(userId): Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself.
 * Tweets must be ordered from most recent to least recent.
 * follow(followerId, followeeId): Follower follows a followee.
 * unfollow(followerId, followeeId): Follower unfollows a followee.
 * 
 * Example:
 * 
 * Twitter twitter = new Twitter();
 * 
 * // User 1 posts a new tweet (id = 5).
 * twitter.postTweet(1, 5);
 * 
 * // User 1's news feed should return a list with 1 tweet id -> [5].
 * twitter.getNewsFeed(1);
 * 
 * // User 1 follows user 2.
 * twitter.follow(1, 2);
 * 
 * // User 2 posts a new tweet (id = 6).
 * twitter.postTweet(2, 6);
 * 
 * // User 1's news feed should return a list with 2 tweet ids -> [6, 5].
 * // Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
 * twitter.getNewsFeed(1);
 * 
 * // User 1 unfollows user 2.
 * twitter.unfollow(1, 2);
 * 
 * // User 1's news feed should return a list with 1 tweet id -> [5],
 * // since user 1 is no longer following user 2.
 * twitter.getNewsFeed(1);
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashSet;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.List;

public class Twitter {
    Twitter() {
        time = 0;
        following = new Map<Integer,Set<Integer>>();
        tweets = new Map<Integer, List<Pair>>();
        maxRecentTweetsCount = 10;
    }

    public void postTweets(int userId, int tweetId) {
        follow(userId, userId);
        List<Pair> tweetLists = tweets.getOrDefault(userId, new ArrayList<>());
        tweetLists.add(new Pair(time++, tweetId));
        tweets.put(userId, tweetLists);
    }

    public List<Integer> getRecentTweets(int userId) {
        PriorityQueue<Pair> priorityQueue = new PriorityQueue<>(new Comparator<Pair>() {
            public int compare(Pair tweet1, Pair tweet2) {
                return  tweet1.timestamp - tweet2.timestamp;
            }
        });

        for (Integer followee : following.getOrDefault(userId, new Set<Integer>())) {
            for (Pair tweet : tweets.getOrDefault(followee, new ArrayList<>())) {
                priorityQueue.offer(tweet);
                if (priorityQueue.size() > maxRecentTweetsCount) {
                    priorityQueue.poll();
                }
            }
        }

        List<Integer> result = new ArrayList<>(priorityQueue);
        Collections.sort(result, Collections.reverseOrder());
        return result;
    }

    public void unfollow(int follower, int followee) {
        if (!following.containsKey(follower) && follower != followee) {
            following.get(follower).remove(followee);
        }
    }

    public void follow(int follower, int followee) {
        Set<Integer> followingList = following.getOrDefault(follower, new HashSet<>());
        followingList.add(followee);
        following.put(follower, followingList);
    }

    private final int maxRecentTweetsCount;
    private int time;
    private Map<Integer, Set<Integer>> following;
    private Map<Integer, List<Pair>> tweets;

    private class Pair {
        int timestamp;
        int tweetId;

        Pair(int timestamp, int tweetId) {
            this.timestamp = timestamp;
            this.tweetId = tweetId;
        }
    }
}
    