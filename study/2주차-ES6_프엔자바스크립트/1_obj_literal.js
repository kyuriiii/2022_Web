/*
// page 8 - 객체 literal의 약식 표기법 - property 정의
let name = 'Park';
let age = 20;
let place = { city: 'Seoul', country: 'Korea' };

let person = {
    name: name,
    age: age,
    place: place
};
console.log( person );

let person2 = {
    name,
    age,
    place,
}
console.log( person2 );
*/

/*
// page 10 - 객체 literal의 약식 표기법 - method 정의
let robot = {
    name: 'smarty',
    say: function( word ){
        console.log( word );
        console.log( `저는 ${this.name} 예요.` );
    }
}

let robot2 = {
    name: 'smarty2',
    say(word) {
        console.log( word );
        console.log( `저는 ${this.name} 예요.` );
    }
};

robot.say( '안녕하세요?' );
robot2.say( '안녕하세요?' );
*/


// page 11 - 객체 literal - 계산된 Property명
let i = 0;
let a = {
    ['foo' + ++i]: i,
    ['foo' + ++i]: i,
    ['foo' + ++i]: i,
};
console.log( a.foo1 );
console.log( a.foo2 );
console.log( a.foo3 );

let param = 'size';
let config = {
    [param]: 12,
    ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};
console.log( config );