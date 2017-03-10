// 332. Reconstruct Itinerary
// Difficulty: Medium

// Given a list of airline tickets represented by pairs of departure and arrival airports [from, to],
// reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK.
// Thus, the itinerary must begin with JFK.

// Note:
// If there are multiple valid itineraries,
// you should return the itinerary that has the smallest lexical order when read as a single string.
// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// All airports are represented by three capital letters (IATA code).

// You may assume all tickets form at least one valid itinerary.
// Example 1:
// tickets = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Return ["JFK", "MUC", "LHR", "SFO", "SJC"].

// Example 2:
// tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Return ["JFK","ATL","JFK","SFO","ATL","SFO"].
// Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"]. But it is larger in lexical order.

// Time:  O(t! / (n1! * n2! * ... nk!)), t is the total number of tickets,
//                                       ni is the number of the ticket which from is city i,
//                                       k is the total number of cities.
// Space: O(t)

#import <Foundation/Foundation.h>

BOOL findItineraryHelper(NSString* from, NSInteger ticketCnt, NSMutableDictionary* graph, NSMutableArray** ans) {
  if (ticketCnt == 0) {
    return YES;
  }
  
  NSArray* arr = [graph[from] copy];
  int i = 0;
  for (id to in arr) {
    [graph[from] removeObjectAtIndex:i];
    [*ans addObject:[to copy]];
    if (findItineraryHelper(to, ticketCnt - 1, graph, ans)) {
      return YES;
    }
    [*ans removeLastObject];
    [graph[from] addObject:to atIndex:i];
    i++;
  }
  
  return NO;
}

NSArray* findItinerary(NSArray* tickets) {
  NSMutableDictionary* graph = @{}.mutableCopy;
  for (id ticket in tickets) {
    if (!graph[ticket[0]]) {
      graph[ticket[0]] = @[].mutableCopy;
    }
    [graph[ticket[0]] addObject:ticket[1]]; // sort
  }
  NSString* from = @"JFK";
  NSMutableArray* ans = @[from].mutableCopy;
  findItineraryHelper(from, tickets.count, graph, &ans);
  return ans;
}