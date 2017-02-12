// 207. Course Schedule
// Difficulty : Medium

// There are a total of n courses you have to take, labeled from 0 to n - 1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1,
// which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// For example:
// 2, [[1,0]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

// 2, [[1,0],[0,1]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0,
// and to take course 0 you should also have finished course 1. So it is impossible.

// click to show more hints.

// Hints:
// This problem is equivalent to finding if a cycle exists in a directed graph.
// If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
// There are several ways to represent a graph. For example, the input prerequisites is a graph represented
// by a list of edges. Is this graph representation appropriate?
// Topological sort could also be done via BFS.

// Time:  O(|V| + |E|)
// Space: O(|E|)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;

@end

@implementation Queue

NSMutableArray* _array;

- (instancetype)init {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
  }
  return self;
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array objectAtIndex:0];
  if (element) {
    [_array removeObjectAtIndex:0];
  }
  return element;
}

- (id)front {
  if (self.isEmpty) {
    return nil;
  }
  return [_array objectAtIndex:0];
}

- (id)back {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

@end

#pragma mark Solution

BOOL canFinish(int numCourses, NSArray* prerequisites) {
  NSMutableArray* graph = @[].mutableCopy;
  for (int i = 0; i < numCourses; i++) {
    [graph[i] addObject:@[].mutableCopy];
  }
  int inDegree[numCourses];
  memset(inDegree, 0, sizeof(int) * numCourses);
  
  for (id prerequisite in prerequisites) {
    [graph[[prerequisite[1] intValue]] addObject:prerequisite[0]];
    ++inDegree[[prerequisite[0] intValue]];
  }
  
  Queue* queue = [[Queue alloc] init];
  for (int i = 0; i < numCourses; ++i) {
    if (inDegree[i] == 0) {
      [queue push:@(i)];
    }
  }
  while (![queue isEmpty]) {
    int course = [[queue pop] intValue];
    for (id advancedCourse in graph[course]) {
      if (--inDegree[[advancedCourse intValue]] == 0) {
        [queue push:advancedCourse];
      }
    }
  }
  for (int i = 0; i < numCourses; ++i) {
    if (inDegree[i] != 0) {
      return NO;
    }
  }
  return YES;
}
