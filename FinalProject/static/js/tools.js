
export function error( title, text ){
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
        });
}

export function confirm( title, text ){
    return new Promise( (resolve, reject) => {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            cancelButtonColor: '#d33',
        }).then((result) => {
            if ( result.isConfirmed ){ resolve( true ); }
        })
    });
}

export function success( title, cb = ()=>{} ){
    Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1000
    }).then(()=>{ cb() });
}

export function success_with_text( title, text ){
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
    });
}

export function warning( title, text ) {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: text
    }); 
}