'use strict';
{
    // 完成
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth(); //3月
    // カレンダーの頭を作る。
    function getCalendarhead() {
        // 前月の曜日を取得しなければならない
        const dates = [];
        // 前月のカレンダーの末日を取得する。日にち取得
        const d = new Date(year, month, 0).getDate();
        console.log(d);
        // 曜日の数を取得
        const n = new Date(year, month, 1).getDay();
        console.log(n);
        for (let i = 0; i < n; i++) {
            // 配列の最初に要素を追加する。
            dates.unshift({

                date: d - i,
                isToday: false,
                isDisabled: true,
            })
        }
        return dates;
    }
    function getCalendarBody() {
        const dates = [];//date:日付、day
        // 今月の末日は次月の0日めを指定する事で今月の末日を取得できる。
        const lastDate = new Date(year, month + 1, 0).getDate();
        // for文で末日まで回す
        for (let i = 1; i <= lastDate; i++) {
            // オブジェクトを追加する。
            dates.push({
                // 日付をdate:数字にiを持たせる
                date: i,
                isToday: false,
                isDisabled: false
            });
        }
        if (year === today.getFullYear() && month === today.getMonth()) {
            console.log("hey");
            dates[today.getDate() - 1].isToday = true;
        }
        return dates;
    }

    function getClendarTail() {
        const dates = [];
        // ラストの曜日を取得。getDayで曜日を取得する土曜日まで。
        const lastDay = new Date(year, month + 1, 0).getDay();
        // 上で週7日を取得してそこから曜日の数だけ引いて表示する。
        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            })
        }
        return dates;
    }
    function clearCalender() {
        const tbody = document.querySelector('tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
    function renderTitle() {
        const title = `${year}/${String(month + 1).padStart(2, '0')}`;
        document.getElementById('title').textContent = title;
    }
    function renderWeeks() {
        const dates = [
            // スプレッド構文を指定する個々の値に展開することができるらしい。
            ...getCalendarhead(),
            ...getCalendarBody(),
            ...getClendarTail(),
        ]
        // 週ごとの配列を作る。
        // 週ごとの分割
        const weeks = [];
        // 
        const weekCount = dates.length / 7;
        for (let i = 0; i < weekCount; i++) {
            weeks.push(dates.splice(0, 7));
        }
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
                // 日にちを書き込む。
                td.textContent = date.date;
                // 今日の日付ならisTodayクラスを追加して色を変える
                if (date.isToday) {
                    td.classList.add('today');
                }
                if (date.isDisabled) {
                    td.classList.add('disbled');
                }
                tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
        });
    }
    function CreateClender() {
        clearCalender();
        renderTitle();
        renderWeeks();
    }



    document.getElementById('prev').addEventListener('click', () => {
        // クリックするたびに月をマイナスする。11月→10月
        month--;
        if (month < 0) {
            // 年をマイナスする。
            year--;
            // 12月
            month = 11;
        }
        CreateClender();
    });
    // nextをクリックした時は次月のカレンダーに移動する。
    document.getElementById('next').addEventListener('click', () => {
        month++;
        if (month > 11) {
            year++;
            // 一月なのでマイナス1で0となる。
            month = 0;
        }
        CreateClender();
    });
    document.getElementById('today').addEventListener('click', () => {
        year = today.getFullYear();
        month = today.getMonth();
        CreateClender();
    });
    CreateClender();
}