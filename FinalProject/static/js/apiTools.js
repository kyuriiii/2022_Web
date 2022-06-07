import {error} from "/static/js/tools.js";

export default class API {
    getInfo( url, cb ){
        fetch(url, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            if (typeof response === 'object' || response !== null) return response.json();
            else return response;
        })
        .then(( data ) => {
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            if ( data != null ) cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }

    postFile( url, object, cb ){        
        fetch(url, {
            method: "POST",
            body: object
        })
        .then((response) => {
            if (typeof response === 'object') return response.json();
            else return response;
        })
        .then(( data ) => {          
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }

    postInfo( url, object, cb ){        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify( object )
        })
        .then((response) => {
            if (typeof response === 'object') return response.json();
            else return response;
        })
        .then(( data ) => {         
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }

    patchInfo( url, object, cb ){
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( object )
        })
        .then((response) => {
            if (typeof response === 'object') return response.json();
            else return response;
        })
        .then(( data ) => {
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }

    deleteInfo( url, cb ){
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (typeof response === 'object') return response.json();
            else return response;
        })
        .then(( data ) => {
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }

    deleteInfoObj( url, object, cb ){
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( object )
        })
        .then((response) => {
            if (typeof response === 'object') return response.json();
            else return response;
        })
        .then(( data ) => {
            if ( data["msg"] != null ) throw new Error( data["msg"] );
            cb( data );
        })
        .catch((err) => { error( "ERROR", err ); });
    }
}