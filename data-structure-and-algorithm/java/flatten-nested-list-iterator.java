/**
 * Flatten Nested List Iterator
 * 
 * Given a nested list of integers, implement an iterator to flatten it.
 * 
 * Each element is either an integer, or a list -- whose elements may also be integers or other lists.
 * 
 * Example 1:
 * Given the list [[1,1],2,[1,1]],
 * 
 * By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].
 * 
 * Example 2:
 * Given the list [1,[4,[6]]],
 * 
 * By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
 */

import java.util.List;
import java.util.Stack;
import java.util.ArrayList;

public class NestedIterator {
    NestedIterator (List<NestedInteger> nestedList) {
        stack = new Stack<NestedInteger>();

        for (int i = nestedList.size() - 1; i >= 0; --i) {
            stack.push(nestedList.get(i));
        }
    }

    public int next() {
        return stack.pop().getInteger();
    }

    public boolean hasNext() {
        while (!stack.isEmpty()) {
            NestedInteger top = stack.peek();
            if (top.isInteger()) {
                return true;
            }
            stack.pop();

            for (int i = top.getList().size() - 1; i >= 0; --i) {
                stack.push(top.getList().get(i));
            }
        }
        return false;
    }

    private Stack<NestedInteger> stack;
}

public class NestedInteger {
    public List<NestedInteger> getList() {
    }

    public boolean isInteger() {
    }

    public int getInteger() {
    }
}