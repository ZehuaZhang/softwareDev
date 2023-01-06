import {isFunction, Nullable} from '../util/object';

enum States {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

type ResolveFn<T> = (value: Nullable<T>) => MyPromise<unknown> | unknown;
type RejectFn<T> = (reason: Nullable<T>) => MyPromise<unknown> | unknown;

type ResolveLikeFn<T> = ResolveFn<T> | T;
type RejectLikeFn<T> = RejectFn<T> | T;

class MyPromise<T> {
  private status: States;
  private value: Nullable<T>;
  private reason: Nullable<unknown>;
  private resolveFnList: ResolveFn<T>[];
  private rejectFnList: RejectFn<unknown>[];
  constructor(
    executor: (resolve: ResolveFn<T>, reject: RejectFn<unknown>) => void
  ) {
    this.status = States.PENDING;
    this.value = null;
    this.reason = null;
    this.resolveFnList = [];
    this.rejectFnList = [];

    const resolve = (value: Nullable<T>) => {
      if (this.status !== States.PENDING) {
        return;
      }
      this.status = States.RESOLVED;
      this.value = value;

      this.resolveFnList.forEach(resolveFn => {
        resolveFn(this.value);
      });
    };

    const reject = (reason: unknown) => {
      if (this.status !== States.PENDING) {
        return;
      }
      this.status = States.REJECTED;
      this.reason = reason;

      this.rejectFnList.forEach(rejectFn => {
        rejectFn(this.reason);
      });
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  catch(rejectFn: RejectLikeFn<unknown>) {
    return this.then(() => {}, rejectFn);
  }

  then(resolveFn: ResolveLikeFn<T>, rejectFn: RejectLikeFn<unknown>) {
    // If the two arguments passed in are not functions, the result is returned directly

    if (!isFunction(resolveFn)) {
      resolveFn = value => {
        return value;
      };
    }

    if (!isFunction(rejectFn)) {
      rejectFn = (reason: unknown) => {
        return MyPromise.reject(reason);
      };
    }

    return new MyPromise((nxtResolveFn, nxtRejectFn) => {
      this.resolveFnList.push(value => {
        try {
          const nxtValue = (resolveFn as ResolveFn<T>)(value);

          if (nxtValue instanceof MyPromise) {
            nxtValue.then(nxtResolveFn, nxtRejectFn);
          } else {
            nxtResolveFn(nxtValue);
          }
        } catch (err) {
          nxtRejectFn(err);
        }
      });

      this.rejectFnList.push(reason => {
        try {
          const nxtValue = (rejectFn as RejectFn<unknown>)(reason);

          if (nxtValue instanceof MyPromise) {
            nxtValue.then(nxtResolveFn, nxtRejectFn);
          } else {
            nxtResolveFn(nxtValue);
          }
        } catch (err) {
          nxtRejectFn(err);
        }
      });
    });
  }

  finally(finalFn: ResolveFn<void> | RejectFn<void>) {
    return this.then(
      value =>
        MyPromise.resolve(finalFn()).then(
          () => value,
          () => {}
        ),
      (reason: unknown) =>
        MyPromise.reject(finalFn()).then(
          () => {},
          () => reason
        )
    );
  }

  static resolve(value: unknown) {
    return new MyPromise(resolveFn => {
      resolveFn(value);
    });
  }

  static reject(reason: unknown) {
    return new MyPromise((_, rejectFn) => {
      rejectFn(reason);
    });
  }
}
