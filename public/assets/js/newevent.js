$(document).ready(function() {
  var eventOptions = $(".event-options");
  var holidayOptions = $("#holidays");
  var specialOccasionOptions = $("#special");
  var createEventBtn =  $("#create-event-btn");

  var selected;
  var eventName;

  $("#event-date").flatpickr({
    enableTime: false,
    dateFormat: "F, d Y",
    altFormat: "Y-m-d"
});

  eventOptions.on("input", function(event) {
    selected = event.target.value;

    if (selected === "anniversary") {
      $("#list-of-holidays").addClass("hide");
      $("#list-of-occasions").addClass("hide");

    } else if (selected === "special-occasion") {
      $("#list-of-holidays").addClass("hide");
      $("#list-of-occasions").removeClass("hide");

    } else if (selected === "annual-holdiay") {
      $("#list-of-occasions").addClass("hide");
      $("#list-of-holidays").removeClass("hide");
    }

  });

  holidayOptions.on("input", function(event) {
    eventName = event.target.value;
  });

  specialOccasionOptions.on("input", function(event) {
    eventName = event.target.value;
  });


  $(".create-event-btn").on("click", function(event) {
    event.preventDefault();

    var profileID = createEventBtn.attr("data-id")
    var eventDate = $("#event-date").val();

    console.log("NEED TO DO THIS STILL")
    
    $.post("/api/newevent/" + profileID, {
      type: selected,
      name: eventName,
      start_date: eventDate
    }).then(function(res) {
      window.location.replace("/dashboard/" + res.id)
    });
   
  });

});