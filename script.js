$( document ).ready(function(){


//=====current day is displayed at top of callendar
//=====date format for header of calendar
var today = moment().format("dddd MMMM Do YYYY");

var $dateHeading = $('#currentDay');
$dateHeading.text(today);
console.log(today);

//=====get hours 9-5 on the sheet 
//===== set up div/container to recieve time = bootstrap jquery add
//===== set up loop to get times
var now = moment().format('HH:mm');
console.log(now);

var plannerDiv = $('#plannerContainer')

//=====using hour instead of i so rows can be specified by how many hours i actually need in planner
for(var hour = 9; hour< 18; hour++){
    var plannerRow = $("<div>");
    plannerRow.addClass("row");
    plannerRow.addClass("planner-row");
    plannerRow.attr("hour-index", hour);

//=====section for times
    var timeDiv = $("<div>");
    timeDiv.addClass("col-md-2");

//=====format hours for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
    } else {
        displayHour = hour;
        ampm = "am";
    }

//=====append text from display hour to timeDiv
    timeDiv.text(`${displayHour} ${ampm}`);
    plannerRow.append(timeDiv);

    // /color changes for changing time of da
    // if (hour < now){
    //     $(plannerRow).css("background-color", "#2761B3")
    // }else if(hour > now){
    //     $(plannerRow).css("background-color", "#A1C8FF")
    // }else if(hour =now){
    //     $(plannerRow).css("background-color", "5CA0FF")
    // };
/// for some reason this code makes rows disappear


//=====input section of calendar
    const dailyPlanSpn = $('<input>');
    dailyPlanSpn.addClass("col-md-8")
    dailyPlanSpn.addClass("input-style")
    dailyPlanSpn.attr("id","input");
    dailyPlanSpn.attr("hour-index",hour);
    dailyPlanSpn.attr('type','text');
    dailyPlanSpn.css("background", "#5CA0FF");
    dailyPlanSpn.css("border", "none");
    //need to make this area an input box
    //text needs to be saved
    
//=====create col for notes and save and append
    var notesSaveDiv = $("<div>");
    notesSaveDiv.addClass("col-md-10");
    notesSaveDiv.append(dailyPlanSpn);
    

//=====save coloumn
    var saveBtn = $("<button>");
    saveBtn.text("SAVE");
    saveBtn.addClass('col-md-1');
    saveBtn.attr("hour-index",hour);

    
    $(saveBtn).on("click", function(){
        var saveText= $(this).sibling('input').val();
        // var saveText = dailyPlanSpn($(this)) - - i also tried this but neither seem to work
        console.log(saveText)
        localStorage.setItem(saveText)
        //// this function isnt working!!!!!

    })

    //need to create save button
    //need to create.on function for save button


//=====save button

    notesSaveDiv.append(saveBtn);
    plannerRow.append(notesSaveDiv);
    plannerDiv.append(plannerRow);
};
})

//=====make sure its editable
//====== and using local storage
