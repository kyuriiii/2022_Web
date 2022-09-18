
/*// page17 - 구조분해 할당
let lists = [ 'apple', 'mango' ];
[item1, item2, item3 = 'grepe'] = lists;
console.log( item1, item2, item3);

let x = 1, y = 3;
[x,y] = [y,x];
console.log( x,y );

// page18 - 구조분해 할당 - 나머지 연산자
let a, b, rest;
[a, b] = [10, 20];
console.log( a );
console.log( b );

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);
console.log(b);
console.log(rest);
*/

// page19 - 구조분해 할당 - 객체 구조 분해
let objs = {
    key1: 'one',
    key2: 'two'
};
let { key1: newKey1, key2, key3 = 'default_key3_value' } = objs;

let { a, b } = { a: 10, b: 20 };
console.log( a );
console.log( b );

let { c, d, ...rest } = { c: 30, d: 40, e: 50, f: 60 };
console.log( c );
console.log( d );
console.log( rest );