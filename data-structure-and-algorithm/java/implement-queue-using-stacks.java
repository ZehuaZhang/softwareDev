/**
 * Implement Queue using Stacks 
 * 
 * Implement the following operations of a queue using stacks.
 * 
 * push(x) -- Push element x to the back of queue.
 * pop() -- Removes the element from in front of queue.
 * peek() -- Get the front element.
 * empty() -- Return whether the queue is empty.
 * 
 * Notes:
 * 
 * You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
 * Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.
 * You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).
 */

import java.util.Stack;

class MyQueue {
    public void push(int x) {
        buffer.push(x);
    }

    public void pop() {
        transferBufferToOutput();
        output.pop();
    }

    public int peek() {
        transferBufferToOutput();
        return output.top();
    }

    public boolean empty() {
       return output.isEmpty() && buffer.isEmpty();
    }

    private transferBufferToOutput() {
        if (!output.isEmpty()) {
            return;
        }

        while (!buffer.isEmpty()) {
            output.push(buffer.pop());
        }
    }

    private Stack<Integer> buffer = new Stack<>();
    private Stack<Integer> output = new Stack<>();
}
