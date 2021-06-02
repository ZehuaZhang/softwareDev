
/**
 * Text Justification
 * 
 * Given an array of words and a length L, format the text such that each line has exactly L characters and is fully (left and right) justified.
 * 
 * You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly Lcharacters.
 * 
 * Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.
 * 
 * For the last line of text, it should be left justified and no extra space is inserted between words.
 * 
 * For example,
 * words: ["This", "is", "an", "example", "of", "text", "justification."]
 * L: 16.
 * 
 * Return the formatted lines as:
 * 
 * [
 *    "This    is    an",
 *    "example  of text",
 *    "justification.  "
 * ]
 *  
 * Note: Each word is guaranteed not to exceed L in length.
 * 
 * Corner Cases:
 * A line other than the last line might contain only one word. What should you do in this case?
 * In this case, that line should be left-justified.
 */

import java.util.ArrayList;
import java.util.Arrays;

public class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        if (words == null) {
            throw new NullPointerException();
        }

        List<String> result = new ArrayList<>();
        int begin = 0, length = 0;
        for (int i = 0; i < words.length; ++i) {
            if (length + words[i].length() + (i - begin) > maxWidth) {
                result.add(connect(words, maxWidth, begin, i, length, false));
                begin = i;
                length = 0;
            }
            length += words[i].length();
        }

        result.add(connect(words, maxWidth, begin, words.length, length, true));

        return result;
    }

    private String connect(String[] words, int maxWidth, int begin, int end, int length, boolean isLast) {
        String s;
        int n = end - begin;
        for (int i = 0; i < n; ++i) {
            s += words[begin + i];
            addSpaces(s, i, n - 1, maxWidth - len, isLast);
        }

        if (s.length() < maxWidth) {
            char[] spaces = new char[maxWidth - s.length()];
            Arrays.fill(spaces, ' ');
            s += new String(spaces);
        }
        return s;
    }

    private void addSpaces(String s, int i, int spaceCount, int spaceWidth, boolean isLast) {
        if (i < spaceCount) {
            int spaces = isLast ? 1 : spaceWidth / spaceCount + (i < spaceWidth % spaceCount ? 1 : 0);
            s += getSpacesOfLength(spaces);
        }
    }

    private String getSpacesOfLength(int length) {
        char[] spaces = new char[length];
        Arrays.fill(spaces, ' ');
        return new String(spaces);
    }
}
