import { Graph, Node, PathResult } from '@/types';

class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function heuristic(node1: Node, node2: Node): number {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  const floorPenalty = Math.abs(node1.floor - node2.floor) * 50;
  return Math.sqrt(dx * dx + dy * dy) + floorPenalty;
}

export function calculateAStarPath(
  graph: Graph,
  startId: string,
  endId: string
): PathResult {
  const startNode = graph.nodes.find(n => n.id === startId);
  const endNode = graph.nodes.find(n => n.id === endId);

  if (!startNode || !endNode) {
    throw new Error('Start or end node not found');
  }

  const openSet = new PriorityQueue<string>();
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  graph.nodes.forEach(node => {
    gScore.set(node.id, Infinity);
    fScore.set(node.id, Infinity);
  });

  gScore.set(startId, 0);
  fScore.set(startId, heuristic(startNode, endNode));
  openSet.enqueue(startId, fScore.get(startId)!);

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!;

    if (current === endId) {
      return reconstructPath(cameFrom, current, graph);
    }

    const currentNode = graph.nodes.find(n => n.id === current)!;
    const neighbors = graph.edges
      .filter(e => e.from === current)
      .map(e => ({ id: e.to, distance: e.distance, type: e.type }));

    for (const neighbor of neighbors) {
      const tentativeGScore = gScore.get(current)! + neighbor.distance;

      if (tentativeGScore < gScore.get(neighbor.id)!) {
        cameFrom.set(neighbor.id, current);
        gScore.set(neighbor.id, tentativeGScore);
        const neighborNode = graph.nodes.find(n => n.id === neighbor.id)!;
        const h = heuristic(neighborNode, endNode);
        fScore.set(neighbor.id, tentativeGScore + h);
        openSet.enqueue(neighbor.id, fScore.get(neighbor.id)!);
      }
    }
  }

  throw new Error('No path found');
}

function reconstructPath(
  cameFrom: Map<string, string>,
  current: string,
  graph: Graph
): PathResult {
  const path: string[] = [current];
  let totalDistance = 0;
  const instructions: string[] = [];

  while (cameFrom.has(current)) {
    const prev = cameFrom.get(current)!;
    const edge = graph.edges.find(e => e.from === prev && e.to === current);
    
    if (edge) {
      totalDistance += edge.distance;
      
      if (edge.type === 'elevator') {
        instructions.push(`Take elevator to floor ${graph.nodes.find(n => n.id === current)?.floor}`);
      } else if (edge.type === 'stairs') {
        instructions.push(`Take stairs to floor ${graph.nodes.find(n => n.id === current)?.floor}`);
      } else {
        instructions.push(`Walk ${edge.distance.toFixed(1)}m`);
      }
    }
    
    path.unshift(prev);
    current = prev;
  }

  return {
    path,
    distance: totalDistance,
    instructions: instructions.reverse()
  };
}
