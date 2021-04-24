log("🔸 << 01. basic >> 🔸");
// > 고차 함수 예제 1-1: 함수를 인자로 받아서 실행하는 함수

const apply1 = (f) => f(1); // f라는 함수를 인자로 받아서 실행 -> 고차 함수
const add2 = (a) => a + 2;

log(apply1(add2));
// 3
log(apply1((a) => a - 1));
// 0

// > 고차 함수 예제 1-2: 함수를 인자로 받아서 실행하는 함수 (applicative programming)

const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(log, 3);
// 0
// 1
// 2
times((a) => log(a + 10), 3);
// 10
// 11
// 12

// > 고차 함수 예제 2-1: 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

const addMaker = (a) => (b) => a + b;
const add10 = addMaker(10);
log(addMaker(10));
// (b) => a + b
log(add10(5));
// 15
