/*
332. Reconstruct Itinerary

You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.



Example 1:


Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
Example 2:


Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.


Constraints:

1 <= tickets.length <= 300
tickets[i].length == 2
fromi.length == 3
toi.length == 3
fromi and toi consist of uppercase English letters.
fromi != toi
*/

function findItinerary(tickets: string[][]): string[] {
  const map = new Map<string, Map<string, number>>();
  for (const [s, d] of tickets) {
    if (!map.has(s)) {
      map.set(s, new Map<string, number>());
    }
    const m = map.get(s);
    m.set(d, (m.get(d) || 0) + 1);
  }

  const rslt: string[] = ["JFK"];
  dfs("JFK");

  return rslt;

  function dfs(s: string) {
    if (rslt.length === tickets.length + 1) {
      return true;
    }

    if (!map.has(s)) {
      return false;
    }

    const m = map.get(s);
    const kl = [...m.keys()].sort();
    for (const k of kl) {
      const cnt = m.get(k);
      if (cnt > 0) {
        m.set(k, cnt - 1);
        rslt.push(k);
        if (dfs(k)) {
          return true;
        }
        rslt.pop();
        m.set(k, cnt);
      }
    }

    return false;
  }
}
