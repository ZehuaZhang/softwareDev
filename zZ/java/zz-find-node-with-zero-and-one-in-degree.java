// given a list of unique pairs, [parent, child]
// find root nodes and find leaves with only one parent

import java.util.*;

public class Solution {

    Solution(int[][] pairsList) {
        for (int[] pair : pairsList) {
            int parent = pair[0];
            int child = pair[1];

            leavesWithSingleParent.add(child);
            if (childs.contains(child)) {
                leavesWithSingleParent.remove(child);
            }

            childs.add(child);
            roots.add(parent);

            if (roots.contains(child)) {
                roots.remove(child);
            }

            if (!childs.contains(parent)) {
                roots.remove(parent);
            }
        }
    }

    public Set<Integer> getRootNodes() {
        return roots;
    }

    public Set<Integer> getLeafNodesWithSingleParent() {
        return leavesWithSingleParent;
    }

    public Set<Integer> childs = new HashSet<>();
    public Set<Integer> roots = new HashSet<>();
    public Set<Integer> leavesWithSingleParent = new HashSet<>();
}
