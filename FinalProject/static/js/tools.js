
export function error( title, text ){
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
        });
}

export function confirm( title, text, success=()=>{}, fail=()=>{} ){
    Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        showCancelButton: true,
        confirmButonClass: "btn-danger",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        closeOnConfirm: false,
        closeOnCancel:  true
    }, function ( isConfirm ){
        if ( isConfirm ) success();
        else fail();
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