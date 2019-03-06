import cm from "./common"

export default function(obj){
    if($("#timetable").length === 0){
        console.log(`Parameter ${selector} is not found.`);
        return false;
    };
    let startTime = cm.time2Int(obj.startTime);
    let endTime = cm.time2Int(obj.endTime);
    let shift = obj.shift;
    
    // HH:00にならない場合
    // 開始時間決定
    if(startTime % 60){
        startTime -= startTime % 60;
    }
    //終了時間決定
    if(endTime % 60){
        endTime += 60 - endTime % 60;
    }
    let header = $(`<div class="tt-header"></div>`);
    // header作成
    let headerCnt = (endTime - startTime)/60;
    // 動的に幅を変更するためにCSSに変数を設定
    $("#timetable")[0].style.setProperty("--columns", headerCnt + 1);
    $("#timetable")[0].style.setProperty("--columnsPx", `${headerCnt + 1}px`);
    $(header).append(`<div>名前</div>`);
    let headerTime = $(`<div class="tt-header_time"></div>`)
    for(let i = 0; i < headerCnt; i++){
        let s = cm.int2Time(startTime + (i * 60));
        let e = cm.int2Time(startTime + ((i + 1) * 60));
        $(headerTime).append($(`<div>${s}-${e}</div>`));
    }
    $(header).append(headerTime);
    // 合計列
    $(header).append($(`<div>合計</div>`));
    $("#timetable").append($(header));
    function setTimeDiv(target, d){
        for(let i = 0; i < 5; i++){
            let s = startTime;
            let e = endTime;
            let pw = (d.planWork)? cm.twoTime2Int(d.planWork): [999,999];
            let pr = (d.planRest)? cm.twoTime2Int(d.planRest): [999,999];
            let rw = (d.realWork)? cm.twoTime2Int(d.realWork): [999,999];
            let rr = (d.realRest)? cm.twoTime2Int(d.realRest): [999,999];
            let rowRow = $(`<div></div>`);
            let currentTime = startTime;
            // 中央の3行
            for(let j = 0; j < headerCnt; j++){
                let space = $(`<div class="tt-row_space"></div>`);
                if(i > 0 && i < 4){
                    for(let k = 0; k < 4; k++){
                        let shift = $(`<div class="shift"></div>`);
                        // 色塗り
                        if(currentTime >= pw[0] && currentTime < pw[1]){
                            $(shift).addClass("planWork");
                        };
                        if(currentTime >= pr[0] && currentTime < pr[1]){
                            $(shift).addClass("planRest");
                        };
                        //リアルワーク
                        if(i === 2){
                            if(currentTime >= rw[0] && currentTime < rw[1]){
                                $(shift).addClass("realWork");
                            };
                            if(currentTime >= rr[0] && currentTime < rr[1]){
                                $(shift).addClass("realRest");
                            };
                        }
                        $(space).append(shift);
                        currentTime += 15;
                    }
                }
                $(rowRow).append(space);
            }
            $(target).append(rowRow);
        }
        return target;
    }
    function update(shifts){
        // まずは消す
        let rows = $(".tt-row");
        for(let i = 0; i < rows.length; i++){
            $(rows[i]).off();
            $(rows[i]).remove();
        }
        let arrShift = cm.orderByShift(shifts);
        for(let i = 0; i < arrShift.length; i++){
            let obj = arrShift[i];
            for(let key in obj){
                let d = obj[key];
                let rowData = $(`<div class="tt-row"></div>`);
                // 名前列
                let name = $(`<div id="${key}" class="js-name">${d.name}</div>`);
                $(rowData).append(name);
                // シフト列
                let ttRow = $(`<div class="tt-row_data"></div>`);
                ttRow = setTimeDiv(ttRow, d);
                $(rowData).append(ttRow);
                // 時間がある場合のみ
                let time = 0;
                if(d.planWork){
                    let planTime = cm.twoTime2Int(d.planWork);
                    time = planTime[1] - planTime[0];
                    if(d.planRest){
                        let planRest = cm.twoTime2Int(d.planRest);
                        time = time - (planRest[1] - planRest[0]);
                    }
                }
                // 合計
                $(rowData).append(`<div>${time/60}H</div>`);
                $("#timetable").append(rowData);
            }
        }
    }
    update(shift);
    // イベントのはっつけ
    $(document).on("click", ".js-name", function(){
        let key = $(this).attr("id");
        shift[key].planWork = "15:00-18:00";
        // 消す
        let rows = $(".tt-row");
        for(let i = 0; i < rows.length; i++){
            $(rows[i]).off();
            $(rows[i]).remove();
        }
        setTimeout(()=>{update(shift)},0);
    });
}