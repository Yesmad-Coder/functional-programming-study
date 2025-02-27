# 1.4 함수형 자바스크립트를 위한 기초

## 1.4.1 일급 함수

자바스크립트에서 함수는 **일급 객체**이자 **일급 함수**다.

여기에서 **일급**은 값으로 다룰 수 있다는 의미로 아래와 같은 조건을 만족해야 한다.

- 변수에 담을 수 있다.
- 함수나 메서드의 인자로 넘길 수 있다.
- 함수나 메서드에서 리턴할 수 있다.

자바스크립트에서 모든 값은 일급이며 모든 객체는 일급 객체이며 **함수는 객체이자 일급 객체**다.


- 아무 때나(런타임에서도) 선언이 가능하다.
- 익명으로 선언할 수 있다.
- 익명으로 선언한 함수도 함수나 메서드의 인자로 넘길 수 있다.

일급함수는 위와 같은 추가적인 조건을 추가적으로 만족하며 아래의 예시들은 일급 함수의 특징을 표현한다.

- 코드 1-39(1) 값으로 다룰 수 있는 함수

```javascript
function f1() {}
var a = typeof f1 == 'function' ? f1 : function() {};
```

위 코드에서 `f1`은 함수를 값으로 다룰 수 있음을 보여준다. `typeof` 연산자를 사용해 `function`인지 확인하고 변수 `a`에 `f1`을 담고 있다.

- 코드 1-39(2) 함수를 반환하는 함수

```javascript
function f2() {
  return function() {}
}
```

`f2` 함수는 함수를 반환한다.

- 코드 1-39(3) 익명 함수 선언과 즉시 실행 가능한 함수

```javascript
(function (a, b) {
  return a + b;
})(10, 5); // 15
```

`a`와 `b`를 더하는 익명 함수를 선언하고 각각 10, 5를 전달하여 함수 선언 후 즉시 실행하고 있다.

- 코드 1-39(4) 익명 함수를 인자로 넘겨 실행하는 함수

```javascript
function callAndAdd(a, b) {
  return a() + b();
}
callAndAdd(function () { return 10; }, function () { return 5; }); // 15
```

`callAndAdd` 함수를 실행하면서 익명 함수를 선언해 바로 인자로 넘겼으며 `callAndAdd` 함수는 인자로 받은 함수를 실행해 결과를 반환한다.

위와 같이 함수는 언제든지 선언할 수 있고 인자로 사용할 수 있다. 또한 인자로 받은 함수를 실행할 수 있으며, 함수를 반환할 수 도 있다.

메서드를 가진 객체와 달리 함수는 자신이 곧 기능이기 때문에 보다 쉽게 참조할 수 있고 전달할 수 있고, 쉽게 실행 가능하다.

## 1.4.2 클로저

함수는 변수 참조 범위를 결정하는 중요한 기준이 된다. 함수가 중첩되어 있다면 스코프 역시 중첩되어 생겨난다.

> 클로저는 자신이 생성될 때의 환경을 기억하는 함수다.

클로저의 정의는 보통 위와 같이 설명되며 실용적으로 표현하자면 아래와 같이 표현할 수 있다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수를 기억하는 함수다.

자바스크립트의 모든 함수는 글로벌 스코프에 선언되거나 함수 안에서 선언된다.

자바스크립트의 모든 함수는 상위 스코프를 가지며 모든 함수는 자신이 정의되는 순간의 실행 컨텍스트 안에 있다.

따라서 자바스크릅트의 모든 함수는 어느 곳에서 생성하든 어떤 방법으로 생성하든 자신이 생성될 때의 환경을 기억할 수 있다.

관점에 따라 모든 함수는 클로저라 해석이 되거나 정의되는 경우도 존재한다.

함수가 진짜 클로저가 되기 위한 가장 중요한 조건은 아래와 같다.

- 코드 1-40 클로저가 되기 위한 가장 중요한 조건

```javascript
function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
}
function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
  }
}
```

`parent`와 `parent2` 내부의 `myfn` 함수에서는 `a`라는 변수를 선언하지 않았지만 사용하고 있다.

`parent`의 변수 `a`는 `myfn`을 생성하는 스코프에서 정의되었고 `parent2`의 변수 `a`는 `myfn`을 생성하는 스코프의 상위 스코프에 정의되었다.

클로저의 정의를 조금 더 정확하게 정의해보면 아래와 같이 표현할 수 있을 것 이다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수 중 언젠가 자신이 실행될 때 사용할 변수들만 기억하여 유지시키는 함수다.

아래의 예제를 통해 클로저에 대해서 더 자세히 확인할 수 있다.

- 코드 1-41

```javascript
var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1(); // 30
```

위의 `f1` 함수는 클로저가 아니다. `f1` 함수는 클로저처럼 외부 변수를 참조해 결과를 반환하게 된다.

하지만 글로벌 스코프에서 선언된 모든 변수는 그 변수를 사용하는 함수가 있는지 없는지와 관계없이 유지된다.

`a`와 `b` 변수가 `f1` 함수에 의해 사라지지 못하는 상황이 아니므로 `f1` 함수는 클로저가 아니다.

웹 브라우저의 경우 함수 내부가 아닐 경우 모두 글로벌 스코프이지만 Node.js와 같은 환경에서는 사용하는 자바스크립트 파일 하나의 스코프는 글로벌 스코프가 아니다.

그러므로 위의 코드가 브라우저가 아닌 Node.js 환경에서 사용할 특정 자바스크립트 파일에 작성되어 있을경우 `f1` 함수는 클로저가 될 수 있다.

- 코드 1-42

```javascript
function f2() {
  var a = 10;
  var b = 20;
  function f3(c, d) {
    return c + d;
  }
  return f3;
}
var f4 = f2();
f4(5, 7); // 12
```

위의 코드 역시 클로저가 아니다. `f3` 함수는 `f2` 함수 안에서 생성되었고 `f3` 함수 바로 위에는 `a`, `b`라는 지역 변수 또한 존재한다.

하지만 `f3` 함수 안에서 사용되는 두 변수는 모두 `f3`안에서 정의되었으며 자신이 생성될 때의 스코프가 알고 있는 변수 `a`, `b`는 사용하지 않았으므로 기억되지 않는다.

- 코드 1-43

```javascript
function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5;
}
f4(); // 30
```

위의 예시는 클로저가 '있었다'라는 표현이 정확하며 결과적으로는 클로저가 없다.

`f4` 함수가 실행되고 `a`, `b`가 할당된 후 `f5` 함수가 정의도니다. 그리고 `f5` 함수에서는 `a`, `b`가 사용되었으므로 `f5` 함수는 클로저가 된다.

하지만 `f4` 함수의 마지막 라인을 보면 `f5` 함수를 실행하여 값을 반환한다.

결국 `f5` 함수를 참조하고 있는 곳이 어디에도 없으므로 `f5` 함수는 사라지고 `a`와 `b` 또한 사라질 수 있기에 클로저는 `f4` 함수가 실행되는 사이에 생겼다 사라진다.

- 코드 1-44

```javascript
function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}
var f8 = f6();
f8(20); // 30
f8(10); // 20
```

위 코드의 `f7`은 클로저다. 위의 코드에서 `a`는 사라지지 않는다.

`f7` 함수가 `a`를 사용하기 때문에 `a`를 기억해야 하고 `f7` 함수가 `f8` 함수에 담겼기 때문에 클로저가 되었다.

> 위의 예제에서도 `f6` 함수의 결과인 `f7`을 `f8`에 담지 않았다면 `f7`은 클로저가 되지 않는다.

`f6` 함수의 실행이 끝났어도 `f7`이 `a`를 기억하는 클로저가 되었기 때문에 `a`는 사라지지 않으며 `f8`을 실행할 때 마다 새로운 변수인 `b`와 함께 사용되어 결과를 생성한다.

- 코드 1-45

```javascript
function f9() {
  var a = 10;
  var f10 = function (c) {
    return a + b + c;
  };
  var b = 20;
  return f10;
}
var f11 = f9();
f11(30); // 60
```

변수 `b`는 함수 `f10`보다 늦게 선언되었지만 `f11(30)`의 실행 결과는 60이다.

위의 예제는 클로저가 기억하고 있는 **자신이 생성될 때**의 범위를 보여주는 예시다.

`f10`이 생성될 시점에는 `b`가 20으로 초기화되지 않았다.

클로저는 자신이 생성되는 스코프의 모든 라인, 어느 곳에서 선언된 변수든지 참조하고 기억할 수 있으며 그것들은 **변수이기 때문에 클로저가 생성된 이후 언제라도 변경될 수 있다**.

다시 한번 클로저를 조금 더 풀어서 정의하면 아래와 같을 것 이다.

> 클로저는 자신이 생성되는 스코프의 실행 컨텍스트에서 만들어졌거나 알 수 있었던 변수 주 언젠가 자신이 실행될 때 사용할 변수들만 기억하는 함수이다. 클로저가 기억하는 변수의 값은 언제든지 남이나 자신에 의해 변경될 수 있다.

<sub id="2021-03-05"><sup>-- 2021-03-05 --</sup></sub>

## 1.4.3 클로저의 실용 사례

클로저에서 은닉은 의미 있는 기술이자 개념이지만 아래와 같이 정말 강력하고 실용적인 상황도 존재한다.

- 이전 상황을 나중에 일어날 상황과 이어 나갈 때
- 함수로 함수를 만들거나 부분 적용을 할 때

'이전 상황을 나중에 일어날 상황과 이어 나갈 때'란 아래와 같은 상황을 의미한다.

이벤트 리스너로 함수를 넘기기 이전에 알 수 있던 상황들을 변수에 담아 클로저로 만들어 기억해 두면, 이벤트가 발생되어 클로저가 실행되었을 때 기억해 두었던 변수들로 이전 상황을 이어갈 수 있다.

콜백 패턴에서도 마찬가지로 콜백으로 함수를 넘기기 이전 상황을 클로저로 만들어 기억해 두는 방식으로 이전의 상황을 이어갈 수 있다.

- 코드 1-46 팔로잉 버튼

아래 예제는 jQuery와 Underscore.js가 있다고 가정했다.

```html
<div class="user-list"></div>
<script>
  var users = [
    { id: 1, name: 'HA', age: 25 },
    { id: 2, name: 'PJ', age: 28 },
    { id: 3, name: 'JE', age: 27 },
  ];
  $('.user-list').append(
    _.map(users, function (user) {
      // (1) 이 함수는 클로저가 아니다.
      var button = $('<button>').text(user.name); // (2)
      button.click(function () {
        // (3) 계속 유지되는 클로저 (내부에서 user를 사용했다.)
        if (confirm(user.name + '님을 팔로잉 하시겠습니까?')) follow(user); // (4)
      });
      return button; // (5)
    })
  );
  function follow(user) {
    $.post('/follow', { user_id: user.id }, function () {
      // (6) 클로저가 되었다가 없어지는 클로저
      alert('이제 ' + user.name + '님의 소식을 보실 수 있습니다.');
    });
  }
</script>
```

3에서 클릭 이벤트를 추가하며 익명 함수를 생성하였고 그 함수는 클로저가 된다.

3에서 클로저를 만들 때의 컨텍스트는 해당 번째의 `user`를 기억하고 있으며 그 `user`는 외부에서 인자로 선언되었고 3의 내부에서 사용하기 때문에 클로저가 되어 기억하고 유지시킨다.

나중에 클릭을 통해 이 클로저가 실행되면 자신이 기억하고 있던 `user`를 이용해 1을 실행했을 때의 흐름을 이어간다.

또한 `follow` 함수는 `user`를 받으며 어떤 버튼을 클릭해도 그에 맞는 `user`가 넘어가며 `$.post`를 실행시키며 콜백 함수로 클로저를 만들어 넘긴다. 이 클로저는 `follow`가 실행되었을 때의 환경을 기억해 콜백 함수가 실행되고 나면 기억하고 있던 `user`를 통해 흐름을 이어 간다.

- 코드 1-47 (1) 흔한 클로저 실수

```javascript
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $('<button>')
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  );
}
$('.user-list').append(buttons);
```

위와 같이 for문을 돌며 click 이벤에 리스너를 등록할 경우 `i++` 떄문에 지역 변수의 갑시 먼저 변해 의도한것과 다르게 동작할 수 있다. 위의 예시는 모든 버튼을 클릭해도 마지막 `user`인 JE만 출력된다.

- 코드 1-47 (2) 절차지향적 해결

```javascript
var buttons = [];
for (var i = 0; i < users.length; i++) {
  (function (user) {
    buttons.push(
      $('<button>')
        .text(user.name)
        .click(function () {
          console.log(user.name);
        })
    );
  })(users[i]);
}
$('.user-list').append(buttons);
```

위의 코드 처럼 다른 함수의 도움을 받아 절차지향적으로 문제를 해결할 수 있다.

- 코드 1-47 (3) 함수적 해결

```javascript
$('.user-list').append(
  _.map(users, function (user) {
    return $('<button>')
      .text(user.name)
      .click(function () {
        console.log(user.name);
      });
  })
);
```

위의 코드는 `_.map` 함수가 `i`가 변할 때마다 `iteratee`를 실행해 항상 새로운 실행 컨텍스트를 만들어 주기 때문에 잘 동작한다.

`_.map`과 같은 함수는 동시성이 생길 만한 상황이더라도, 상태 변화로 인한 부수 효과로부터 자유롭고 편하게 프로그래밍할 수 있도록 해준다.

함수형 프로그래밍은 서로 다른 실행 컨텍스트에 영향을 줄 수 있을 만한 상태 공유나 상태 변화를 만들지 않는 것이 목표에 가깝다.

### 1.4.4 클로저를 많이 사용하라!

클로저는 분명하게도 메모리 누수 같은 위험성을 가지고 있다.

그러나 메모리 누수나 성능 저하의 문제는 클로저의 단점이나 문제가 아니다.

클로저를 조심히 사용하기 보다 정확하게 사용해야하며 사용하다보면 메모리 누수가 일어나지 않는 설계를 깨우치게 될 것이다.

또한 클로저를 사용하다 보면 클로저를 활용한 아름다운 패턴들도 자연스럽게 알게 될 것이다.

<sub id="2021-03-06"><sup>-- 2021-03-06 --</sup></sub>

### 1.4.5 고차 함수

고차 함수란 아래와 같이 함수를 다루는 함수를 말한다.

1. 함수를 인자로 받아 대신 실행하는 함수
2. 함수를 리턴하는 함수
3. 함수를 인자로 받아서 또 다른 함수를 리턴하는 함수

함수를 인자로 받아 대신 실행하는 함수는 앞에서도 만들어 보았던 `_.map`, `_.filter`와 같은 함수다.

- 코드 1-48 함수를 인자로 받아 대신 실행하는 함수

```javascript
function calcWith10(val, func) {
  return func(10, val);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(calcWith10(20, add)); // 30;
console.log(calcWith10(5, sub)); // 5
```

위 코드에서 `add`, `sub` 함수는 함수를 인자로 받고나 리턴하지 않기 때문에 일반 일반 함수이며 `calcWith10` 함수는 함수를 받아 내부에서 대신 실행하므로 고차 함수다.

> 함수형 프로그래밍은 함수에 인자를 언제 어떻게 적용할 것인가, 함수를 인자로 언제 어떻게 적용할 것인가, 인자로 받은 함수를 언제 어디서 평가할 것인가에 대한 이야기다.

`calcWith10` 함수는 고차 함수이자 응용형 함수다. 응용형 함수는 함수를 인자로 받아 내부에서 알고 있는 값을 인자로 받은 함수에 적용하는 식으로 이루어진다.

함수형 프로그래밍은 응용형 함수와 고차 함수들을 만들고, 클로저, 인자 합성 등의 함수 기능을 충분히 활용하여 부분 적용, 함수 합성, 함수를 다르는 함수를 만들어 조합하고 연속적으로 실행하고 응용하며 이해하기 쉬운 좋은 함수로 발전시켜 나간다.

- 코드 1-49 함수를 리턴하는 함수

```javascript
function constant(val) {
  return function () {
    return val;
  };
}
var always10 = constant(10);
console.log(always10()); // 10;
console.log(always10()); // 10;
console.log(always10()); // 10;
```

`constant` 함수는 실행 당시 받았던 10이라는 값을 받아 내부에서 익명 함수를 클로저로 만들어 `val`을 기억하게 만든후 반환한다.

반환된 함수에는 `always10`이라는 이름을 지어 사용하였으며 `always10` 함수는 항상 10을 반환한다.

`constant` 함수처럼 함수를 반환하는 함수도 고차 함수다.

- 코드 1-50 함수를 대신 실행하는 함수를 리턴하는 함수

```javascript
function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}
var callWith10 = callWith(10);
console.log(callWith10(20, add)); // 30
var callWith5 = callWith(5);
console.log(callWith5(5, sub)); // 0
```

`callWith` 함수는 `val1`을 받아 `val1`을 기억하는 함수를 반환한다.

반환된 함수는 이후에 `val2`과 `func`를 받아 대신 `func` 함수를 실행한다.

`callWith` 함수에 10을 넣어 `callWith10` 함수를 만들 수 있고 5를 넣어 `callWith5`를 만들 수도 있다.

또한 함수를 반환하는 함수를 사용할 경우 아래와 같이 변수에 담지 않고 바로 실행할 수 있다.

- 코드 1-51 괄호 두번

```javascript
console.log(callWith(30)(20, add)); // 50
console.log(callWith(20)(20, sub)); // 0
```

`callWith10` 함수가 아닌 `callWith` 함수가 되어 또 다르게 함수를 사용할 수 있는 가능성이 생겼다.

아래 코드와 같이 숫자가 아닌 값 또한 활용이 가능하다.

- 코드 1-52 `callWith` 활용

```javascript
console.log(
  callWith([1, 2, 3])(function (v) {
    return v * 10;
  }, _.map)
); // [10, 20, 30]
_.get = function (list, idx) {
  return list[idx];
};
var callWithUsers = callWith([
  { id: 2, name: 'HA', age: 25 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
]);
console.log(callWithUsers(2, _.get)); // { id: 5, name: "JE", age: 27 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.find)
); // { id: 4, name: "PJ", age: 28 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.filter)
); // [ { id: 4, name: "PJ'"" age: 28 }, { id: 5, name: "JE", age: 27 } ]
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.some)
); // true
console.log(
  callWithUsers(function (user) {
    console.log(user);
    return user.age > 25;
  }, _.every)
); // false
```

위의 코드에서는 변수 선언 대신 함수의 요소 중 하나인 인자를 활용해 더 많은 가능성을 열었다.

<sub id="2021-03-09"><sup>-- 2021-03-09 --</sup></sub>

### 1.4.6 콜백 함수라 잘못 불리는 보조 함수

콜백 함수를 받아 자신이 해야 할 일을 모두 끝낸 후 결과를 되돌려 주는 함수도 고차 함수다.

콜백 패턴은 클로저 등과 함께 사용할 수 있는 매우 강력한 표현이자 비동기 프로그래밍에 있어 없어서는 안 될 매우 중요한 패턴이다.

콜백 패턴은 끝이 나면 컨텍스트를 다시 돌려주는 단순한 협업 로직을 갖는다.

컨텍스트를 다시 돌려주는 역할을 가졌기 때문에 callback이라고 함수 이름을 지은 것 이다.

하지만 인자로 사용된 모든 함수 또는 익명 함수가 넘겨지고 있는 모양을 모두 콜백 함수라고 칭하는 경향이 있다.

콜백 함수는 반드시 익명 함수일 필요가 없으며 익명 함수가 넘어가는 모양을 가졌다고 반드시 콜백 함수는 아니다.

`button.click(function () {})`과 같은 코드의 익명 함수도 콜백 함수라고 많이 표현되지만 이 익명 함수는 **이벤트 리스너**라고 칭하는 것이 적합하다.

함수가 고차 함수에서 쓰이는 역할의 이름으로 함수를 불러주면 된다.

모든 익명 함수를 콜백 함수라고 부르지 않고 역할에 가장 맞는 이름이 있는 것이 좋다.

### 1.4.7 함수를 리턴하는 함수와 부분 적용

`addmaker`, `bvalue`, `bmatch`, `callWith`와 같은 함수들은 약속된 개수의 인자를 미리 받아 둔다.

그 후 클로저로 만들어진 함수가 추가적으로 인자를 받아 로직을 완성해 나가는 패턴을 갖는다.

이와 유사항 기법들로 `bind`, `curry`, `partial` 등이 있다.

이런 기법들을 통틀어 칭하는 특별한 용어는 없지만 아래와 같은 공통점이 있다.

> '기억하는 인자 혹은 변수가 있는 클로저'를 반환한다.

`bind`의 경우 인자보다는 주로 함수 안에서 사용될 `this`를 적용해 두는데 많이 사용한다.

- 코드 1-53 `bind`

```javascript
function add(a, b) {
  return a + b;
}
var add10 = add.bind(null, 10);
add10(20); // 30
```

`bind` 함수는 첫 번쨰 인자로 `bind`가 리턴할 함수에서 사용될 `this`를 받으며 두 번째 인자부터 함수에 미리 적용될 인자들이다.

`add10`과 같이 `this`를 사용하지 않는 함수이면서 왼쪽에서부터 순서대로 인자를 적용하면 되는 상황에서는 원하는 결과를 얻을 수 있다.

`bind`의 아쉬운 점은 인자를 왼쪽에서부터 순서대로만 적용할 수 있다는 점과 `bind`를 한 번 실행항 함수의 `this`는 앞으로 바꿀 수 없다는 점이다.

많은 자바스크립트 개발자들이 `bind`에서 `this`가 제외된 버전의 `curry`를 만들어 좀 더 간결한 코드를 제한했다.

구현체 중 하나인 Lodash의 `_.curry` 함수는 인자가 모두 채워질 때 까지 실행이 되지 않다 인자가 모두 채워지는 시점에 실행된다.

`_.curry`는 `bind`와 달리 `this`를 사용하지 않아 좀 더 간결하게 코드를 작성할 수 있으며 이후에 `this`를 적용할 수 있다.

그러나 커링은 인자의 수나 형태가 명확하게 정해지지 않은 함수와는 잘 맞지 않는다.

`_.curry`는 옵션으로 함수를 실행시킬 최소 인자 개수를 받지만 숫자만으로 제어해야 하므로 조심히 다루어야 한다.

`bind` 함수는 왼쪽에서부터 원하는 만큼의 인자를 지정할 수 있지만 원하는 인자를 비워 적용할 수는 없다.

이 단점을 보완한 방식이 "자바스크립트 닌자비급"에서 존 레식이 소개한 `partial` 이다.

<sub id="2021-03-13"><sup>-- 2021-03-13 --</sup></sub>

- 코드 1-54 존 레식의 `partial`

```javascript
Function.prototype.partial = function () {
  var fn = this,
    args = Array.prototype.slice.call(arguments);
  return function () {
    var arg = 0;
    for (let i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) args[i] = arguments[arg++];
    }
    return fn.apply(this, args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac = abc.partial(undefined, 'b', undefined);
ac('a', 'c'); // a b c
```

`partial` 함수는 함수의 인자로 `undefined`를 사용하고 싶은 경우 `undefined`가 인자를 비워 두기 위한 구분자로 사용되어 `undefined`를 미리 적용할 방법이 없다.

또한 초기에 `partial`을 실행할 때 나중에 실제로 실행될 함수에서 사용할 인자의 개수만큼 꼭 미리 채워 실행해야 한다.

- 코드 1-55 `partial`에 인자를 채우지 않았을 경우

```javascript
var ac2 = abc.partial(undefined, 'b');
ac2('a', 'c'); // a c undefined
```

만약 인자의 개수를 맞춰 미리 채우지 않았다면 위와 같이 동작한다.

`partial`이 가진 제약은 자바스크립트의 유연함을 반영하지 못한다는 점에서 아쉽다.

만약 `add` 함수가 아래와 같이 구현되어 있으면 `partial`과는 합이 더욱 맞지 않는다.

- 코드 1-56 `partial`과 합이 안맞는 `add` 함수

```javascript
function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

add(1, 2, 3, 4, 5); // 15
var add2 = add.partial(undefined, 2);
add2(1, 3, 4, 5); // 3
var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
add3(1, 2, 4, 5); // 15
add3(50, 50, 50, 50); // 15
add3(100, 100, 100, 100); // 15
```
위 코드에서 `add2` 함수는 3, 4, 5 인자를 무시하게 되며 `add3` 함수는 1, 2, 4, 5를 모두 사용할 수 있게 되지만 코드가 깔끔하지 못하며 `partial` 이후에는 4개 이상의 인자를 사용할 수 없다.

결정적으로는 존 레식이 만든 `partial` 함수는 재사용이 사실상 불가능하다.

한번 `partial` 함수를 통해 만들어진 함수를 실행하고 나면 클로저로 생성된 `args`의 상태를 직접 변경하기 때문에, 다음번에 다시 실행해도 같은 `args`를 바라보고 이전에 적용된 인자가 남는다.

아래와 같이 약간의 코드만 변경하면 두 번 이상 실행해도 정상적으로 동작한다.

- 코드 1-57 실수 고치기

```javascript
Function.prototype.partial = function () {
  var fn = this,
    _args = arguments;
  return function () {
    var args = Array.prototype.slice.call(_args);
    var arg = 0;
    for (let i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) args[i] = arguments[arg++];
    }
    return fn.apply(this, args);
  };
};

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
add3(1, 2, 4, 5); // 15
add3(50, 50, 50, 50); // 203
add3(10, 20, 30, 40); // 103
```

클로저가 기억하는 변수도 변수이며 값은 변할 수 있으며 이처럼 상태를 변경하는 코드는 위험하다.

더 함수적인 프로그래밍을 하면 위와 같은 실수를 최소화 할 수 있다.

Underscore.js의 `_.partial` 함수는 앞서 소개된 `partial` 함수의 아쉬운 점들이 해결된 부분 적용 함수다.

이 함수들은 라이브러리 내부의 많은 다른 함수들과 코드를 공유하고 있어 복잡하므로 코드 내부가 아닌 동작을 확인한다.

- 코드 1-58 Underscore.js의 `_.partial`

```javascript
var ac = _.partial(abc, _, 'b');
ac('a', 'c'); // a b c
var b = _.partial(abc, 'a', _, 'c');
b('b'); // a b c
var ab = _.partial(abc, _, _, 'c');
ab('a', 'b'); // a b c
var add2 = _.partial(add, _, 2);
add2(1, 3, 4, 5); // 15
add2(3, 5); // 10

function equal(a, b) {
  return a === b;
}

var isUndefined = _.partial(equal, undefined);
isUndefined(undefined); // true

var bj = {
  name: 'BJ',
  greet: _.partial(
    function (a, b) {
      return a + this.name + b;
    },
    '저는 ',
    '입니다.'
  ),
};
console.log(bj.greet()); // 저는 BJ입니다.
console.log(bj.greet.call({ name: 'HA' })); // 저는 HA입니다.
var greetPj = bj.greet.bind({ name: 'PJ' });
console.log(greetPj()); // 저는 PJ입니다.
console.log(bj.greet()); // 저는 BJ입니다.
```

`_.partial`은 적용해 둘 인자를 비워둘 인자를 구분자로 `_`를 사용한다.

`_`는 자바스크렙트에서 사용하는 일반 값이 아니므로 구분자로 사용하기 더 적합하며 표현력도 좋다.

모든 인자의 자리를 미리 확보해 두지 않아도 되며 실행할 때 인자를 많이 사용하든 적게 사용하든 모두 잘 동작한다.

또한 `bind`와 달리 `this`를 적용해 두지 않았으므로 메서드로도 사용이 가능하다.

<sub id="2021-03-14"><sup>-- 2021-03-14 --</sup></sub>

[[이전으로]](../chapter1-3/README.md) / [[목록으로]](../README.md) / [[다음으로]](../../chapter2/chapter2-1/README.md)