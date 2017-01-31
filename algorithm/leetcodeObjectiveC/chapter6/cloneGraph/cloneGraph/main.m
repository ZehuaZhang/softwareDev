//
//  main.m
//  cloneGraph
//
//  Created by Tianji Li on 2015-01-21.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Clone an undirected graph. Each node in the graph contains a label and a list of its
 neighbors.
 */

#import <Foundation/Foundation.h>
#import "graphNode.h"

/**
 assume the graph has nodes like below
 
 @interface graphNode : NSObject
 
 @property (atomic, assign) NSInteger label;
 @property (atomic, strong) NSArray *neighbors;
 
 @end
 
 
 e.g.,
 
 1  ---- 2
 |         |
 |         |
 3 ---- 4
 
 
 1 -> 2 -> 3
 2 -> 1 -> 4
 3 -> 1 -> 4
 4 -> 2 -> 3
 */

/**
 input: a node of the original graph
 output: a node in the cloned graph
 */
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
