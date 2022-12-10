import {Data} from '../util/object';

export class Graph {
  nodeSet: Set<GraphNode>;
  adjacentMap: Map<GraphNode, Map<GraphNode, number>>;
  isDirected: boolean;
  constructor(edgeList: Edge[], isDirected = false) {
    this.nodeSet = new Set<GraphNode>();
    this.adjacentMap = new Map<GraphNode, Map<GraphNode, number>>();
    this.isDirected = isDirected;
    edgeList.forEach(edge => {
      this.addEdge(edge);
    });
  }

  addEdge(edge: Edge): void {
    const {source, destination, weight} = edge;

    this.nodeSet.add(source);
    this.nodeSet.add(destination);
    if (!this.adjacentMap.has(source)) {
      this.adjacentMap.set(source, new Map<GraphNode, number>());
    }
    if (!this.adjacentMap.has(destination)) {
      this.adjacentMap.set(destination, new Map<GraphNode, number>());
    }

    this.adjacentMap.get(source)!.set(destination, weight);
    if (!this.isDirected) {
      this.adjacentMap.get(destination)!.set(source, weight);
    }
  }

  nodeCount(): number {
    return this.nodeSet.size;
  }
}

export class Edge {
  source: GraphNode;
  destination: GraphNode;
  weight: number;
  constructor(source: GraphNode, destination: GraphNode, weight: number) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }
}

export class GraphNode {
  data: Data;
  neighborList: GraphNode[];
  constructor(data: Data, ...neighborList: GraphNode[]) {
    this.data = data;
    this.neighborList = neighborList;
  }
}
