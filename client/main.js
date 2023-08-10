function postTicketEvent() {
  var location = $("#location-input").val();
  var theatre = $("#theatre-input").val();
  var event = $("#event-input").val();
  var showtime = $("#showtime-input").val();

  $.ajax({
    url: "/server/ticketing_app_function/event",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      city_name: location,
      theatre_name: theatre,
      event_name: event,
      show_timing: showtime,
    }),

    success: function (data) {
      alert(data);
    },

    error: function (error) {
      alert(error.message);
    },
  });
}

function getUserReq() {
  $.ajax({
    url: "/server/ticketing_app_function/event1",
    type: "get",
    dataType: "json",

    success: function (data) {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        $("#locationDropdown").append("<option>" + data[index] + "</option>");
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getlocation() {
  var loc = $("#locationDropdown").val();
  $.ajax({
    url: "/server/ticketing_app_function/location?loc=" + loc,
    type: "get",

    success: function (data) {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        $("#theatreDropdown").append("<option>" + data[index] + "</option>");
      }
    },

    error: function (error) {
      console.log(error);
    },
  });
}

// function getloc() {
//   var loc = $("#locationDropdown").val();
//   $.ajax({
//     url: "/server/ticketing_app_function/loc",
//     type: "post",
//     contentType: "application/json",
//     data: JSON.stringify({
//       loc_name: loc,
//     }),

//     success: function (data) {
//       console.log(data);
//     },

//     error: function (error) {
//       console.log(error);
//     },
//   });
// }

function getmovieReq() {
  var theatre = $("#theatreDropdown").val();
  $.ajax({
    url: "/server/ticketing_app_function/event2?theatre=" + theatre,
    type: "get",
    dataType: "json",

    success: function (data) {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        $("#movieDropdown").append("<option>" + data[index] + "</option>");
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function postTicket() {
  var location = $("#locationDropdown").val();
  var theatre = $("#theatreDropdown").val();
  var event = $("#movieDropdown").val();
  var show = $("#showtime").val();
  var date = $("#dateinput").val();
  var tickets = $("#number").val();
  var payment = $("#paymentinput").val();
  var phone = $("#phoneNum").val();

  $.ajax({
    url: "/server/ticketing_app_function/user",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      location_name: location,
      theatre_name: theatre,
      movie_name: event,
      show_time: show,
      date_name: date,
      ticket_no: tickets,
      payment: payment,
      phone: phone,
    }),

    success: function (data) {
      const numValue = parseInt(data.num, 10);
      const calculated = numValue * 200;
      data.num = calculated.toString();
      alert(data);
    },

    error: function (error) {
      alert(error);
    },
  });
}

function getTicketReq() {
  var PhNum = $("#phNum").val();

  $.ajax({
    url: "/server/ticketing_app_function/view?phNum=" + PhNum,
    type: "get",
    dataType: "json",

    success: function (data) {
      data.forEach((movieData) => {
        const movieInfo = movieData.Movie;
        const tickets = parseInt(movieInfo.tickets, 10);
        const amount = tickets * 200;

        let discount = 0;
        if (movieInfo.payment === "UPI") {
          discount = amount * 0.1;
        }

        const totalAmount = amount - discount;

        movieInfo.amount = amount;
        movieInfo.discount = discount;
        movieInfo.totalAmount = totalAmount;
      });

      data.forEach((movieData) => {
        const movieInfo = movieData.Movie;
        const message = `Enjoy Your movie with ZohoTicket.com!!
          Movie: ${movieInfo.movie}
          Theatre: ${movieInfo.theatre}
          Show Date: ${movieInfo.show_date}
          Show Time: ${movieInfo.showtime}
          Location: ${movieInfo.location}
          Payment: ${movieInfo.payment}
          Amount: ${movieInfo.amount}
          Discount: ${movieInfo.discount}
          Total Amount: ${movieInfo.totalAmount}
        `;
        alert(message);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function logout() {
  var redirectURL = "/app/";
  console.log(redirectURL);
  var auth = catalyst.auth;
  auth.signOut(redirectURL);
}
