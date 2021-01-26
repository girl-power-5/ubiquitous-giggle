$(document).ready(function() {
  $(".viewdash").on("click", function(event) {
    console.log("TEST")
    var currentUser = $(".viewdash").attr("data-id")
    console.log(currentUser)

    window.location.replace("/dashboard/" + currentUser)
  })
})