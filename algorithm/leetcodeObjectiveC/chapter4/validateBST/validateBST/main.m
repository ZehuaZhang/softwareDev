//
//  main.m
//  validateBST
//
//  Created by Tianji Li on 2015-01-14.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Given a binary tree, determine if it is a valid Binary Search Tree (BST).
 */


#import <Foundation/Foundation.h>

typedef struct tree_node {
    int key;
    struct tree_node *left;
    struct tree_node *right;
} treeNode;

BOOL isBST(treeNode *node, int leftMaxKey, int rightMaxKey){

    if ( !node )
        return YES;
   
    if ( isBST(node->left, leftMaxKey, node->key) && isBST(node->right, node->key, rightMaxKey) && leftMaxKey < node->key && node->key < rightMaxKey)
        return YES;
    
    return NO;
}


int main(int argc, const char * argv[]) {
    @autoreleasepool {
//        treeNode *node4 = malloc(sizeof(treeNode));
//        node4->key = 20;
//        node4->left = nil;
//        node4->right = nil;
//        
//        treeNode *node3 = malloc(sizeof(treeNode));
//        node3->key = 6;
//        node3->left = nil;
//        node3->right = nil;
        
        treeNode *node2 = malloc(sizeof(treeNode));
        node2->key = 15;
        node2->left = nil;
        node2->right = nil;
        
        treeNode *node1 = malloc(sizeof(treeNode));
        node1->key = 5;
        node1->left = nil;
        node1->right = nil;
        
        treeNode *root = malloc(sizeof(treeNode));
        root->key = 10;
        root->left = node1;
        root->right = node2;
        
        NSLog(@"isBST = %d", isBST(root, INT32_MIN, INT32_MAX));

//        free(node4);
//        free(node3);
        free(node2);
        free(node1);
        free(root);
    }
    return 0;
}
