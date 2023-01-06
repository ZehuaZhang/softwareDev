class Subscriber {
  subId: string;
  handle: Function;
  constructor(subId: string, handle: Function) {
    this.subId = subId;
    this.handle = handle;
  }
}

class PublishSubscribe<T> {
  subId: number;
  eventSubListMap: Map<string, Subscriber[]>;

  constructor() {
    this.eventSubListMap = new Map<string, Subscriber[]>();
    this.subId = 0;
  }

  publish(event: string, data: T): boolean {
    if (!this.eventSubListMap.has(event)) {
      return false;
    }

    const subList = this.eventSubListMap.get(event)!;
    subList.forEach(sub => {
      sub.handle(event, data);
    });
    return true;
  }

  subscribe(event: string, handle: Function): string {
    if (!this.eventSubListMap.has(event)) {
      this.eventSubListMap.set(event, []);
    }

    const subId = (++this.subId).toString();
    this.eventSubListMap.get(event)!.push(new Subscriber(subId, handle));
    return subId;
  }

  unsubscribe(subId: string): boolean {
    for (const subList of this.eventSubListMap.values()) {
      for (let i = 0; i < subList.length; ++i) {
        if (subId === subList[i].subId) {
          subList.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
}
