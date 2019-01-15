/**
 * Group Anagrams
 * 
 * Given an array of strings, group anagrams together.
 * 
 * Example:
 * Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * Output:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 * 
 * Note:
 * All inputs will be in lowercase.
 * The order of your output does not matter.
*/

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> res = new ArrayList<>();
        Map<List<Integer>, List<String>> hm = new HashMap<>();
        for (int i = 0; i < strs.length; ++i) {
            List<Integer> ak = getArray(strs[i]);
            if (hm.containsKey(ak)) {
                hm.get(ak).add(strs[i]);
            } else {
                List<String> list = new ArrayList<>();
                list.add(strs[i]);
                hm.put(ak, list);
            }
        }
        
        for (List<Integer> k : hm.keySet()) {
            // pay attention to the requirements.
            Collections.sort(hm.get(k));
            res.add(hm.get(k));
        }
        return res;
    }
    
    private List<Integer> getArray(String s) {
        List<Integer> array = new ArrayList<>();
        for (int i = 0; i < 26; ++i) array.add(0);
        for (int i = 0; i < s.length(); ++i) {
            array.set(s.charAt(i) - 'a', array.get(s.charAt(i) - 'a') + 1);
        }
        return array;
    }
}

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<List<String>>();
        Map<String, List<String>> countToAnagramListDataMap = new HashMap<>();
        
        for (String string : strs) {
            int[] count = new int[26];
            for (i = 0; i < string.length(); ++i) {
                ++count[string.charAt(i) - 'a'];
            }
            String countString = "";
            for (i = 0; i < count.length; ++i) {
                countString += String.valueOf(count[i]) + "/";
            }

            if (countToAnagramListDataMap.containsKey(countString)) {
                countToAnagramListDataMap.get(countString).add(string);
            } else {
                List<String> anagramList = new ArrayList<String>();
                anagramList.add(string);
                countToAnagramListDataMap.set(countString, anagramList);
            }
        }

        for (List<String> key : countToAnagramListDataMap.keySet()) {
            result.add(countToAnagramListDataMap.get(key));
        }
        return result;
    }
}