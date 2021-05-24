$(document).ready(function(){
    var events= [];
    //listen for save buttton clicks
    $(".saveBtn").on("click",function(){
        //get nearby balues
        var value = $(this).siblings(".description").val();
        var time = $(this).parents().attr("id");
        var dateAdded = moment().format("dddd, MMM Do");

        events.push({description:value,time:time, date: dateAdded});
        //save the value in localstorage as time 
        localstorage.setItem("events", JSON.stringify(events));
    })



    function hourUpdate(){
        //get currwnt number of hours
        var currenthour =moment().hours();
        //loop overe time in
        $(."time-block").each(function(){
          var blockhour = parseInt($(this).attr("id").split("-")[1]);

          //check if we're moved past this time
          //if the current hour is greater than the block hour
          //then add class "past"
          if (currentHour>blockhour){
              $(this).addClass("past");
          }
          //if they are equal
          //then remove class "past" and add class "present"

          else of (currentHour===blockhour){
              $(this).addClass("past");
              $(this).addClass("present");
          }
          //else 
          //rempove class "past", rempve class "present", add class"futures"
          else{
              $(this).removeClass("past");
              $(this).removeClass("present");
              $(this).addClass("future");
          }
        });
    }

    hourupdater();

    //set up interval to chekcif current time needs to be updated
    //which means execute hourupdater function evr 25 seconds

    var secondsLeft =
})

