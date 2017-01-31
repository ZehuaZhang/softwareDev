//
//  main.m
//  balancedBST
//
//  Created by Tianji Li on 2015-01-17.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a binary tree, determine if it is height-balanced.
 For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differs by more than 1.
 */

#import <Foundation/Foundation.h>

typedef struct tree_node {
    int key;
    struct tree_node *left;
    struct tree_node *right;
} treeNode;

int treeDepth(treeNode *node, int depth)
{
    
    if ( NULL == node ) return 0;
    
    int leftDepth = treeDepth(node->left, depth + 1);
    if ( leftDepth == -1 ) return -1;
    
    int rightDepth = treeDepth(node->right, depth + 1);
    if ( rightDepth == -1) return -1;
    
    return ABS(leftDepth - rightDepth) <= 1 ? MAX(leftDepth, rightDepth) : -1;
}

bool isBalanced(treeNode *node)
{
    if ( NULL == node ) return true;
    
    return treeDepth(node, 0) != -1;
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
        root->left = node1;
        root->right = nil;
        
        NSLog(@"isBalanced=%d", isBalanced(root));
        
        free(node2);
        free(node1);
        free(root);
    }
    return 0;
}
