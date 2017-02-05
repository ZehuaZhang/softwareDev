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

// Time Complexity: O(n)
// Space Complexity: O(n)

/**
 * Definition for undirected graph.
 * struct UndirectedGraphNode {
 *     int label;
 *     vector<UndirectedGraphNode *> neighbors;
 *     UndirectedGraphNode(int x) : label(x) {};
 * };
 */
class Solution {
    public:
        UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {
            if(!node) {
                return nullptr;
            }
            unordered_map<const UndirectedGraphNode *, UndirectedGraphNode *> copied;
            copied[node] = new UndirectedGraphNode(node->label);
            queue<const UndirectedGraphNode *> q;
            q.push(node);
            while (!q.empty()) {
                auto node = q.front(); q.pop();

                for (auto nbr : node->neighbors) {
                    if (!copied.count(nbr)) {
                        copied[nbr] = new UndirectedGraphNode(nbr->label);
                        q.push(nbr);
                    }

                    copied[node]->neighbors.push_back(copied[nbr]);
                }
            }

            return copied[node];
        }
};

#import <Foundation/Foundation.h>

@interface graphNode : NSObject

@property (atomic, strong) NSNumber *label;
@property (atomic, strong) NSMutableArray *neighbors;

@end

#import "graphNode.h"

@implementation graphNode

@end

static NSMutableDictionary *visitedMap;
graphNode *cloneGraph(graphNode *node)
{
    /*
     depth first graph traversal, recursive.
     */
    
    if (!node) return nil;
    
    // clone this node
    graphNode * clonedNode = [graphNode new];
    clonedNode.label = node.label;
    clonedNode.neighbors = @[].mutableCopy;
    
    // keep this node as visited
    [visitedMap setObject:clonedNode forKey:node.label];
    
    // recursion now
    for ( graphNode *currNode in node.neighbors ) {
        graphNode *currClone = [visitedMap objectForKey:currNode.label];
        if ( !currClone ) {
            // haven’t visited this node before
            [clonedNode.neighbors addObject:cloneGraph(currNode)];
        } else {
            [clonedNode.neighbors addObject:currClone];
        }
    }
    
    NSLog(@"%lu, %@, %@", [clonedNode.label integerValue], clonedNode, node);
    
    return clonedNode;
}

graphNode *cloneGraphBFS(graphNode *node)
{
    /**
     breath first loop version
     */
    if (!node) return nil;
    
    // use a FIFO queue for breath first traversal
    NSMutableArray *queue = @[].mutableCopy;
    graphNode *currNode = node;
    graphNode *clonedNode;
    while ( currNode ) {
        if ( ![visitedMap objectForKey:currNode.label] ) {
            // clone this node
            clonedNode = [graphNode new];
            clonedNode.label = currNode.label;
            clonedNode.neighbors = @[].mutableCopy;
            
            // keep this node as visited
            [visitedMap setObject:clonedNode forKey:currNode.label];
            
            NSLog(@"%lu, %@, %lu, %lu, %@", [currNode.label integerValue], queue, [[[queue firstObject] label] integerValue], [[[queue lastObject] label] integerValue], visitedMap);
        }
        // push adjacents nodes in queue
        for (graphNode *tempNode in currNode.neighbors) {
            graphNode *visitedClonedNode = [visitedMap objectForKey:tempNode.label];
            if ( !visitedClonedNode ) {
                [queue addObject: tempNode];
            } else {
                [clonedNode.neighbors addObject:visitedClonedNode];
            }
        }
        
        currNode = [queue firstObject];
        if (currNode) [queue removeObjectAtIndex:0];
    }
    
    
    return clonedNode;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        graphNode *node1 = [graphNode new];
        graphNode *node2 = [graphNode new];
        graphNode *node3 = [graphNode new];
        graphNode *node4 = [graphNode new];
        
        node1.label = @1;
        node2.label = @2;
        node3.label = @3;
        node4.label = @4;
        
//        node1.neighbors = @[node2, node3].mutableCopy;
//        node2.neighbors = @[node1, node4].mutableCopy;
//        node3.neighbors = @[node1, node4].mutableCopy;
//        node4.neighbors = @[node2, node3].mutableCopy;
        
        node1.neighbors = @[node2].mutableCopy;
        node2.neighbors = @[node1].mutableCopy;
        
        visitedMap = @{}.mutableCopy;
        cloneGraph(node1);
//        cloneGraphBFS(node1);
    }
    return 0;
}
