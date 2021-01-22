$(document).ready(function() {
  // Capture the user input from create profile form
  var profileForm = $("form.profile");
  var firstName = $("input#first-name");
  var lastName = $("input#last-name");
  var relationship = $("#relationship.value");



  // On submit, send the user input to the /api/newprofile route using a POST method
  profileForm.on("submit", function(event) {
    event.preventDefault();

    var profileData = {
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      relationship: relationship.val().trim(),
    };

    $.get("/api/user_data").then(function(data) {
      var UserId = data.id;

      createNewProfile(profileData.first_name, profileData.last_name, profileData.relationship, UserId);
    });
  });

  function createNewProfile(first_name, last_name, relationship, UserId) {
    $.post("/api/newprofile", {
      first_name: first_name,
      last_name: last_name,
      relationship: relationship,
      UserId: UserId
    }).then(function(data) {
      window.location.replace("/dashboard")
    })
  };

});