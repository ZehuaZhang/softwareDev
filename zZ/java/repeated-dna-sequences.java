/**
 * Repeated DNA Sequences
 * 
 * All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.
 * 
 * Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.
 * 
 * Example:
 * 
 * Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
 * 
 * Output: ["AAAAACCCCC", "CCCCCAAAAA"]
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        if (s.length() <= 10) {
            throw new IllegalArgumentException();
        }

        List<String> result = new ArrayList<>();
        Map<Integer, Integer> sequenceCount = new HashMap<>();
        for (int i = 0; i <= s.length() - 10; ++i) {
            String subString = s.substring(i, i + 10);
            Integer sequence = toSequence(subString);
            if (sequenceCount.getOrDefault(sequence, 0) == 1) {
                result.add(subString);
            }
            sequenceCount.put(sequence, sequenceCount.getOrDefault(sequence, 0) + 1);
        }

        return result;
    }

    private Integer toSequence(String string) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < string.length(); ++i) {
            switch (string.charAt(i)) {
                case 'A':
                    stringBuilder.append(0);
                    break;
                case 'C':
                    stringBuilder.append(1);
                    break;
                case 'G':
                    stringBuilder.append(2);
                    break;
                case 'T':
                    stringBuilder.append(3);
                    break;
            }
        }

        return Integer.parseInt(stringBuilder.toString(), 4);
    }
}
