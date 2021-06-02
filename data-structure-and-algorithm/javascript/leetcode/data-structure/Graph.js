class Graph {
    constructor(edges, isDirected = false) {
        this.vertices = new Set();
        this.adjacentMap = new Map();
        this.isDirected = isDirected;
        edges.forEach(edge => {
            this.addEdge(edge);
        })
    }

    addEdge(edge) {
        const { source, destination, weight } = edge;
        this.vertices.add(source);
        this.vertices.add(destination);
        if (!this.adjacentMap.has(source)) {
            this.adjacentMap.set(source, new Map()); 
        }
        this.adjacentMap.get(source).set(destination, weight);
        if (!this.isDirected) {
            if (!this.adjacentMap.has(destination)) {
                this.adjacentMap.set(destination, new Map());
            }
            this.adjacentMap.get(destination).set(source, weight);
        }
    }

    nodeCount() {
        return this.vertices.size;
    }
}

class Edge {
    constructor(source, destination, weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
}