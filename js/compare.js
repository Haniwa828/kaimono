// 値段比較設置用関数
const compare_area_put = (parent) => {
    // 大枠
    const compare_detail = addDetails(parent, 'comp_detail', ['comp_area'], (t) => {
        addSummary(t, '値段比較');
    })

    const first = addDiv(compare_detail);
    const second = addDiv(compare_detail);

    // 一個目
    addDiv(first, ['comp_cap'], (t) => {
        t.textContent = '1つ目の商品：';
    });
    addInput(first, 'number', '値段', ['comp_price'], (t) => {
        t.min = 1; // マイナスの値をブロック 
        t.addEventListener('input', compare_func_uniPriceChange); // 変更されたら更新
    });
    addInput(first, 'number', '量', ['comp_amount'], (t) => {
        t.min = 0; // マイナスの値をブロック
        t.addEventListener('input', compare_func_uniPriceChange); // 変更されたら更新
    });
    addDiv(first, ['comp_uniPrice'], (t) => {
        t.textContent = '単位量当たりの値段：0円';
    });
    
    // 二個目
    addDiv(second, ['comp_cap'], (t) => {
        t.textContent = '2つ目の商品：';
    });
    addInput(second, 'number', '値段', ['comp_price'], (t) => {
        t.min = 1; // マイナスの値をブロック 
        t.addEventListener('input', compare_func_uniPriceChange); // 変更されたら更新
    });
    addInput(second, 'number', '量', ['comp_amount'], (t) => {
        t.min = 0; // マイナスの値をブロック
        t.addEventListener('input', compare_func_uniPriceChange); // 変更されたら更新
    });
    addDiv(second, ['comp_uniPrice'], (t) => {
        t.textContent = '単位量当たりの値段：0円';
    })
}

// 値段比較用関数
const compare_func_uniPriceChange = () => {
    const prices = document.getElementsByClassName('comp_price');
    const amounts = document.getElementsByClassName('comp_amount');
    const uni_prices = document.getElementsByClassName('comp_uniPrice');
    let price = 0
    let uni_price = 0;

    for(let i = 0; i < 2; i++){
        // もう一個が勝手に入力されるのキモイから変数に入れて計算
        if(prices[i].value != 0){
            price = Number(prices[i].value);
        }

        // 計算
        uni_price = Number(amounts[i].value)/price;
        uni_prices[i].textContent = '単位量当たりの値段：' + uni_price + '円';
    }
}