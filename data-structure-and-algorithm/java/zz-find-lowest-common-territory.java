
/**
 * Given a list of string array,
 * 
 * In each string array, the first element consists of the rest elements.
 * 
 * e.g.
 * [Earth, South America, North America, Asia, Pacific]
 * [Asia, China, Korea, Japan]
 * [North America, USA, Canada]
 * [South America, Brazil, Columbia]
 * [Africa, Algeria, Lybia]
 * [China, Beijing, Shanhai]
 * [Japan, Tokyo, Kyoto]
 * [Korea, Seoul]
 * 
 * Given two valid elements, find its least common ancestor (LCA)
 * 
 * e.g.
 * input
 * [Tokyo, Kyoto]
 * output
 * Japan
 * 
 * input
 * [Beijing, Japan]
 * output
 * Asia
 * 
 * input
 * [Seoul, Africa]
 * output
 * Earth
 */

import java.util.*;

public class Solution {
    public List<String> findLowestCommonTerritory(List<String[]> territoriesList, List<String[]> inputs) {
        List<String> result = new ArrayList<>();
        Map<String, String> parents = getParents(territoriesList);
        
        for (String[] input : inputs) {
            result.add(findLCA(parents, input[0], input[1]));
        }

        return result;
    }

    private String findLCA(Map<String, String> parents, String item1, String item2) {
        if (!parents.containsKey(item1) || !parents.containsKey(item2)) {
            return "Invalid";
        }
        
        Set<String> ancestors = new HashSet<>();

        while (parents.get(item1) != item1) {
            ancestors.add(item1);
            item1 = parents.get(item1);
        }
        ancestors.add(item1);

        while (!ancestors.contains(item2)) {
            item2 = parents.get(item2);
        }

        return item2;
    }

    private Map<String, String> getParents(List<String[]> territoriesList) {
        Map<String, String> parents = new HashMap<>();
        for (String[] territories : territoriesList) {
            if (!parents.containsKey(territories[0])) {
                parents.put(territories[0], territories[0]);
            }

            for (int i = 1; i < territories.length; ++i) {
                parents.put(territories[i], territories[0]);
            }
        }

        return parents;
    }
}
