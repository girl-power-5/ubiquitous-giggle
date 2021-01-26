$(document).ready(function() {
  var profileCards = $(".profile-link")
  var date = moment().format("YYYY-MM-DD");
  var datePlusMonth = moment().add(30, "days");
  datePlusMonthFormatted = datePlusMonth.format("YYYY-MM-DD");

  console.log(datePlusMonthFormatted)


  console.log(date)
  profileCards.on("click", function(event) {
    event.preventDefault();

    // Capture which card was selected and grab the data-id which represents the profile id in the db
    var profileID = $(event.target).attr("data-id")

    // GET method to retrieve data associated with the selected profile and display to the page
    $.get("/view/" + profileID).then(function(res) {
      window.location.replace("/view/" + profileID)
    })

  })

  // var queryURL = "https://calendarific.com/api/v2/holidays?&api_key=f13cfb989895d4ff8722f0c1e5e9080836d02dbe&country=US&year=2021"

  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(data) {
  //   var upcomingHolidays = $("#upcoming-holidays");

  //   var holidayObject = data.response.holidays.filter(holiday => {
  //     console.log(holiday)
  //     return ((holiday.date.iso) > (date) && holiday.date.iso < datePlusMonthFormatted)
  //   })

  //   // Trying to figure out how to filter out the more popular/general holidays
  //   holidayObject2 = holidayObject.filter(holiday => {
  //     holiday.type.find(type => {
  //       type === "National holiday" || type === "Hebrew" || type === "Muslim" || type === "Local observance" || type === "Sporting event"
  //     })
    
  //   })

  //   holidayObject.forEach(holiday => {
  //     upcomingHolidays.append(`<p> ${holiday.name} on ${holiday.date.iso} </p>`)
  //   })

  // });

});