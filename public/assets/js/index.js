//Keeping to check functionality 
console.log("Hello World")


$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
      toastr["error"]("The email and password were not found.   Please try again.  ", "Invalid Login")
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(res) {
        // this code captures the USERid to navigate back to dashboard please do not delete
         // localStorage.setItem('myCat', 'Tom');
         localStorage.setItem("user", JSON.stringify(res));
        //  localStorage.setItem("user", res);
         window.location.replace("/dashboard/" + res.id);
        // If there's an error, log the error
      })
      // .catch(function(err) {
      //   console.log(err);
      // });
  }
});