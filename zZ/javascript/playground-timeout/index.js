// (function (t) {
//     global.setTimeout =
//         (callback, timeout) => {
//             console.log('hi')
//             t.call(this, callback, timeout);
//         }
// }(global.setTimeout));

const a = global.setTimeout;
global.setTimeout =
    (callback, timeout) => {
        console.log('hwai')
        a(callback, timeout);
    }

global.setTimeout(() => {
}, 1000);

// console.log(global.setTimeout)