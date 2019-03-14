/*Think about an organization such as Amazon.
Every employee reports to one and only one manager (except the CEO).
How can we find the highest level of separation from the CEO?
For example, people who report directly to CEO have separation of 1,
and people who report to the CEO-direct-reports have separation of 2
*/

// employeeId

// input: [[1, 2], [2, 3], [1, 4]]
// output: 2

// [[manager, directReport]]

//               0
//             /    \
//          1          2
//          /
//         3

public class Solution {
    int employeeCount;
    List<Integer>[] directReportsIDList;
    
    Solution(int[][] inputs, int employeeCount) {
        this.employeeCount = employeeCount;
        this.directReportsIDList = new ArrayList<Employee>[employeeCount];
        
        for (int[] input : inputs) {
            int manager = input[0];
            int directReport = input[1];
            
            if (directReportsIDList[manager] == null) {
                directReportsIDList[manager] = new ArrayList<Integer>());
            }
            directReportsIDList[manager].add(directReport);
        }
    }
    
    public int getHighestSeperation() {
        int source = 0;
        
        Stack<Integer> stack = new Stack<>();
        
        boolean visited = new boolean[employeeCount];
        f
        for (int employeeID = 0; employeeID < employeeCount; ++employeeID) {
            if (!visited[employeeID]) {
                topologySortHelper(employeeID, visited, stack);
            }
        }
        
        int[] distance = new int[employeeCount];
        for (int employeeID = 0; employeeID < employeeCount; ++employeeID) {
            distance[employeeID] = Integer.MIN_VALUE;
            
            if (employeeID == 0) {
                distance[0] = 0;
            }
        }
        
        while (!stack.isEmpty()) {
            int currEmployeeId = stack.pop();
            
            // [0, 1, 2, 3]
            
            if (distance[currEmployeeId] != Integer.MIN_VALUE) {
                for (int directReportEmployeeId : directReportsIDList.get(currEmployeeId)) {
                    if (distance[directReportEmployeeId] < distance[currEmployeeId] + 1) {
                        distance[directReportEmployeeId] = distance[currEmployeeId] + 1;
                    }
                }
            }
        }
        
        int fresult = 0;
        for (int distanceEntry : distance) {
            result = Math.max(result, distanceEntry);
        }
        
        return result;
    }
    
    private void topologySortHelper(int employeeID, boolean[] visited, Stack<Integer> stack) {
        visited[employeeID] = true;

        if (directReportsIDList.get(employeeID) != null) {
            for (int directReportEmployeeId : directReportsIDList.get(employeeID)) {
                topologySortHelper(directReportEmployeeId, visited, stack);
            }
        }        
        stack.push(employeeID);
    }
}
