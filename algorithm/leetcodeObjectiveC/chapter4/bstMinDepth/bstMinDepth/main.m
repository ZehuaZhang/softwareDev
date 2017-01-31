//
//  main.m
//  bstMinDepth
//
//  Created by Tianji Li on 2015-01-18.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a binary tree, find its minimum depth.
 The minimum depth is the number of nodes along the shortest path from the root node
 down to the nearest leaf node.
 */

#import <Foundation/Foundation.h>

typedef struct tree_node {
    int key;
    struct tree_node *left;
    struct tree_node *right;
} treeNode;

int minDepth(treeNode *node)
{
    if ( !node ) return 0;
    
    /* if a subtree is empty, then we need to use the other non-empty as min depth */
    if ( !node->left ) return minDepth( node->right ) + 1;
    if ( !node->right ) return minDepth( node->left ) + 1;
    
    return MIN(minDepth(node->left), minDepth(node->right)) + 1;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        treeNode *node3 = malloc(sizeof(treeNode));
        node3->key = 15;
        node3->left = nil;
        node3->right = nil;
        
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
        root->left = node1;
        root->right = node3;
        
        NSLog(@"minDepth = %d", minDepth(root));
        
        free(node3);
        free(node2);
        free(node1);
        free(root);
    
    }
    return 0;
}
