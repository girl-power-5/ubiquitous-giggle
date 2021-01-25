$(document).ready(function() {
  // Capture the user input from create profile form
  var profileForm = $("form.profile");
  var firstName = $("input.first-name");
  var lastName = $("input.last-name");
   // we had a .val here which was setting the variable to nothing, and was not grabbing the correct element. 
  var relationship = $("#relationship");
 
  // Create a function for flatpickr
  $("#birthday").flatpickr({
    altInput: true,
    altFormat: "F d, Y",
    dateFormat: "Y-m-d"
  });
 
  // On submit, send the user input to the /api/newprofile route using a POST method
  profileForm.on("submit", function(event) {
    event.preventDefault();

    // Capture the user input and trim off any white space
    var profileData = {
      first_name: firstName.val(),
      last_name: lastName.val(),
      relationship: relationship.val()
    };

    // Call the function we created below that initiates a POST method to the db
      createNewProfile(profileData.first_name, profileData.last_name, profileData.relationship);
  });

  // Create a function to hold the data we will send a POST request
  function createNewProfile(first_name, last_name, relationship) {
    $.post("/api/newprofile", {
      first_name: first_name,
      last_name: last_name,
      relationship: relationship
      
      // Redirect the user to their dashboard after they create a new profile
    }).then(function(res) {
      window.location.replace("/dashboard/" + res.id)
    })
  };
});