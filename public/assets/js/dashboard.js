$(document).ready(function () {
  var profileCards = $(".profile-link")
  var date = moment().format("YYYY-MM-DD");
  var shortDate = moment().format("MM-DD");
  var datePlusMonth = moment().add(30, "days");
  var shortDatePlusMonth = moment().add(60, "days");
  datePlusMonthFormatted = datePlusMonth.format("YYYY-MM-DD");
  shortDatePlusMonthFormatted = shortDatePlusMonth.format("MM-DD");
  var upcomingHolidays = $("#upcoming-holidays");

  profileCards.on("click", function (event) {
    event.preventDefault();

    // Capture which card was selected and grab the data-id which represents the profile id in the db
    var profileID = $(event.target).attr("data-id")

    // GET method to retrieve data associated with the selected profile and display to the page
    $.get("/view/" + profileID).then(function (res) {
      window.location.replace("/view/" + profileID)
    })

  })

  var hallmarkHolidays =
    [
      {
        name: "National Cuddle Up Day",
        date: "01-06"
      },
      {
        name: "National Hugging Day",
        date: "01-21"
      },
      {
        name: "Squirrel Appreciation Day",
        date: "01-21"
      },
      {
        name: "National Compliment Day",
        date: "01-24"
      },
      {
        name: "National Carrot Cake Day",
        date: "02-03"
      },
      {
        name: "World Nutella Day",
        date: "02-05"
      },
      {
        name: "Ice Cream for Breakfast Day",
        date: "02-06"
      },
      {
        name: "National Send a Card to a Friend Day",
        date: "02-07"
      },
      {
        name: "National Giving Hearts Day",
        date: "02-11"
      },
      {
        name: "Galentine's Day",
        date: "02-13"
      },
      {
        name: "National Drink Wine Day",
        date: "02-18"
      },
      {
        name: "National Margarita Day",
        date: "02-22"
      },
      {
        name: "National Employee Appreciation Day",
        date: "03-05"
      },
      {
        name: "Pi Day",
        date: "03-14"
      },
      {
        name: "National Let's Laugh Day",
        date: "03-19"
      },
      {
        name: "National Single Parent Day",
        date: "03-21"
      },
      {
        name: "National Talk Like Shakespeare Day",
        date: "03-23"
      },
      {
        name: "Waffle Day",
        date: "03-25"
      },
      {
        name: "Manatee Appreciation Day",
        date: "03-31"
      },
      {
        name: "National Star Wars Day",
        date: "05-04"
      },
      {
        name: "International Talk Like a Pirate Day",
        date: "09-19"
      },
      {
        name: "National Drink Beer Day",
        date: "09-28"
      },
      {
        name: "National Kick Butt Day",
        date: "10-04"
      },
      {
        name: "National No Bra Day",
        date: "10-13"
      },
      {
        name: "Mickey Mouse's Birthday",
        date: "11-18"
      },
      {
        name: "Pretend to Be a Time Traveler Day",
        date: "12-08"
      },
      {
        name: "National Ding-a-Ling Day",
        date: "12-12"
      },
      {
        name: "National Bacon Day",
        date: "12-30"
      }
  ]

  var displayedHolidays = hallmarkHolidays.filter(holiday => {
    return ((holiday.date) > (shortDate) && holiday.date < shortDatePlusMonthFormatted)
  });

  displayedHolidays.forEach(holiday => {
    upcomingHolidays.append(`<p> ${holiday.name} on ${holiday.date} </p>`)
  });

});