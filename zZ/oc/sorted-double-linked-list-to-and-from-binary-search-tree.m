DoubleListNode* sortedListToBSTHelper(DoubleListNode** head, int n) {
  if (n <= 0) {
      return nil;
  }
  DoubleListNode* left = sortedListToBSTHelper(head, n / 2);
  
  DoubleListNode* root = *head;
  root.prev = left;

  *head = (*head).next;
  root.next = sortedListToBSTHelper(head, n - n / 2 - 1);

  return root;
}

DoubleListNode* sortedListToBST(DoubleListNode* head) {
  int count = 0;
  for (DoubleListNode* curr = head; curr; curr = curr.next) {
      count++;
  }
  return sortedListToBSTRecur(&head, count);
}

void BinaryTree2DoubleLinkedListHelper(TreeNode* root, TreeNode** head, TreeNode** prev) {
    if (!root) {
      return;
    }
    
    BinaryTree2DoubleLinkedListHelper(root.left, head, prev);
 
    if (*prev == nil) {
        *head = root;
    } else {
        root.left = *prev;
        (*prev).right = root;
    }
    *prev = root;
 
    BinaryTree2DoubleLinkedListHelper(root.right, head, prev);
}

void BinaryTree2DoubleLinkedList(TreeNode* root, TreeNode** head) {
    TreeNode* prev = nil;
    BinaryTree2DoubleLinkedListHelper(root, head, &prev)
}