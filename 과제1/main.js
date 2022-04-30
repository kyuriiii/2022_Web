async function form_submit( obj ) {
    // 여러 개의 제품들 중 개수를 입력하고 "담기"를 누를 시 실행되는 함수
    obj.preventDefault;
    const product = obj.parentNode.product.value;
    const number = obj.parentNode.number.value;

    if (number == 0) return alert('1개 이상 담아주세요.');
    
    try {
        // 제품명과 담을 개수를 보낸다.
        await axios.post('/heart', {product: product, number: number} );
    }  catch ( err ) { };
    
    alert( "찜 성공!" );
    obj.parentNode.number.value = 0;
}