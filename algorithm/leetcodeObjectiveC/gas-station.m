// 134. Gas Station
// Difficulty: Medium

// There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i
// to its next station (i+1). You begin the journey with an empty tank at one of the gas stations.

// Return the starting gas station index if you can travel around the circuit once, otherwise return -1.

// Note:
// The solution is guaranteed to be unique.

// Time : O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int canCompleteCircuit(NSArray* gas, NSArray* cost) {
  int total = 0;
  int sum = 0;
  int j = -1;
  
  for (int i = 0; i < [gas count]; ++i) {
    total += [gas[i] intValue] - [cost[i] intValue];
    sum += [gas[i] intValue] - [cost[i] intValue];
    if (sum < 0) { // find the gas station which will be last
      sum = 0;
      j = i;
    }
  }
  
  return (total >= 0) ? j + 1 : -1;
}
