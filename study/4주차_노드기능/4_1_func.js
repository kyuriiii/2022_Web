const { odd, even } = require( "./4_1_var");

function cehckOddOrEven(num) {
    if ( num % 2 ){
        return odd;
    }
    return even;
}

module.exports = cehckOddOrEven;