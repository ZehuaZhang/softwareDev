/**
 * Unique Word Abbreviation
 * 
 * An abbreviation of a word follows the form <first letter><number><last letter>. Below are some examples of word abbreviations:
 * 
 * a) it                      --> it    (no abbreviation)
 * 
 *      1
 * b) d|o|g                   --> d1g
 * 
 *               1    1  1
 *      1---5----0----5--8
 * c) i|nternationalizatio|n  --> i18n
 * 
 *               1
 *      1---5----0
 * d) l|ocalizatio|n          --> l10n
 * Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary.
 * A word's abbreviation is unique if no other word from the dictionary has the same abbreviation.
 * 
 * Example: 
 * 
 * Given dictionary = [ "deer", "door", "cake", "card" ]
 * 
 * isUnique("dear") -> false
 * isUnique("cart") -> true
 * isUnique("cane") -> false
 * isUnique("make") -> true
 */

import java.util.HashMap;
import java.util.Map;

public class ValidWordAbbr {
    public ValidWordAbbr(String[] dictionary) {
        for (String word : dictionary) {
            String abbreviation = getAbbreviation(word);
            Set<String> abbreviationSet = abbreviationMap.getOrDefault(abbreviation, new Set<String>());
            abbreviationSet.add(word);
            abbreviationMap.put(abbreviation, abbreviationSet);
        }
    }

    public boolean isUnique(String word) {
        String abbrieviation = getAbbreviation(word);
        if (
            !abbreviationMap.containsKey(abbrieviation) ||
            (
                abbreviationMap.get(abbrieviation).size() == 1 &&
                abbreviationMap.get(abbrieviation).contains(word) 
            )) {
            
            return true;
        }

        return false;
    }
    
    private Map<String, Set<String>> abbreviationMap = new HashMap<>();

    private String getAbbreviation(String word) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder
            .append(word.charAt(0))
            .append(word.length())
            .append(word.charAt(word.length() - 1));

        return new String(stringBuilder);
    }
}
