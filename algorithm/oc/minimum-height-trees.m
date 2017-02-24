// 310. Minimum Height Trees
// Difficulty : Medium

// For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.

// Format
// The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number n and a list of undirected edges (each edge is a pair of labels).

// You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Example 1:

// Given n = 4, edges = [[1, 0], [1, 2], [1, 3]]

//         0
//         |
//         1
//        / \
//       2   3
// return [1]

// Example 2:

// Given n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

//      0  1  2
//       \ | /
//         3
//         |
//         4
//         |
//         5
// return [3, 4]

// Hint:
// How many MHTs can a graph have at most?

// Note:
// (1) According to the definition of tree on Wikipedia: “a tree is an undirected graph
// in which any two vertices are connected by exactly one path.
// In other words, any connected graph without simple cycles is a tree.”

// (2) The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

// Credits:
// Special thanks to @peisi for adding this problem and creating all test cases.

// Update (2015-11-25):
// The function signature had been updated to return List<Integer> instead of integer[].
// Please click the reload button above the code editor to reload the newest default code definition.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark TreeNode

@interface TreeNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) TreeNode* left;
@property (atomic, strong) TreeNode* right;

-(id)initWithValue:(NSInteger)value leftNode:(TreeNode*)left rightNode:(TreeNode*)right;
-(id)initWithValue:(NSInteger)value leftNode:(TreeNode *)left;
-(id)initWithValue:(NSInteger)value rightNode:(TreeNode *)right;
-(id)initWithValue:(NSInteger)value;
-(id)init;

@end

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
- (BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark Solution

NSArray* findMinHeightTrees(int n, NSArray* edges) {
  if (n == 1) {
    return @[@0];
  }
  int outDegree[n];
  NSMutableArray* graph = @[].mutableCopy;
  for (int i = 0; i < n; i++) {
    graph[i] = @[].mutableCopy;
  }
  Queue* queue = [[Queue alloc] init];
  for (id edge in edges) {
    [graph[[edge[0] intValue]] addObject:edge[1]];
    ++outDegree[[edge[0] intValue]];
    [graph[[edge[1] intValue]] addObject:edge[0]];
    ++outDegree[[edge[1] intValue]];
  }
  for (int i = 0; i < n; ++i) {
    if (outDegree[i] == 1) {
      [queue push:@(i)];
    }
  }
  while (n > 2) { // at most two nodes can be root
    NSInteger size = [queue count];
    while (size--) {
      int node = [[queue pop] intValue];
      --n;
      for (id nbr in graph[node]) {
        if (--outDegree[[nbr intValue]] == 1) {
          [queue push:nbr];
        }
      }
    }
  }
  NSMutableArray* result = @[].mutableCopy;
  while (![queue isEmpty]) {
    [result addObject:[queue pop]];
  }
  return result;
}