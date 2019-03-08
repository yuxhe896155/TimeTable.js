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
                $(ttRow).on("click", function(){
                    // 押下した個別のシフトを渡す
                    dispDialog(d,key);
                });
                ttRow = setTimeDiv(ttRow, d);
                $(rowData).append(ttRow);
                // 時間がある場合のみ
                let time = 0;
                if(d.planWork){
                    let planTime = (d.planWork.length)? cm.twoTime2Int(d.planWork): [0,0];
                    time = planTime[1] - planTime[0];
                    if(d.planRest){
                        let planRest = cm.twoTime2Int(d.planRest);
                        time = time - (planRest[1] - planRest[0]);
                    }
                }
                // 合計
                $(rowData).append(`<div>${(time)?time/60:0}H</div>`);
                $("#timetable").append(rowData);
            }
        }
    }
    function dispDialog(d,key){
        let overlay = $(`<div class="tt-overlay"><div class="tt-overlayQ"></div></div>`).css({
            height: window.innerHeight,
            width: window.innerWidth
        });
        let planWork = (d.planWork)? [d.planWork.substring(0,5),d.planWork.substring(6,11)]: ["",""];
        let planRest= (d.planRest)?  [d.planRest.substring(0,5),d.planRest.substring(6,11)]: ["",""];
        let realWork = (d.realWork)? [d.realWork.substring(0,5),d.realWork.substring(6,11)]: ["",""];
        let realRest= (d.realRest)?  [d.realRest.substring(0,5),d.realRest.substring(6,11)]: ["",""];
        // ダイアログの中身
        $("body").append(overlay);
        let dialog = $(
            `<div class="tt-dialog">
                <div class="dialog-name">${d.name}</div>
                <div class="dialog-time">
                    予定労働時間: 
                    <input type="time" id="planWorkStart" value="${planWork[0]}"> - <input type="time" id="planWorkEnd" value="${planWork[1]}">
                </div>
                <hr>
                <div class="dialog-time">
                    予定休憩時間: 
                    <input type="time" id="planRestStart" value="${planRest[0]}"> - <input type="time" id="planRestEnd" value="${planRest[1]}">
                </div>
                <hr>
                <div class="dialog-time">
                    　実労働時間: 
                    <input type="time" id="realWorkStart" value="${realWork[0]}"> - <input type="time" id="realWorkEnd" value="${realWork[1]}">
                </div>
                <hr>
                <div class="dialog-time">
                    　実休憩時間: 
                    <input type="time" id="realRestStart" value="${realRest[0]}"> - <input type="time" id="realRestEnd" value="${realRest[1]}">
                </div>
                <hr>
                <div class="dialog-time dialog-btn"></div>
            </div>`);
        // ボタンイベント
        let okBtn = $(`<button class="tt-btn tt-btn_ok">OK</button>`).on("click",function(){
            let pw = `${$("#planWorkStart").val()}-${$("#planWorkEnd").val()}`;
            let pr = `${$("#planRestStart").val()}-${$("#planRestEnd").val()}`;
            let rw = `${$("#realWorkStart").val()}-${$("#realWorkEnd").val()}`;
            let rr = `${$("#realRestStart").val()}-${$("#realRestEnd").val()}`;
            if(!checkTime(pw, pr, rw, rr))return false;
            shift[key].planWork = (pw !== "-")?pw:"";
            shift[key].planRest = (pr !== "-")?pr:"";
            shift[key].realWork = (rw !== "-")?rw:"";
            shift[key].realRest = (rr !== "-")?rr:"";
            $(".tt-overlay").remove();
            update(shift);
        });
        let cancelBtn = $(`<button class="tt-btn tt-btn_cancel">Cancel</button>`).on("click",function(){
            $(".tt-overlay").remove();
        });
        dialog = $(dialog).find(".dialog-btn")
            .append(okBtn).append(cancelBtn).end();
        $(".tt-overlayQ").append(dialog);
        // 労働時間系のイベント付与
        let option = {
            autosize: false,
            useAmPm: false,
            precision: 15,
            fonts: {
                clockOuterCircleFontSize: "14px",
                clockInnerCircleFontSize: "14px",
            },
            minimum: cm.int2Time(startTime),
            maximum: cm.int2Time(endTime),
            onChange:function(newTime,oldTime){
                this.value = (!newTime.length)? "": newTime;
            }
        }
        option.value = "18:00";
        $("#planWorkStart").clockTimePicker(option);
        $("#planWorkEnd").clockTimePicker(option);
        $("#planRestStart").clockTimePicker(option);
        $("#planRestEnd").clockTimePicker(option);
        $("#realWorkStart").clockTimePicker(option);
        $("#realWorkEnd").clockTimePicker(option);
        $("#realRestStart").clockTimePicker(option);
        $("#realRestEnd").clockTimePicker(option);
    }
    function checkTime(pw,pr,rw,rr){
        let times = [pw,pr,rw,rr];
        // 開始がないor終了がない
        for(let i in times){
            let hasError = false;
            if(times[i].length === 6)hasError = true;
            if(hasError){
                alert(`開始 or 終了時間の一方が欠けている時間があります。\n${times[i]}`);
                return false;
            }
        }
        // 各々の開始 >= 終了になっていないか
        for(let i in times){
            // 空の時間は飛ばす
            if(!times[i][0].length)continue;
            let s = cm.time2Int(times[i].substring(0,5));
            let e = cm.time2Int(times[i].substring(6,11));
            if(s >= e){
                alert(`開始時間が終了時間よりも遅いor同じ時間があります。\n${times[i]}`);
                return false;
            }
        }
        // 予定労働時間&予定休憩時間がある
        if(pw.length === 11 && pr.length === 11){
            let pwInt = cm.twoTime2Int(pw);
            let prInt = cm.twoTime2Int(pr);
            let hasError = false;
            if(pwInt[0] > prInt[0])hasError = true;
            if(pwInt[1] < prInt[1])hasError = true;
            if(hasError){
                alert(`予定労働時間外に予定休憩時間が設定されています。
                    \n予定労働時間：${pw}
                    \n予定休憩時間：${pr}`);
                return false;
            }
        }
        // 実労働時間&実休憩時間がある
        if(pw.length === 11 && pr.length === 11){
            let rwInt = cm.twoTime2Int(rw);
            let rrInt = cm.twoTime2Int(rr);
            let hasError = false;
            if(rwInt[0] > rrInt[0])hasError = true;
            if(rwInt[1] < rrInt[1])hasError = true;
            if(hasError){
                alert(`実労働時間外に実休憩時間が設定されています。
                    \n予定労働時間：${rw}
                    \n予定休憩時間：${rr}`);
                return false;
            }
        }
        return true;
    }
    update(shift);
    return {getShift: function(){return shift}};
}