'use strict'

{
    // 俺のビンゴ
    const source = [];
    const pushnum = [];
    const b = [];
    const i = [];
    const n = [];
    const g = [];
    const o = [];
    for (let i = 1; i <= 75; i++) {
        pushnum.push(i);
        source.push(i);

    }
    while (source.length >= 1) {
        let num = 0;
        num = source.splice(Math.floor(Math.random() * source.length), 1);
        if (num >= 1 && num <= 15) {
            if (b.length === 5) {
                continue;
            }
            b.push(num);
        } else if (num >= 16 && num <= 30) {
            if (i.length === 5) {
                continue;
            }
            i.push(num);
        } else if (num >= 30 && num <= 45) {
            if (n.length === 5) {
                continue;
            }
            n.push(num);
        } else if (num >= 46 && num <= 60) {
            if (g.length === 5) {
                continue;
            }
            g.push(num);
        } else if (num >= 60 && num <= 75) {
            if (o.length === 5) {
                continue;
            }
            o.push(num);
        }
    }
    const bingo = [b, i, n, g, o];
    const table = document.querySelector('table');
    for (let cl = 0; cl <= 4; cl++) {
        const tr = document.createElement('tr');
        table.appendChild(tr);
        for (let d = 0; d <= 4; d++) {
            const td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = bingo[cl][d];
            if (cl === 2 && d === 2) {
                td.classList.add('much');
                td.textContent = "free";
            }
        }
    }
    // puth押下時bingonumber関数が呼ばれる

    document.querySelector('#btn').addEventListener('click', () => {
        // ランダムな数値1-75
        let num = 0;
        num = pushnum.splice(Math.floor(Math.random() * pushnum.length), 1);
        alert(num);
        deletesheetnum(num);
        // ビンゴをチェックする関数
        checkbingo();
        
    });
    // 排出された番号を受け取ってシートの番号を消す。
    const deletesheetnum = (num) => {
        const table = document.querySelector('table');
        for (let t of table.rows) {
            for (let cell of t.cells) {
                const number = Number(num);
                const cellnum = Number(cell.innerText);
                if (number === cellnum) {
                    alert(`${number}と${cellnum}much!!`);
                    cell.classList.add('much');
                    cell.innerText = "much!!";
                }
            }
        }
    }

}
// ビンゴをチェックする関数
const checkbingo = () => {
    // checkred=12になったらループ処理を抜ける為の変数。
    let checkount = 0;
    const muchcount = (much) => {
        if (much === 5) {
            alert("bingo");
            return true;
        } else if (much === 4) {
            alert(`reach!!${much}`);
        } else {
            return;
        }
    }
    
        // 縦一列全て判定
        const table = document.querySelector('table');
        for (let cell of table.rows) {
            // 縦一列全てチェック完了tr一個のループで子要素を全て取得できるため
            const cellmuchcheck = cell.getElementsByClassName("much");
            if (cellmuchcheck.length === 5) {
                alert('happy!!');
                break;
            }
        }
        // 横一列全て判定
        let muchyoko = 0;
        for (let culumncell = 0; culumncell <= 4; culumncell++) {
            for (let cells = 0; cells <= 4; cells++) {
                const r = table.rows[cells].cells[culumncell];
                if (r.classList.contains('much')) {
                    muchyoko++;
                }
            }
            muchcount(muchyoko);
            muchyoko = 0;
        }
        // 0番目からの斜め右下方向をチェックする。
        let muchlicking = 0;
        for (let licking = 0; licking <= 4; licking++) {
            const cells = table.rows[licking].cells[licking];
            if (cells.classList.contains('much')) {
                muchlicking++;
            }
            muchcount(muchlicking);
        }
        // 4番目からの斜め左下方向をチェックする。
        let lickingrevercecell = 0;
        let muchlickingreverce = 0;
        for (let lickingreverce = 5; lickingreverce--;) {
            const cells = table.rows[lickingreverce].cells[lickingrevercecell];
            if (cells.classList.contains('much')) {
                muchlickingreverce++;
            }
            muchcount(muchlickingreverce);
            lickingrevercecell++;
        } 
}