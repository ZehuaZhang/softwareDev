// 207. Course Schedule
// Difficulty : Medium

// There are a total of n courses you have to take, labeled from 0 to n - 1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, 
// which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// For example:
// 2, [[1,0]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

// 2, [[1,0],[0,1]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0, 
// and to take course 0 you should also have finished course 1. So it is impossible.

// click to show more hints.

// Hints:
// This problem is equivalent to finding if a cycle exists in a directed graph. 
// If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
// There are several ways to represent a graph. For example, the input prerequisites is a graph represented 
// by a list of edges. Is this graph representation appropriate?
// Topological sort could also be done via BFS.

// Time:  O(|V| + |E|)
// Space: O(|E|)

class Solution {
public:
  bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses, vector<int>(0));
    vector<int> inDegree(numCourses, 0);
    for (auto prerequisite : prerequisites) {
      graph[prerequisite[1]].push_back(prerequisite[0]);
      ++inDegree[prerequisite[0]];
    }

    queue<int> q;
    for (int i = 0; i < numCourses; ++i) {
      if (inDegree[i] == 0) {
        q.push(i);
      }
    }
    while (!q.empty()) {
      int course = q.front(); q.pop();
      for (auto advancedCourse : graph[course]) {
        if (--inDegree[advancedCourse] == 0) {
          q.push(advancedCourse);
        }
      }
    }
    for (int i = 0; i < numCourses; ++i) {
      if (inDegree[i] != 0) {
        return false;
      }
    }
    return true;
  }
};