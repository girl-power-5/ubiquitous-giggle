$(document).ready(function() {
  var eventOptions = $(".event-options");
  var selected;

  $("#event-date").flatpickr({
    enableTime: false,
    dateFormat: "F, d Y",
    altFormat: "Y-m-d"
});

  console.log($(".event-options").val())

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

  $(".create-event-btn").on("click", function(event) {
    event.preventDefault();

    var eventDate = $("#event-date").val();
    console.log("NEED TO DO THIS STILL")
    
    $.post("/api/newevent", {
      type: selected,
      name: name,
      start_date: relationship,
      end_date: end_date,
      is_annual, 
      
      
    }).then(function(res) {
      window.location.replace("/dashboard/" + res.id)
    })


   
  })

})