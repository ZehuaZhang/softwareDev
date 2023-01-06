/*
Load Balancer

e.x.
hostnames = ["server1.zehua.com", "server2.zehua.com", "server3.zehua.com"]
username = ["username1", "username2", "username3"]

LoadBalancer lb = LoadBalancer()
lb.add("server1.zehua.com")
lb.add("server2.zehua.com")
lb.add("server3.zehua.com")
lb.get("username1") -> "server3.zehua.com"
lb.get("username2") -> "server1.zehua.com"
lb.get("username3") -> "server2.zehua.com"
*/

import {DoublyLinkedList, DoubleListNode} from '../data-structure/DoublyLinkedList'

class LoadBalancer {
  serverList: DoublyLinkedList<number>;
  serverNodeMap: Map<number, DoubleListNode<number>>;
  downedSet: Set<number>;

  constructor() {
    this.serverList = new DoublyLinkedList<number>();
    this.serverNodeMap = new Map<number, DoubleListNode<number>>();
    this.downedSet = new Set<number>();
  }

  hash(username: string): number {
    let value = 0;

    for(const char of username) {
      value += char.charCodeAt(0);
    }

    return value;
  }

  add(serverId: number): void {
    const node = this.serverList.append(serverId);
    this.serverNodeMap.set(serverId, node);
  }

  remove(serverId: number): void {
    if (this.serverNodeMap.has(serverId)){
      const node = this.serverNodeMap.get(serverId)!;
      this.serverList.remove(node);
      this.serverNodeMap.delete(serverId);

    }
  }

  setDown(serverId: number): void {
     if (this.serverNodeMap.has(serverId)) {
      this.downedSet.add(serverId)
     }
  }

  get(username: string): number {
    if (this.downedSet.size === this.serverList.length) {
      return -1;
    }

    let index = this.hash(username) % this.serverList.length;
    while (this.downedSet.has(this.serverList.get(index)!.data)) {
      index = (index + 1) % this.serverList.length;
    }
    return this.serverList.get(index)!.data;
  }
}