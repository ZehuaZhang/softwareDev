//
//  main.m
//  addTwoNumbers
//
//  Created by Tianji Li on 2015-01-20.
//  Copyright (c) 2015 Tianji Li. All rights reserved.
//

/**
 Question:
 You are given two linked lists representing two non-negative numbers. The digits are
 stored in reverse order and each of their nodes contains a single digit. Add the two
 numbers and return it as a linked list.
 Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 Output: 7 -> 0 -> 8
 */

#import <Foundation/Foundation.h>
#import "linkNode.h"

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

linkNode *addTwoNumber(linkNode *L1, linkNode *L2)
{
    linkNode *dummyNode = [linkNode new];
    linkNode *currNode = dummyNode;
    
    NSInteger currSum;
    NSInteger currDigit;
    NSInteger carryOver = 0;
    
    while ( L1 || L2 ) {
        NSInteger l1Value = L1 ? L1.value : 0;
        NSInteger l2Value = L2 ? L2.value : 0;
        currSum = l1Value + l2Value + carryOver;
        currDigit = currSum % 10;
        carryOver = currSum > 9 ? 1 : 0;
        
        linkNode *tempNode = [linkNode new];
        tempNode.value = currDigit;
        tempNode.next = nil;
        
        currNode.next = tempNode;
        currNode = tempNode;
        L1 = L1 ? L1.next : nil;
        L2 = L2 ? L2.next : nil;
    }

    if (carryOver) {
        linkNode *tempNode = [linkNode new];
        tempNode.value = carryOver;
        tempNode.next = nil;
        currNode.next = tempNode;
    }
        
    return dummyNode.next;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *A = @[@3, @4, @2];
        NSArray *B = @[@4, @6, @5];
        
        linkNode *link1 = formListFromArray(A);
        printList(link1);
        
        linkNode *link2 = formListFromArray(B);
        printList(link2);
        
        printList(addTwoNumber(link1, link2));

        A = @[@9];
        B = @[@9, @9];
        
        link1 = formListFromArray(A);
        printList(link1);
        
        link2 = formListFromArray(B);
        printList(link2);
        
        printList(addTwoNumber(link1, link2));
    }
    return 0;
}
