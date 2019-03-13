
/**
 * Node consists of two element [x, y], range of x and y are [1, n]
 * If two Node has any same element, they would be merged into one disjoint set
 * 
 * Given a list of Nodes, find all the disjoint sets
 */

import java.util.*;

public class Solution {
    public List<List<Node>> countComponents(int n, Node[] Nodes) {
        int[] parents = new int[n];

        for (int i = 0; i < n; ++i) {
            parents[i] = i;
        }

        Map<Integer, Set<Node>> nodeGroups = new HashMap<>();

        for (Node node : Nodes) {
            int x = find(node.item1, parents);
            int y = find(node.item2, parents);

            if (nodeGroups.containsKey(x) && nodeGroups.containsKey(y)) {
                union(parents, y, x);
                nodeGroups.get(x).addAll(nodeGroups.get(y));
                nodeGroups.remove(y);                
            } else if (nodeGroups.containsKey(y)) {
                union(parents, x, y);
                addNodeToGroup(y, node, nodeGroups);
            } else {
                union(parents, y, x);
                addNodeToGroup(x, node, nodeGroups);
            }

            // follow-up remove duplicate - add visited set
            // follow-up add Node in linear time (for merging two node groups) - use linked list, instead of set
        }

        List<List<Node>> result = new ArrayList<>();
        for (int root : nodeGroups.keySet()) {
            result.add(new ArrayList<>(nodeGroups.get(root)));
        }

        return result;
    }

    private void addNodeToGroup(int key, Node node, Map<Integer, Set<Node>> nodeGroups) {
        Set<Node> set = nodeGroups.getOrDefault(key, new HashSet<>());
        set.add(node);
        nodeGroups.put(key, set);
    }

    private int find(int i, int[] parents) {
        while (i != parents[i]) {
            i = parents[i];
        }
        return i;
    }

    private void union(int[] parents, int x, int y) {
        int xRoot = find(x, parents);
        int yRoot = find(y, parents);

        parents[xRoot] = yRoot;
    }

    public class Node {
        public int item1;
        public int item2;

        Node(int item1, int item2) {
            this.item1 = item1;
            this.item2 = item2;
        }

        @Override
        public int hashCode() {
            return Integer.parseInt(String.valueOf(item1) + String.valueOf(item2));
        }

        @Override
        public boolean equals(Object object) {
            if (object == null || !(object instanceof Node)) {
                return false;
            }

            if (obj == this) {
                return true;
            }

            Node node = (Node) object;
            return this.item1 == node.item1 && this.item2 == node.item2;
        }
    }
}
