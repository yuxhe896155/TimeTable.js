exports.default = class{
    /**
    * Convert time working time into minutes
    * If ending time passes 00:00, add 1440(24H) to returning minutes.
    * @param  time {string} Format should be "HH:MM-HH:MM".
    * @example let [o,c] = twoTime2Int('10:00-23:00')
    * @return  oTime  {int} Opening time converted as minutes
    * @returnb cTime  {int} Closing time converted as minutes
    */
    static twoTime2Int(time){
        // Starting Time
        let oTime = this.time2Int(time.substring(0,5));
        // Ending Time
        let cTime = this.time2Int(time.substring(6,11));
        // Process for Ending Time exceeds 00:00
        if(oTime > cTime){
            // Minute of 24 hours * 60 minute
            cTime += 1440;
        }
        return [oTime, cTime];
    }
    /**
    * Convert time into integer
    * @param  time {string} Format should be "HH:MM".
    * @return  {int} Time converted as minutes
    * @example : time2Int("23:45") // 1425
    */
    static time2Int(time){
        // Hour
        const h = time.substring(0,2);
        // Minute
        const m = time.substring(3,5);
        return (parseInt(h,10) * 60 + parseInt(m,10));
    }
    /**
    * convert time into integer
    * @param time {int} Time converted as minutes
    * @return  {string} Time of "HH:MM" format
    * @example : int2Time(1425) //"23:45"
    */
    static int2Time(time){
        // Hour
        let h = Math.floor(time / 60);
        if(h >= 24)h -= 24;
        // Minute
        let m = time % 60;
        // Add 0 when only 1 digit
        return (this.toDoubleDigits(h) + ":" +  this.toDoubleDigits(m));
    }
    /**
    * Add 0 to number if it is only 1 digit
    * @param  num {int} Number.
    * @return {string} Number with 0.
    */
    static toDoubleDigits(num) {
        num += "";
        if (num.length === 1) {
            num = "0" + num;
        }
        return num;
    }
    /**
    * Count cells
    * @param  s {int} openTime in parameter
    * @param  e {int} closeTime in parameter
    * @param  d {int} divTime in parameter
    * @return {int} columns(cells) of Table
    */
    static countColumns(s,e,d){
        return Math.ceil((e - s) / d);
    }
};