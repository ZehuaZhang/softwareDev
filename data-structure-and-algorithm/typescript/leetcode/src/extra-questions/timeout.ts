/*
window.setTimeout() could be used to schedule some task in the future.

Could you implement clearAllTimeout() to clear all the timers ? This might be useful when we want to clear things up before page transition.

For example


setTimeout(func1, 10000)
setTimeout(func2, 10000)
setTimeout(func3, 10000)

// all 3 functions are scheduled 10 seconds later
clearAllTimeout()

// all scheduled tasks are cancelled.
note

You need to keep the interface of window.setTimeout and window.clearTimeout the same, but you could replace them with new logic
*/

let window: any;

const [orgSetTimeout, orgClearTimeout] = [
  window.setTimeout,
  window.clearTimeout,
];

const timeoutSet = new Set<number>();

window.setTimeout = (handle: Function, timeout: number, ...args: any[]) => {
  const id = orgSetTimeout(() => {
    handle(...args);
    timeoutSet.delete(id);
  }, timeout);
  timeoutSet.add(id);
  return id;
};

window.clearTimeout = (id: number) => {
  timeoutSet.delete(id);
  orgClearTimeout(id);
};

window.clearAllTimeout = () => {
  for (const id of timeoutSet) {
    window.clearTimeout(id);
  }
};
