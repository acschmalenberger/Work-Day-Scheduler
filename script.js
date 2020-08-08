$( document ).ready(function(){

    // renderPlans();


//=====current day is displayed at top of callendar
//=====date format for header of calendar
var test = false;
var today = moment().format("dddd MMMM Do YYYY");

var $dateHeading = $('#currentDay');
$dateHeading.text(today);
console.log(today);

//=====get hours 9-5 on the sheet 
//===== set up div/container to recieve time = bootstrap jquery add
//===== set up loop to get times
var now = moment().format('HH:mm');
console.log(now);

var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

if (test) { console.log(storedPlans); }

  // If plans were retrieved from localStorage, update the plan array to it
if (storedPlans !== null) {
    planTextArr = storedPlans;
} else {
    // this should only occur on first time the app is loaded in the browser
    // helpfully remind user that lunch is important
    planTextArr = new Array(9);
    planTextArr[5] = "Picnic lunch outside";
}

var plannerDiv = $('#plannerContainer')

plannerDiv.empty();

//=====using hour instead of i so rows can be specified by how many hours i actually need in planner
    for(var hour = 7; hour< 18; hour++){
        let index = hour-7; 

        var plannerRow = $("<div>");
        plannerRow.addClass("row");
        plannerRow.addClass("planner-row");
        plannerRow.attr("hour-index", index);

    //=====section for times
        var timeDiv = $("<div>");
        timeDiv.addClass("col-md-2");
        timeDiv.css("background", "#5CA0FF");
        timeDiv.css("align-content", "center")


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

    //=====input section of calendar
        const dailyPlanSpn = $('<input>');
        dailyPlanSpn.addClass("col-md-8");
        dailyPlanSpn.attr('id',`input-${index}`);
        dailyPlanSpn.attr("hour-index",index);
        dailyPlanSpn.attr('type','text');
        dailyPlanSpn.css("background", "#5CA0FF");
        
        dailyPlanSpn.val( planTextArr[index] );

        plannerRow.append(dailyPlanSpn);

        //need to make this area an input box
        //text needs to be saved

        //=====save coloumn
        const saveBtn = $("<button>");
        saveBtn.text("SAVE");
        saveBtn.addClass("col-md-2");
        saveBtn.attr("id", `saveid-${index}`);
        saveBtn.attr("save-id", index);

        plannerRow.append(saveBtn)

        updateRowColor(plannerRow, hour)

        plannerDiv.append(plannerRow);
    
    
        function updateRowColor(plannerRow, hour){
            if (hour < now){
                $(plannerRow).css("background-color", "#2761B3")
            }else if(hour > now){
                $(plannerRow).css("background-color", "#A1C8FF")
            }else if(hour =now){
                $(plannerRow).css("background-color", "5CA0FF")
            };
            console.log(now)
        }
                
        $(saveBtn).on("click", function(){
            let index= $(this).attr("save-id");

            let inputId = '#input-'+index;
            let value = $(inputId).val();

            planTextArr[index] = value;

            var saveText= dailyPlanSpn.val();
            
            $(`#saveid-${index}`).removeClass('shadowPulse');
            localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
        });

    };
})


