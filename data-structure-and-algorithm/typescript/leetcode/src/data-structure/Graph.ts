import {Data} from '../util/object';

export class Graph<T, W> {
  nodeSet: Set<GraphNode<T>>;
  adjacentMap: Map<GraphNode<T>, Map<GraphNode<T>, W>>;
  isDirected: boolean;
  constructor(edgeList: Edge<T, W>[], isDirected = false) {
    this.nodeSet = new Set<GraphNode<T>>();
    this.adjacentMap = new Map<GraphNode<T>, Map<GraphNode<T>, W>>();
    this.isDirected = isDirected;
    edgeList.forEach(edge => {
      this.addEdge(edge);
    });
  }

  addEdge(edge: Edge<T, W>): void {
    const {source, destination, weight} = edge;

    this.nodeSet.add(source);
    this.nodeSet.add(destination);
    if (!this.adjacentMap.has(source)) {
      this.adjacentMap.set(source, new Map<GraphNode<T>, W>());
    }
    if (!this.adjacentMap.has(destination)) {
      this.adjacentMap.set(destination, new Map<GraphNode<T>, W>());
    }

    this.adjacentMap.get(source)!.set(destination, weight);
    if (!this.isDirected) {
      this.adjacentMap.get(destination)!.set(source, weight);
    }
  }

  get nodeCount(): number {
    return this.nodeSet.size;
  }
}

export class Edge<T, W> {
  source: GraphNode<T>;
  destination: GraphNode<T>;
  weight: W;
  constructor(source: GraphNode<T>, destination: GraphNode<T>, weight: W) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }
}

export class GraphNode<T> {
  data: T;
  neighborList: GraphNode<T>[];
  constructor(data: Data, ...neighborList: GraphNode<T>[]) {
    this.data = data;
    this.neighborList = neighborList;
  }
}
