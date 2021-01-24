$(document).ready(function() {
  $("#basicDate").flatpickr({
    enableTime: true,
    dateFormat: "F, d Y H:i"
  });

  $("#new-event-link").on("click", function(event) {
    event.preventDefault();
    var profileID = $("#new-event-link").attr("data-id");
    console.log("test")
    
    $.get("/newevent/" + profileID).then(function(res) {
      console.log("test")
      window.location.replace("/newevent/" + profileID)
    })
  });
  $(".viewdash").on("click", function(event) {
    var user = localStorage.getItem('user');
    window.location.replace("/dashboard/" + user.id);
  })
});


