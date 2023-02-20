// メモエリア設置用関数
const memo_area_put = (parent) => {
    // 大枠
    const memo_detail = addDetails(parent, 'memo_detail', ['memo_area'], (t) => {
        t.id = 'memo_area'; // 項目追加用
        addSummary(t, '買い物メモ');
    })

    // 項目追加ボタン
    const memo_area_button = addDiv(memo_detail, ['button_area']);
    addButton(memo_area_button, 'button', ['memo_add'], (t) => {
        t.textContent = '追加';
        t.addEventListener('click', memo_func_addContent);
    });
    addButton(memo_area_button, 'button', ['memo_save'], (t) => {
        t.textContent = '保存';
        // t.addEventListener('click', memo_func_addContent);
    });
}

// 項目追加用関数
const memo_func_addContent = () => {
    const parent = document.getElementById('memo_area');
    // 行
    const content_area = addDiv(parent, ['memo_content_area'], (t) => {
        // t.textContent = 'a';
    });

    // 商品名
    addInput(content_area, 'text', '商品名', ['memo_name']);
    // 値段
    addInput(content_area, 'number', '金額', ['memo_price'], (t) => {
        t.min = 0; // マイナスの値をブロック
        t.addEventListener('input', memo_func_sumChange); // 変更されたら更新
    });
    // 割引率
    addInput(content_area, 'number', '○%割引', ['memo_discount'], (t) => {
        t.min = 0; // マイナスの値をブロック
        t.max = 100; 
        t.addEventListener('input', memo_func_sumChange); // 変更されたら更新
    });
    // 削除ボタン
    addButton(content_area, 'button', ['memo_deleat'], (t) => {
        t.textContent = '削除';
        // 親要素削除
        t.addEventListener('click', () => {
            content_area.remove();
        });
    });
}

// 合計金額変更
const memo_func_sumChange = () => {
    const sum = document.getElementById('sum_price');
    const prices = document.getElementsByClassName('memo_price');
    const discounts = document.getElementsByClassName('memo_discount');
    let sum_price = 0;

    // 割引率考慮しつつ
    for(let i = 0; i < prices.length; i++){
        // 入力なければ割引率は0と仮定
        if(discounts[i].value == null){
            discounts[i].value = 0;
        }

        // 加算
        sum_price = sum_price + Number(prices[i].value)*(100 - Number(discounts[i].value))/100;
    }

    sum.textContent = '合計金額：' + sum_price + '円';
    advice_func_calcPrice(sum_price);
}