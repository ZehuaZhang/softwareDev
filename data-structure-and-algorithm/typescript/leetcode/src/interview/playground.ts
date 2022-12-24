const test1 = async () => {
  const a = 1;

  console.log('main begin', 'a =', a);

  await new Promise(resolve => {
    console.log('promise begin', 'a =', a);
    for (let i = 1; i <= 5; ++i) {
      setTimeout(() => {
        console.log('timeout', 'i =', i);
        if (i === 5) {
          resolve(i);
        }
      }, i * 1000);
    }
    console.log('promise end', 'a =', a);
  }).then(value => {
    console.log('then', 'value =', value);
  });

  console.log('main end', 'a =', a);
};

test1();
