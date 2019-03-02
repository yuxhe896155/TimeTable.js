export default {    /**
    * Convert time working time into minutes
    * If ending time passes 00:00, add 1440(24H) to returning minutes.
    * @param  {string} time : Format should be "HH:MM-HH:MM".
    * @example let [o,c] = twoTime2Int('10:00-23:00')
    * @return  {int} oTime : Opening time converted as minutes
    * {int} cTime   : Closing time converted as minutes
    */
    twoTime2Int =  function(time){
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
    },
    /**
    * Convert time into integer
    * @param  {string} time : Format should be "HH:MM".
    * @example : time2Int("23:45")
    * @return  {int}        : Time converted as minutes
    * @example : 1425
    */
    time2Int = function(time){
        // Hour
        const h = time.substring(0,2);
        // Minute
        const m = time.substring(3,5);
        return (parseInt(h,10) * 60 + parseInt(m,10));
    },
    /**
    * convert time into integer
    * @param  {int}   time : Time converted as minutes
    * @example : int2Time(1425)
    * @return  {string} returnTime : Format should be "HH:MM".
    * @example : 23:45
    */
    int2Time = function(time){
        // Hour
        let h = Math.floor(time / 60);
        if(h >= 24)h -= 24;
        // Minute
        let m = time % 60;
        // Add 0 when only 1 digit
        return (this.toDoubleDigits(h) + ":" +  this.toDoubleDigits(m));
    },
    /**
    * Add 0 to number if it is only 1 digit
    * @param  {int}    num : Number.
    * @return {string} num : Number with 0.
    */
    toDoubleDigits(num) {
        num += "";
        if (num.length === 1) {
            num = "0" + num;
        }
        return num;
    },
}