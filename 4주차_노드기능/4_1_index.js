const { odd, even } = require( "./4_1_var");
const checkNumber = require( "./4_1_func" );

function checkStringOddOrEven(str) {
    if ( str.length % 2 ){
        return odd;
    }
    return even;
}
console.log( checkNumber(10) );
console.log(checkStringOddOrEven('hello'));