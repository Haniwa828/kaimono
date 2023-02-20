// 支払い金額助言設置用関数
const advice_area_put = (parent) => {
    // 大枠
    const advice_detail = addDetails(parent, 'advice_detail', ['advice_area'], (t) => {
        t.id = 'advice_area'; // 項目追加用
        addSummary(t, 'おすすめ支払額');
    })

    addTable(advice_detail, '1', ['advice_table'], (t) => {
        t.id = 'advice_table';
        addTr(t, [], (tt) => {
            addTh(tt, 'お釣り');
            addTh(tt, '支払金額');
        })
    })
}

// 値段比較用関数
const advice_func_calcPrice = (price) => {
    const advice_detail = document.getElementById('advice_area');
    const advice_table = document.getElementById('advice_table');
    const advices = document.getElementsByClassName('advice_advice');
    const digit = price.toString().length;
    let data = []; // 空リスト

    // 算出
    // 一桁の場合
    if(digit == 1 && price > 4){
        const pay = price + 5;

        const result = {'change': 5, 'pay': pay};
        data.push(result); 
    }
    for(let i = 0; i < digit; i++){
        const ten = 10**i;
        const rem = price%ten;
        const rem_top = String(rem)[0];

        if(rem_top > 4){
            const pay = price + 5*(10**(i - 1));

            const result = {'change': 5*10**(i - 1), 'pay': pay};
            data.push(result); 
        }
    }

    // console.log(advices.length)
    // for(let i = 0; i < advices.length; i++){
    //     console.log(i)
    //     advices[i].remove();
    // }

    advice_table.remove();
    addTable(advice_detail, '1', ['advice_table'], (t) => {
        t.id = 'advice_table';
        addTr(t, [], (tt) => {
            addTh(tt, 'お釣り');
            addTh(tt, '支払金額');
        })
        for(let i = 0; i < data.length; i++){
            addTr(t, ['advice_advice'], (tt) => {
                addTd(tt, data[i].change);
                addTd(tt, data[i].pay);
            })
        }
    })
}