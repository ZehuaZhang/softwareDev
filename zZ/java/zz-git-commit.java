/**
 * 1) find all commit based on latest commit
 * 2) find latest common commit
 */

import java.util.*;

public class Solution {
    
    // find all commit based on latest commit
    public List<GitNode> findAllCommits(GitNode node) {
        List<GitNode> result = new ArrayList<>();
        Queue<GitNode> queue = new LinkedList<>();
        Set<GitNode> visited = new HashSet<>();

        queue.offer(node);
        visited.add(node);

        while (!queue.isEmpty()) {
            GitNode currNode = queue.poll();
            result.add(currNode);

            for (GitNode parent : currNode.parents) {
                if (!visited.contains(parent)) {
                    queue.offer(parent);
                    visited.add(parent);
                }
            }
        }

        return result;
    }

    // find latest parent commit
    public GitNode findLCA(GitNode node1, GitNode node2) {
        if (node1 == null || node2 == null) {
            return null;
        }

        Queue<GitNode> queue1 = new LinkedList<>();
        Queue<GitNode> queue2 = new LinkedList<>();

        Set<GitNode> visited1 = new HashSet<>();
        Set<GitNode> visited2 = new HashSet<>();

        queue1.offer(node1);
        visited1.add(node1);
        queue2.offer(node2);
        visited2.add(node2);

        while (!queue1.isEmpty() && !queue2.isEmpty()) {
            for (int size = queue1.size(); size > 0; --size) {
                GitNode currNode = queue1.poll();
                
                if (visited2.contains(currNode)) {
                    return currNode;
                }

                for (GitNode parentNode : currNode.parents) {
                    if (!visited1.contains(parentNode)) {
                        queue1.offer(parentNode);
                        visited1.add(parentNode);
                    }
                }
            }

            for (int size = queue2.size(); size > 0; --size) {
                GitNode currNode = queue2.poll();

                if (visited1.contains(currNode)) {
                    return currNode;
                }

                for (GitNode parentNode : currNode.parents) {
                    if (!visited2.contains(parentNode)) {
                        queue2.offer(parentNode);
                        visited2.add(parentNode);
                    }
                }
            } 
        }

        return null;
    }

    public class GitNode{
        int id;
        List<GitNode> parents;
        public GitNode(int id){
            this.id = id;
            this.parents = new ArrayList<>();
        }
    }
}
