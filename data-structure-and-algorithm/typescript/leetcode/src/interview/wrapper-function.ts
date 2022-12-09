// canOnlyDoOnce = once(doSomething);
// canOnlyDoOnce();  // do something
// canOnlyDoOnce();  // no-op
// canOnlyDoOnce();  // no-op

const once = (doSomething: Function) => {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      doSomething();
    }
  };
};

// rate limit with time interval

const rateLimit = (doSomething: Function, timeout: number) => {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      doSomething();
      setTimeout(() => (done = false), timeout);
    }
  };
};

// fullfill requests later instead of rate limits with time interval
import {Queue} from '../data-structure/Queue';

const queueRequests = (doSomething: Function, timeout: number) => {
  let done = false;
  const queue = new Queue();
  return function () {
    queue.push(doSomething);
    if (!done && !queue.isEmpty()) {
      done = true;
      const handler = queue.pop();
      handler();
      setTimeout(() => (done = false), timeout);
    }
  };
};
