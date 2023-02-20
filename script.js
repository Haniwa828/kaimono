// ロード直後に関数実行
(()=>{  
    // 諸々の設置
    window.addEventListener("DOMContentLoaded", () => {
        const body = document.getElementById('body');

        addDiv(body, ['sum'], (t) => {
            t.id = 'sum_price'
            t.textContent = '合計金額：0円';
        })

        memo_area_put(body);
        compare_area_put(body);
        advice_area_put(body);
    });
})();