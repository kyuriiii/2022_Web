// page15 - 전개연산자
let array1 = [ 'one', 'two' ];
let array2 = [ 'three', 'four' ];

let combined5 = [...array1, ...array2];
let combined6 = [ 'zero', ...array2, 'plus', ...array1 ];

// page16 - 전개연산자
let obj1 = { one: 1, two: 2, other: 0 };
let obj2 = { three: 3, four: 4, other: -1 };

let combined = {
    ...obj1,
    ...obj2
};
combined = {
    ...obj2,
    ...obj1
};

let {other, ...others} = combined;
console.log( "other : ", other );
console.log( "others : ", others );