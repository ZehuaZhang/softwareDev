/**
 * Course Schedule
 *  
 * There are a total of n courses you have to take, labeled from 0 to n - 1.
 * 
 * Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]
 * 
 * Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?
 * 
 * For example:
 * 
 * 2, [[1,0]]
 * There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.
 * 
 * 2, [[1,0],[0,1]]
 * There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 * 
 * click to show more hints.
 * 
 * Hints:
 * This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
 * There are several ways to represent a graph. For example, the input prerequisites is a graph represented by a list of edges. Is this graph representation appropriate?
 * Topological Sort via DFS - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.
 * Topological sort could also be done via BFS.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        Queue<Integer> queue = new LinkedList<>();
        int[] inDegree = new int[numCourses];

        for (int[] prerequisite : prerequisites) {
            List<Integer> advancedCourses = graph.getOrDefault(prerequisite[1], new ArrayList<>());
            advancedCourses.add(prerequisite[0]);
            graph.put(prerequisite[0], advancedCourses);
            ++inDegree[prerequisite[0]];
        }

        for (int course : inDegree) {
            if (course == 0) {
                queue.offer(course);
            }
        }

        while (!queue.isEmpty()) {
            int course = queue.poll();
            for (Integer advancedCourse : graph.getOrDefault(course, new ArrayList<>())) {
                if (--inDegree[advancedCourse] == 0) {
                    queue.offer(advancedCourse);
                }
            }
        }

        for (int course : inDegree) {
            if (course != 0) {
                return false;
            }
        }

        return true;
    }
}
