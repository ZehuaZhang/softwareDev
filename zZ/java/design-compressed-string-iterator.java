/**
 * Design Compressed String Iterator
 * 
 * Design and implement a data structure for a compressed string iterator. It should support the following operations: next and hasNext.
 * 
 * The given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.
 * 
 * next() - if the original string still has uncompressed characters, return the next letter; Otherwise return a white space.
 * hasNext() - Judge whether there is any letter needs to be uncompressed.
 * 
 * Note:
 * Please remember to RESET your class variables declared in StringIterator, as static/class variables are persisted across multiple test cases. Please see here for more details.
 * 
 * Example:
 * 
 * StringIterator iterator = new StringIterator("L1e2t1C1o1d1e1");
 * 
 * iterator.next(); // return 'L'
 * iterator.next(); // return 'e'
 * iterator.next(); // return 'e'
 * iterator.next(); // return 't'
 * iterator.next(); // return 'C'
 * iterator.next(); // return 'o'
 * iterator.next(); // return 'd'
 * iterator.hasNext(); // return true
 * iterator.next(); // return 'e'
 * iterator.hasNext(); // return false
 * iterator.next(); // return ' '
 */

import java.util.LinkedList;
import java.util.Queue;

public class StringIterator {
    StringIterator(String compressedString) {
        int count = 0;
        char letter;
        for (int i = 0; i < compressedString.length(); ++i) {
            char currentChar = compressedString.charAt(i);
            if (Character.isDigit(currentChar)) {
                count += count * 10 + Integer.parseInt(Character.toString(currentChar));

                if (i == compressedString.length() - 1 || !Character.isDigit(compressedString.charAt(i + 1))) {
                    queue.offer(new Pair(letter, count));
                }
            } else {
                letter = currentChar;
            }   
        }
    }

    public char next() {
        Pair pair = queue.peek();

        char letter = pair.letter;
        if (--pair.count == 0) {
            queue.poll();
        }

        return letter;
    }
    
    public boolean hasNext() {
        return !queue.isEmpty();
    }

    private Queue<Pair> queue = new LinkedList<>();

    private class Pair {
        char letter;
        int count;

        Pair(char letter, int count) {
            this.letter = letter;
            this.count = count;
        }
    }
}
