/**
 * Course Schedule II
 * 
 * There are a total of n courses you have to take, labeled from 0 to n - 1.
 * 
 * Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]
 * 
 * Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.
 * 
 * There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.
 * 
 * For example:
 * 
 * 2, [[1,0]]
 * There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1]
 * 
 * 4, [[1,0],[2,0],[3,1],[3,2]]
 * There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is[0,2,1,3].
 * 
 * Note:
 * The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
 * 
 * click to show more hints.
 * 
 * Hints:
 * This problem is equivalent to finding the topological order in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
 * Topological Sort via DFS - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.
 * Topological sort could also be done via BFS.
 *  */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        int[] inDegree = new int[numCourses];

        for (int[] prerequisite : prerequisites) {
            int basic = prerequisite[1];
            int advanced = prerequisite[0];
            
            List<Integer> advancedList = graph.getOrDefault(basic, new ArrayList<>());
            advancedList.add(advanced);
            graph.put(basic, advancedList);
            ++inDegree[advanced];
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int course : inDegree) {
            if (course == 0) {
                queue.offer(course);
            }
        }

        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int course = queue.poll();
            result.add(course);

            for (Integer advanced : graph.getOrDefault(course, new ArrayList<>())) {
                if (--inDegree[advanced] == 0) {
                    queue.offer(advanced);
                }
            }
        }

        if (result.size() != numCourses) {
            return new int[numCourses];
        }

        int[] resultInPrimitiveArray = new int[numCourses];
        for (int i = 0; i < numCourses; ++i) {
            resultInPrimitiveArray[i] = result.get(i);
        }
        return resultInPrimitiveArray;
    }
}
