import cm from "./common"

export default function(obj){
    if($("#timetable").length === 0){
        console.log(`Parameter ${selector} is not found.`);
        return false;
    };
    let startTime = cm.time2Int(obj.startTime);
    let endTime = cm.time2Int(obj.endTime);
    let divTime = obj.divTime;
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
    for(let i = 0; i < headerCnt; i++){
        let s = cm.int2Time(startTime + (i * 60));
        let e = cm.int2Time(startTime + ((i + 1) * 60));
        $(header).append($(`<div>${s}-${e}</div>`));
    }
    // 合計行
    $(header).append($(`<div>合計</div>`));
    $("#timetable").append($(header));
    function update(){
        // まずは消す
        let rows = $(".tt-row");
        for(let i = 0; i < rows.length; i++){
            rows[i].remove();
        }
        let arrShift = cm.orderByShift(shift);
        console.log(arrShift)
        for(let i = 0; i < arrShift.length; i++){
            let obj = arrShift[i];
            for(let key in obj){
                let d = obj[key];
                let rowData = $(`<div class="tt-row"></div>`);
                // 名前列
                $(rowData).append(`<div>${d.name}</div>`);
                // シフト列
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
                $(rowData).append(`<div class="tt-row_data"></div>`);
                // 合計
                $(rowData).append(`<div>${time/60}H</div>`);
                $("#timetable").append(rowData);
            }
        }
    }
    update();
    setTimeout(()=>{
        shift["200"] = {
            name: "2000msAfter-ADDED",
            planWork: "13:00-15:00",
            planRest: "",
        }
        console.log("updated");
        update()},
    2000);
}