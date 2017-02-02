//
//  main.m
//  mergeLinkedList
//
//  Created by Tianji Li on 2015-01-20.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 Merge two sorted linked lists and return it as a new list. The new list should be made by
 splicing together the nodes of the first two lists.
 */

#import <Foundation/Foundation.h>
#import "linkNode.h"

linkNode *mergeLists(linkNode *L1, linkNode *L2)
{
    // sanity check
    if ( !L1 && !L2 ) return nil;
    
    linkNode *headNode = nil;
    linkNode *tailNode = nil;
    linkNode *currNode = nil;
    while ( L1 && L2 ) {
        if ( L1.value > L2.value ) {
            currNode = L2;
            L2 = L2.next;
        } else {
            currNode = L1;
            L1 = L1.next;
        }

        headNode = !headNode ? currNode : headNode;
        
        if (tailNode) tailNode.next = currNode;
        
        tailNode = currNode;
    }
    
    if (!headNode)
        // either L1 or L2 is empty initially
        headNode = L1 ? L1 : L2;
    else {
        // neither L1 or L2 is empty initially
        if (L1)
            // L1 is longer than L2 after while loop
            tailNode.next = L1;
        
        if (L2)
            // L2 is longer than L1 after while loop
            tailNode.next = L2;
    }
    
    return headNode;
}

linkNode *mergeListsWithDummy(linkNode *L1, linkNode *L2)
{
    // sanity check
    if ( !L1 && !L2 ) return nil;
    
    linkNode *dummyHead = [[linkNode alloc] init];
    linkNode *currNode = dummyHead;
    while ( L1 && L2 ) {
        if ( L1.value > L2.value ) {
            currNode.next = L2;
            L2 = L2.next;
        } else {
            currNode.next = L1;
            L1 = L1.next;
        }
        
        currNode = currNode.next;
    }
    
    if (L1)
        currNode.next = L1;
    
    if (L2)
        currNode.next = L2;
    
    return dummyHead.next;
}

linkNode *formListFromArray(NSArray *A) {
    linkNode *head = nil;
    for (NSInteger i=[A count] - 1; i >= 0; i--){
        linkNode *currNode = [[linkNode alloc] init];
        [currNode setValue:[[A objectAtIndex:i] integerValue]];
        [currNode setNext:head];
        head = currNode;
    }

    return head;
}

void printList(linkNode *head) {
    while ( head ) {
        printf("%d\t", (int)head.value);
        head = head.next;
    }
    printf("\n");
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *A = @[@1, @5, @7, @90];
        NSArray *B = @[@4, @8, @9, @10];

        linkNode *link1 = formListFromArray(A);
        printList(link1);

        linkNode *link2 = formListFromArray(B);
        printList(link2);
        
        linkNode *mergedList = mergeLists(link1, link2);
        printList(mergedList);

        linkNode *link3 = formListFromArray(A);
        printList(link3);
        
        linkNode *link4 = formListFromArray(B);
        printList(link4);

        linkNode *mergedListWithDummy = mergeListsWithDummy(link3, link4);
        printList(mergedListWithDummy);
    }
    return 0;
}
