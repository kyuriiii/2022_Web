async function getHeart() { // 로딩 시 찜 목록을 가져오는 함수
    try {
      const res = await axios.get('/heart');
      const hearts = res.data;
      const list = document.getElementById('heartList');
      list.innerHTML = "";

      // 가져온 찜 목록을 map으로 돌면서 확인한다.
      Object.keys(hearts).map(function (key){
            // 아래 createElement로 만들어지는 태그는 main.html에서 보여지는 것과 동일하게 보여지기 위해서 사용된다.
            const div = document.createElement("div");
            div.className = "item";

            const div2 = document.createElement("div");
            div2.style = "width:90%; justify-content: center; border: 1px solid #000000;";
            
            const div3 = document.createElement("div");
            const img = document.createElement("img");
            img.src = `./img/${key}.jpg`;
            img.className = "itemimg";
            div3.appendChild(img);

            const span = document.createElement("span");
            span.textContent = `${hearts[key]} 개`;

            const edit = document.createElement("button");
            edit.textContent = "수정";
            edit.addEventListener( 'click', async() => {
                // 수정 시 몇 개를 찜할지 입력을 받고, 숫자를 입력했을 경우 개수가 업데이트 되어 출력된다.
                const number = prompt('몇 개를 찜할지 입력하세요.');
                if ( number != parseInt(number) || number < 1 ) return alert( '올바른 숫자를 입력하십시오.' );

                try {
                    await axios.put( '/heart/' + key, {number} );
                    getHeart();
                } catch( err ) {
                    console.error( err );
                }
            });

            const remove = document.createElement("button");
            remove.textContent = "삭제";
            remove.addEventListener( 'click', async() => {
                // 삭제를 누르면 찜 목록에서 삭제를 누른 제품이 사라지게끔 업데이트 되어 출력된다.
                try {
                    await axios.delete( '/heart/' + key);
                    getHeart();
                } catch( err ) {
                    console.error( err );
                }
            });
            
            div2.appendChild(div3);
            div2.appendChild(span);
            div2.appendChild(edit);
            div2.appendChild(remove);
            div.appendChild(div2);
            list.appendChild(div);
            console.log(res.data);
      });

    } catch (err) {
        console.error(err);
    }
}  
window.onload = getHeart;