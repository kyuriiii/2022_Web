const fetchData = new Promise( (resolve, reject) => {
    setTimeout(() => resolve('Carrot'), 1000);
});

fetchData
.then( data => data + ' Cheese' )
.then( data => data + ' Cake' )
.then( data => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => resolve( data + '!' ), 1000 );
    })
})
.then( data => console.log( data ) )
.catch( error => { console.log( error ); } );