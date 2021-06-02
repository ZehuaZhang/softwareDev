// 133. Clone Graph
// Difficulty: Medium

// Clone an undirected graph. Each node in the graph contains a label and a list of its neighbors.

// OJ undirected graph serialization:
// Nodes are labeled uniquely.

// We use # as a separator for each node, and , as a separator for node label and each neighbor of the node.
// As an example, consider the serialized graph {0,1,2#1,2#2,2}.

// The graph has a total of three nodes, and therefore contains three parts as separated by #.

// First node is labeled as 0. Connect node 0 to both nodes 1 and 2.
// Second node is labeled as 1. Connect node 1 to node 2.
// Third node is labeled as 2. Connect node 2 to node 2 (itself), thus forming a self-cycle.
// Visually, the graph looks like the following:

//        1
//       / \
//      /   \
//     0 --- 2
//          / \
//          \_/

// Time: O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
-(BOOL)isEmpty;
-(NSInteger)count;

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

-(NSInteger)count {
  return _array.count;
}

@end

#pragma mark GraphNode

@interface GraphNode : NSObject <NSCopying>

@property (atomic, assign) NSInteger label;
@property (atomic, strong) NSMutableArray *neighbors;

- (instancetype)initWithValue:(NSInteger)value;

@end

@implementation GraphNode

- (instancetype)initWithValue:(NSInteger)label {
  self = [super init];
  if (self) {
    self.label = label;
  }
  return self;
}

- (id)copyWithZone:(NSZone *)zone {
  GraphNode* copied = [[[self class] allocWithZone:zone] init];
  if (copied) {
    copied.label = self.label;
    copied.neighbors = [self.neighbors mutableCopy];
  }
  return copied;
}

@end

#pragma mark Solution

GraphNode* cloneGraph(GraphNode* node) {
  if(!node) {
    return nil;
  }
  NSMutableDictionary* copied = @{}.mutableCopy;
  copied[node] = [[GraphNode alloc] initWithValue:node.label];
  Queue* q = [[Queue alloc] init];
  [q push:node];
  
  while (![q isEmpty]) {
    GraphNode* node = [q pop];
    for (GraphNode* nbr in node.neighbors) {
      if (!copied[nbr]) {
        copied[nbr] = [[GraphNode alloc] initWithValue:nbr.label];
        [q push:nbr];
      }
      [[copied[node] neighbors] addObject:copied[nbr]];
    }
  }
  return copied[node];
}
