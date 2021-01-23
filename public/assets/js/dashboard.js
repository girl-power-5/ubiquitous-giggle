$(document).ready(function() {
  var profileCards = $(".profile-link")
 
  profileCards.on("click", function(event) {
    event.preventDefault();

    // Capture which card was selected and grab the data-id which represents the profile id in the db
    var profileID = $(event.target).attr("data-id")

    // GET method to retrieve data associated with the selected profile and display to the page
    $.get("/view/" + profileID).then(function(res) {
      window.location.replace("/view/" + profileID)
    })

  })

});