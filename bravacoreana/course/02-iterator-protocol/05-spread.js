log("🔸 << 05. spread >> 🔸");

// 전개연산자도 이터러블-이터레이터 프로토콜을 따른다.

const a = [1, 2];
log([...a, ...[3, 4]]); // 하나의 array가 됨

// a[Symbol.iterator] = null;
log([...a, ...[3, 4]]); // TypeError: a is not iterable ====> // * #1
log([...a, ...arr, ...set, ...map]); // [1, 2, 1, 2, 3, 1, 2, 3, Array(2), Array(2), Array(2)]
log([...a, ...arr, ...set, ...map.values()]);
log([...a, ...arr, ...set, ...map.keys()]);

// * #1.

// a[Symbol.iterator] = null;
// log([...a, ...[3, 4]]);

// typeError를 통해 전개연산자도 이터러블 프로토콜을 따르고 있는 값들을 펼칠 수 있는 것

// =============================
