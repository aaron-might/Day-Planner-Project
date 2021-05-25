$(document).ready(function () {
    var events = [];
    //listen for save buttton clicks
    $(".saveBtn").on("click", function () {
        //get nearby balues
        var value = $(this).siblings(".description").val();
        var time = $(this).parents().attr("id");
        var dateAdded = moment().format("dddd, MMM Do");

        events.push({ description: value, time: time, date: dateAdded });
        //save the value in localstorage as time 
        localStorage.setItem("events", JSON.stringify(events));
    });

    function hourUpdater() {
        //get currwnt number of hours
        var currentHour = moment().hours();
        //loop overe time in
        $(".time-block").each(function () {
            var blockhour = parseInt($(this).attr("id").split("-")[1]);

            //check if we're moved past this time
            //if the current hour is greater than the block hour
            //then add class "past"
            if (currentHour > blockhour) {
                $(this).addClass("past");
            }
            //if they are equal
            //then remove class "past" and add class "present"

            else if (currentHour === blockhour) {
                $(this).removeClass("past");
                $(this).addClass("present");
            }
            //else 
            //rempove class "past", rempve class "present", add class"futures"

            else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }
    hourUpdater();

    //set up interval to chekcif current time needs to be updated
    //which means execute hourupdater function evr 25 seconds

    var secondsLeft = 15;
    function setTime() {
        setInterval(function () {
            secondsLeft--;

            if (secondsLeft === 0) {
                hourUpdater();
                secondsLeft = 15;
            }
        }, 1000);
    }
    setTime();

    //reset on new day
    var currentDay = moment().format("dddd, MMMM Do");
    for (var i = 0; i < events.length; i++) {
        if (currentDay.isAfter(events[i].date)) {
            events[i].description = "";
            events[i].time = " ";
            events[i].date = " ";
            events.length = 0;
        }
    }
    //load any saved data from localStorage
    var storedEvents = JSON.parse(localStorage.getItem("getItem"));

    if (storedEvents !== null) {
        events = storedEvents;
    }
    for (var i = 0; i < events.length; i++) {
        var userDescription = events[i].description;
        $("#" + events[i].time).children(".description").text(userDescription);
    }
    $("#currentDay").text(moment().format("dddd, MMM Do"));
});

