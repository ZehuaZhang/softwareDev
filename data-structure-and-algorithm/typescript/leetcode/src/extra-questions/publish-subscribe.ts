class PublishSubscribe {
  subId: bigint;
  eventSubIdSetMap: Map<string, Set<string>>;
  subIdSubscriberMap: Map<string, Subscriber>;

  constructor() {
    this.eventSubIdSetMap = new Map<string, Set<string>>();
    this.subIdSubscriberMap = new Map<string, Subscriber>();
    this.subId = 0n;
  }

  emit(event: string, ...args: any[]): boolean {
    if (!this.eventSubIdSetMap.has(event)) {
      return false;
    }

    const subIdList = this.eventSubIdSetMap.get(event)!;
    subIdList.forEach(subId => {
      const subscriber = this.subIdSubscriberMap.get(subId)!;
      subscriber.handle(...args);
    });
    return true;
  }

  subscribe(event: string, handle: Function): Subscriber {
    if (!this.eventSubIdSetMap.has(event)) {
      this.eventSubIdSetMap.set(event, new Set<string>());
    }

    const subId = (++this.subId).toString();
    const subIdSet = this.eventSubIdSetMap.get(event)!;
    subIdSet.add(subId);
    const subscriber = new Subscriber(subId, handle, () => {
      if (!subIdSet.has(subId)) {
        return false;
      }
      subIdSet.delete(subId);
      this.subIdSubscriberMap.delete(subId);
      if (subIdSet.size === 0) {
        this.eventSubIdSetMap.delete(event);
      }
      return true;
    });
    this.subIdSubscriberMap.set(subId, subscriber);
    return subscriber;
  }

  unsubscribe(subId: string) {
    if (!this.subIdSubscriberMap.has(subId)) {
      return false;
    }
    for (const [event, subIdSet] of this.eventSubIdSetMap.entries()) {
      if (subIdSet.has(subId)) {
        subIdSet.delete(subId);
        this.subIdSubscriberMap.delete(subId);
        if (subIdSet.size === 0) {
          this.eventSubIdSetMap.delete(event);
        }
        return true;
      }
    }
    return false;
  }
}

class Subscriber {
  subId: string;
  handle: Function;
  unsubscribe: () => boolean;
  constructor(subId: string, handle: Function, unsubscribe: () => boolean) {
    this.subId = subId;
    this.handle = handle;
    this.unsubscribe = unsubscribe;
  }
}
