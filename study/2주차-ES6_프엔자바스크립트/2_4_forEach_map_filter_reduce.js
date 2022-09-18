/*
// page21 - forEach()
const nums = [ 40, 50, 128, 905, 77 ];

nums.forEach( function( value, index, array ){
    console.log( `${index}번째 요소 : ${value}` );
});
nums.forEach( ( value, index ) => {
    console.log( `${index}번째 요소 : ${value}` );
});
nums.forEach( ( value ) => console.log( value ) );
*/
/*
// page23 - map()
const nums = [1,2,3,4,5];

const processed = nums.map( (num) => num * num );
console.log( processed );
*/
/*
// page24 - filter()
const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const eventNums = nums.filter( (num) => num % 2 === 0 );
console.log( eventNums );
*/
// page25 - reduce()
const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const sum = nums.reduce( (total, num) => total + num, 0 );
console.log( sum );