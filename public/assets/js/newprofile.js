$(document).ready(function() {
  // Capture the user input from create profile form
  var profileForm = $("form.profile");
  var firstName = $("input.first-name");
  var lastName = $("input.last-name");
  var relationship = $("#relationship");
  var phoneNumber = $("#inputNum");
  var email = $("#inpuEmail")
  var birthday = $("#birthday");
  var address = $("#inputAddress");
  var address2 = $("#inputAddress2");
  var city = $("#inputCity");
  var state = $("#inputState");
  var zip = $("#inputZip")

  // Create a function for flatpickr
  $("#birthday").flatpickr({
    altInput: true,
    altFormat: "F d",
    dateFormat: "m-d"
  });
 
  // On submit, send the user input to the /api/newprofile route using a POST method
  profileForm.on("submit", function(event) {
    event.preventDefault();

    // Capture the user input and trim off any white space
    var profileData = {
      first_name: firstName.val(),
      last_name: lastName.val(),
      relationship: relationship.val(),
      birthday: birthday.val(),
      phone_number:phoneNumber.val(),
      email: email.val(), 
      address: address.val(),
      address_other: address2.val(),
      city: city.val(),
      state: state.val(),
      zip: zip.val()
    };

    // Send new profile to backend via post route
      $.post("/api/newprofile", {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        relationship: profileData.relationship,
        birthday: profileData.birthday,
        phone_number: profileData.phone_number,
        email: profileData.email,
        address: profileData.address,
        address_other: profileData.address_other,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zip
        
        // Redirect the user to their dashboard after they create a new profile
      }).then(function(res) {
        window.location.replace("/dashboard/" + res.id)
      });
  });

  $(".viewdash").on("click", function(event) {
    var user = localStorage.getItem('user');
    window.location.replace("/dashboard/" + user.id);
  })

});