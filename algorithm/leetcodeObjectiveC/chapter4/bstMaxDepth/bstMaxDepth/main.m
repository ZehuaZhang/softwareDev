//
//  main.m
//  bstMaxDepth
//
//  Created by Tianji Li on 2015-01-18.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a binary tree, find its maximum depth.
 The maximum depth is the number of nodes along the longest path from the root node
 down to the farthest leaf node.
 */

#import <Foundation/Foundation.h>

typedef struct tree_node {
    int key;
    struct tree_node *left;
    struct tree_node *right;
} treeNode;

int maxDepth(treeNode *node)
{
    if ( !node ) return 0;
    
    return MAX(maxDepth(node->left), maxDepth(node->right)) + 1;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        treeNode *node2 = malloc(sizeof(treeNode));
        node2->key = 15;
        node2->left = nil;
        node2->right = nil;
        
        treeNode *node1 = malloc(sizeof(treeNode));
        node1->key = 5;
        node1->left = node2;
        node1->right = nil;
        
        treeNode *root = malloc(sizeof(treeNode));
        root->key = 10;
        root->left =node1;
        root->right = nil;
    
        NSLog(@"maxDepth=%d", maxDepth(root));
        
        free(node2);
        free(node1);
        free(root);
    }
    return 0;
}
