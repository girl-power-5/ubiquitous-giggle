$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var userIdInput = $("input#userid-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        userId: userIdInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        toastr.error("You shall not pass with those credentials ", "ERROR ")
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      userIdInput.val("");
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        userId: userId,
        email: email,
        password: password
      })
        .then(function(res) {
          localStorage.setItem("user", res);
          window.location.replace("/dashboard/" + res.id);
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        // .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  
  