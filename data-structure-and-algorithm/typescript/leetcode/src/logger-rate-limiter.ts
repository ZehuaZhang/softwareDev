/*
359. Logger Rate Limiter

Design a logger system that receive stream of messages along with its timestamps, each message should be printed if and only if it is not printed in the last 10 seconds.

Given a message and a timestamp (in seconds granularity), return true if the message should be printed in the given timestamp, otherwise returns false.

It is possible that several messages arrive roughly at the same time.

Example:

Logger logger = new Logger();

// logging string "foo" at timestamp 1
logger.shouldPrintMessage(1, "foo"); returns true;

// logging string "bar" at timestamp 2
logger.shouldPrintMessage(2,"bar"); returns true;

// logging string "foo" at timestamp 3
logger.shouldPrintMessage(3,"foo"); returns false;

// logging string "bar" at timestamp 8
logger.shouldPrintMessage(8,"bar"); returns false;

// logging string "foo" at timestamp 10
logger.shouldPrintMessage(10,"foo"); returns false;

// logging string "foo" at timestamp 11
logger.shouldPrintMessage(11,"foo"); returns true;
*/

import {Queue} from './data-structure/Queue';

class Logger {
  private queue: Queue<[number, string]>;
  private printedSet: Set<string>;

  constructor() {
    this.queue = new Queue<[number, string]>();
    this.printedSet = new Set<string>();
  }

  /** Returns true if the message should be printed in the given timestamp, otherwise returns false. The timestamp is in seconds granularity. */
  shouldPrintMessage(timestamp: number, message: string): boolean {
    while (!this.queue.isEmpty() && this.queue.front()[0] <= timestamp - 10) {
      this.printedSet.delete(this.queue.front()[1]);
      this.queue.pop();
    }
    if (this.printedSet.has(message)) {
      return false;
    }
    this.queue.push([timestamp, message]);
    this.printedSet.add(message);
    return true;
  }
}

const logger = new Logger();

// logging string "foo" at timestamp 1
console.log(logger.shouldPrintMessage(1, 'foo'));

// logging string "bar" at timestamp 2
console.log(logger.shouldPrintMessage(2, 'bar'));

// logging string "foo" at timestamp 3
console.log(logger.shouldPrintMessage(3, 'foo'));

// logging string "bar" at timestamp 8
console.log(logger.shouldPrintMessage(8, 'bar'));

// logging string "foo" at timestamp 10
console.log(logger.shouldPrintMessage(10, 'foo'));

// logging string "foo" at timestamp 11
console.log(logger.shouldPrintMessage(11, 'foo'));
