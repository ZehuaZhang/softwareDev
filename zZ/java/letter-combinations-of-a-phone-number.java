/**
 * Letter Combinations of a Phone Number
 * 
 * Given a digit string, return all possible letter combinations that the number
 * could represent.
 * 
 * A mapping of digit to letters (just like on the telephone buttons) is given
 * below.
 * 
 * Input:Digit string "23"
 * Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * Note: Although the above answer is in lexicographical order, your answer
 * could be in any order you want.
 */

public class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits == null) {
            throw new NullPointerException();
        }
        List<String> res = new ArrayList<String>();
        if (digits.length() == 0) {
            return res;
        }
        String[] chart = { " ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
        res.add("");
        for (int i = 0; i < digits.length(); ++i) {
            List<String> nextList = new ArrayList<String>();
            for (String s : res) {
                for (int j = 0; j < chart[digits.charAt(i) - '0'].length(); ++j) {
                    String newS = s + chart[digits.charAt(i) - '0'].charAt(j);
                    nextList.add(newS);
                }
            }
            res = nextList;
        }
        return res;
    }
}

public class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits == null) {
            throw new NullPointerException();
        }

        List<String> combinationList = new ArrayList<String>();
        if (digits.length() == 0) {
            return combinationList;
        }

        String[] digitToCharacterGroupDataMap = {
            " ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        };

        combinationList.add("");
        for (int i = 0; i < digits.length(); ++i) {
            List<String> nextCombinationList = new ArrayList<String>();
            for (String combination : combinationList) {
                for (int j = 0; j < digitToCharacterGroupDataMap[digit.charAt(i) - '0'].length(); ++j) {
                    String nextCombination = combination + digitToCharacterGroupDataMap[digit.charAt(i) - '0'].charAt(j);
                    nextCombinationList.add(nextCombination);
                }
            }
            combinationList = nextCombinationList;
        }

        return combinationList;
    }
}