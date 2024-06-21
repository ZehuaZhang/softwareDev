function debounce(func, wait) {
  let handler = null;

  return function (...args) {
    clearTimeout(handler);
    handler = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function debounceOpt(func, wait, option = {leading: false, trailing: true}) {
  let handler = null;

  return function (...args) {
    let isInvoked = false;
    if (handler === null && option.leading) {
      func.apply(this, args);
      isInvoked = true;
    }

    clearTimeout(handler);
    handler = setTimeout(() => {
      if (option.trailing && !isInvoked) {
        func.apply(this, args);
      }
      handler = null;
    }, wait);
  };
}

function throttle(func, wait) {
  let waiting = false;
  let lastArgs = null;

  function startCooling() {
    setTimeout(() => {
      if (lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
        startCooling(); // (2) - re-ignite timer
      } else {
        waiting = false;
      }
    }, wait);
  }

  return function (...args) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;
      startCooling.call(this); // (1) - add call to pass this to timer
    } else {
      lastArgs = args;
    }
  };
}

function throttleOpt(func, wait, option = {leading: true, trailing: true}) {
  const {leading, trailing} = option;
  let lastArgs = null;
  let timer = null;

  const setTimer = () => {
    if (lastArgs && trailing) {
      func.apply(this, lastArgs);
      lastArgs = null;
      timer = setTimeout(setTimer, wait);
    } else {
      timer = null;
    }
  };

  return function (...args) {
    if (!timer) {
      if (leading) {
        func.apply(this, args);
      }
      timer = setTimeout(setTimer, wait);
    } else {
      lastArgs = args;
    }
  };
}

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(value) {
    if (this.state !== 'pending') return;

    this.state = 'fulfilled';
    this.result = value;

    queueMicrotask(() => {
      if (this.onFulfilled === undefined) return;

      try {
        const returnValue = this.onFulfilled(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  _reject(error) {
    if (this.state !== 'pending') return;

    this.state = 'rejected';
    this.result = error;

    queueMicrotask(() => {
      if (this.onRejected === undefined) return;

      try {
        const returnValue = this.onRejected(this.result);
        const isReturnValuePromise = returnValue instanceof MyPromise;

        if (!isReturnValuePromise) {
          this.thenPromiseResolve(returnValue);
        } else {
          returnValue.then(this.thenPromiseResolve, this.thenPromiseReject);
        }
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  then(onFulfilled, onRejected) {
    // Register consuming functions.
    const isOnFulfilledFunction = typeof onFulfilled === 'function';
    this.onFulfilled = isOnFulfilledFunction ? onFulfilled : value => value;

    const isOnRejectedFunction = typeof onRejected === 'function';
    this.onRejected = isOnRejectedFunction
      ? onRejected
      : error => {
          throw error;
        };

    return new MyPromise((resolve, reject) => {
      // Register `resolve` and `reject`, so that we can
      // resolve or reject this promise in `_resolve`
      // or `_reject`.
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    const isValuePromise = value instanceof MyPromise;

    if (isValuePromise) {
      return value;
    }

    return new MyPromise(resolve => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }
}
