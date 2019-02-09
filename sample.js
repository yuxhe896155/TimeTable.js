// Call TimeTable library
// First parameter is target(id or class) to set Time Table (String)
// Second parameter(optional) is object of information to set in Time Table (Object)
// If object has error, message displays in console
let table = TimeTable("#target");
console.log(table);
// Sample of second parameter object
// Every keys are optional
/*
{
    // Beginning Time
    startTime: "10:00",
    // Ending Time
    endTime: "15:00",
    // Time to divide(minute)
    divTime: "15",
    // Time Table Data
    shift: {
        "1" : {
          "Sir Isaac Newton": {
              "1" : "10:00-12:00",
              "2" : "13:00-14:00"
          }
        },
        "2" : {
            "Galileo Galilei": {
                "3" : "11:00-12:45"
            }
        }
    },
    // Other options
    option: {
        // Display Total Time
        worktime: true,
        // Bar Color
        // Able to apply till 10 colors
        bgcolor: ["#00ffff","#ff0000"],
        // Selectbox for Name Column
        // selectBox index and shift index should be same
        //{index :  name, : index: name,,..}
        // Give random if shift index was not in selectBox index
        selectBox: {
            "1": "Sir Isaac Newton",
            "2": "Galileo Galilei",
            "3": "Mr.Smith"
        },
        // Set true when using TimeTable inside of BootStrap class row
        useBootstrap: false,
    }
}
*/