/**
 * Design Circular Deque
 *  
 * Design your implementation of the circular double-ended queue (deque).
 * 
 * Your implementation should support following operations:
 * 
 * MyCircularDeque(k): Constructor, set the size of the deque to be k.
 * insertFront(): Adds an item at the front of Deque. Return true if the operation is successful.
 * insertLast(): Adds an item at the rear of Deque. Return true if the operation is successful.
 * deleteFront(): Deletes an item from the front of Deque. Return true if the operation is successful.
 * deleteLast(): Deletes an item from the rear of Deque. Return true if the operation is successful.
 * getFront(): Gets the front item from the Deque. If the deque is empty, return -1.
 * getRear(): Gets the last item from Deque. If the deque is empty, return -1.
 * isEmpty(): Checks whether Deque is empty or not. 
 * isFull(): Checks whether Deque is full or not.
 *  
 * Example:
 * MyCircularDeque circularDeque = new MycircularDeque(3); // set the size to be 3
 * circularDeque.insertLast(1);			// return true
 * circularDeque.insertLast(2);			// return true
 * circularDeque.insertFront(3);			// return true
 * circularDeque.insertFront(4);			// return false, the queue is full
 * circularDeque.getRear();  			// return 2
 * circularDeque.isFull();				// return true
 * circularDeque.deleteLast();			// return true
 * circularDeque.insertFront(4);			// return true
 * circularDeque.getFront();			// return 4
 * 
 * Note:
 * All values will be in the range of [0, 1000].
 * The number of operations will be in the range of [1, 1000].
 * Please do not use the built-in Deque library.
 */

public class MyCircularDeque   {
    MyCircularDeque(int size) {
        this.size = size;
        count = 0;

        head = size - 1;
        tail = 0;

        if (size > 0) {
            data = new int[size];
        }
    }
    
    Boolean insertFront(int value) {
        if (isFull()) {
            return false;
        }

        data[head] = value;
        head = (head - 1 + size) % size;

        ++count;

        return true;
    }
    
    Boolean insertLast(int value) {
        if (isFull()) {
            return false;
        }

        data[tail] = value;
        tail = (tail + 1) % size;

        ++count;

        return true;
    }
    
    Boolean deleteFront() {
        if (isEmpty()) {
            return false;
        }

        head = (head + 1) % size;

        --count;

        return true;
    }
    
    Boolean deleteLast() {
        if (isEmpty()) {
            return false;
        }

        tail = (tail - 1 + size) % size;

        --count;

        return true;
    }
    
    int getFront() {
        if (isEmpty()) {
            return -1;
        }

        return data[(head + 1) % size];
    }
    
    int getRear() {
        if (isEmpty()) {
            return -1;
        }

        return data[(tail - 1 + size) % size];
    }
    
    Boolean isEmpty() {
        return size != 0 && count == 0;
    }
    
    Boolean isFull() {
        return count == size;
    }

    private final int size;
    private int count;
    private int head;
    private int tail;
    private int[] data;
}
