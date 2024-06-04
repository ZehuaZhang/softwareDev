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

import {runTestCaseList} from './util/test';

function findItinerary(tickets: string[][]): string[] {
  const graph = new Map<string, Map<string, number>>();
  for (const [src, dst] of tickets) {
    if (!graph.has(src)) {
      graph.set(src, new Map<string, number>());
    }
    const srcMap = graph.get(src)!;
    srcMap.set(dst, (srcMap.get(dst) || 0) + 1);
  }
  const from = 'JFK';
  const result: string[] = [from];
  findItineraryDfs(from, tickets.length);
  return result;

  function findItineraryDfs(from: string, ticketCount: number): boolean {
    if (ticketCount === 0) {
      return true;
    }

    if (graph.has(from)) {
      const fromMap = graph.get(from)!;
      const toCountList = [...fromMap.entries()].sort(([to1], [to2]) =>
        to1.localeCompare(to2)
      );
      for (let [to, count] of toCountList) {
        if (count > 0) {
          fromMap.set(to, --count);
          result.push(to);
          if (findItineraryDfs(to, ticketCount - 1)) {
            return true;
          }
          result.pop();
          fromMap.set(to, ++count);
        }
      }
    }
    return false;
  }
}

// tests

const testInputListCollection = [
  [
    [
      ['MEL', 'PER'],
      ['SYD', 'CBR'],
      ['AUA', 'DRW'],
      ['JFK', 'EZE'],
      ['PER', 'AXA'],
      ['DRW', 'AUA'],
      ['EZE', 'SYD'],
      ['AUA', 'MEL'],
      ['DRW', 'AUA'],
      ['PER', 'ANU'],
      ['CBR', 'EZE'],
      ['EZE', 'PER'],
      ['MEL', 'EZE'],
      ['EZE', 'MEL'],
      ['EZE', 'TBI'],
      ['ADL', 'DRW'],
      ['ANU', 'EZE'],
      ['AXA', 'ADL'],
    ],
  ],
];

const expectedResultList = [
  [
    'JFK',
    'EZE',
    'MEL',
    'EZE',
    'PER',
    'AXA',
    'ADL',
    'DRW',
    'AUA',
    'DRW',
    'AUA',
    'MEL',
    'PER',
    'ANU',
    'EZE',
    'SYD',
    'CBR',
    'EZE',
    'TBI',
  ],
];

runTestCaseList(testInputListCollection, expectedResultList, findItinerary);
