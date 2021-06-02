// 332. Reconstruct Itinerary
// Difficulty: Medium

// Given a list of airline tickets represented by pairs of departure and arrival airports [from, to], 
// reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK. 
// Thus, the itinerary must begin with JFK.

// Note:
// If there are multiple valid itineraries, 
// you should return the itinerary that has the smallest lexical order when read as a single string. 
// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// All airports are represented by three capital letters (IATA code).

// You may assume all tickets form at least one valid itinerary.
// Example 1:
// tickets = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Return ["JFK", "MUC", "LHR", "SFO", "SJC"].

// Example 2:
// tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Return ["JFK","ATL","JFK","SFO","ATL","SFO"].
// Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"]. But it is larger in lexical order.

// Time:  O(t! / (n1! * n2! * ... nk!)), t is the total number of tickets, 
//                                       ni is the number of the ticket which from is city i,
//                                       k is the total number of cities.
// Space: O(t)

class Solution {
public:
  vector<string> findItinerary(vector<pair<string, string>> tickets) {
    unordered_map<string, map<string, int>> graph;
    for (const auto& ticket : tickets) {
      ++graph[ticket.first][ticket.second];
    }
    const string from{"JFK"};
    vector<string> ans{from};
    findItinerary(from, tickets.size(), graph, ans);
    return ans;
  }

private:
  bool findItinerary(const string& from, const int ticketCnt, unordered_map<string, map<string, int>>& graph, vector<string>& ans) {
    if (ticketCnt == 0) {
      return true;
    }

    for (auto to : graph[from]) {
      if (to.second > 0) {
        --to.second;
        ans.emplace_back(to.first);
        if (findItinerary(to.first, ticketCnt - 1, graph, ans)) {
          return true;
        }
        ans.pop_back();
        ++to.second;
      }
    }
    return false;
  }
};
