"use strict";

const express = require("express");
const app = express();
var catalyst = require("zcatalyst-sdk-node");
app.use(express.json());

app.post("/event", async (req, res) => {
  var locationJson = req.body;
  var theatreJson = req.body;
  var eventJson = req.body;
  var showtimeJson = req.body;

  let rowData = {
    location: locationJson.city_name,
    theatre: theatreJson.theatre_name,
    event: eventJson.event_name,
    showtime: showtimeJson.show_timing,
  };

  console.log(rowData);

  var capp = catalyst.initialize(req);

  let datastore = capp.datastore();
  let table = datastore.table("Event");
  let insertPromise = table.insertRow(rowData);
  await insertPromise.then((row) => {
    console.log("Row inserted successfully:", row);
  });

  res.status(200).send("Row Inserted successfully");
});

app.get("/event1", (req, res) => {
  var capp = catalyst.initialize(req);
  let query = `select location from Event group by location`;
  let zcql = capp.zcql();
  let zcqlPromise = zcql.executeZCQLQuery(query);
  zcqlPromise
    .then((queryResult) => {
      console.log(queryResult);
      const locations = queryResult
        .map((item) => item.Event.location)
        .filter((location) => location !== null && location !== "");

      res.status(200).json(locations);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error occured");
    });
});

app.get("/location", (req, res) => {
  var loc = req.query.loc;

  var capp = catalyst.initialize(req);

  let query = `select theatre from Event where location = '${loc}'`;
  let zcql = capp.zcql();
  let zcqlPromise = zcql.executeZCQLQuery(query);
  zcqlPromise
    .then((queryResult) => {
      console.log(queryResult);
      const locations = queryResult.map((item) => item.Event.theatre);
      res.status(200).json(locations);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error occured");
    });

  //res.status(200).send(queryResult);
});

// app.post("/loc", async (req, res) => {
//   var locJson = req.body;
//   console.log(locJson);

//   // let rowData = {
//   //   loc: locJson.loc_name,
//   // };
//   var capp = catalyst.initialize(req);

//   //Use the table meta object to insert the row which returns a promise
//   capp
//     .datastore()
//     .table("Movie")
//     .insertRow(locJson)
//     .then((row) => {
//       let city = row.city;

//       console.log(row);
//       res.status(200).send("success");
//     })
//     .catch((err) => {
//       console.log("error");
//       res.status(400).send("error");
//     });
// });

app.get("/event2", (req, res) => {
  var thea = req.query.theatre;
  var capp = catalyst.initialize(req);
  let query = `select event from Event where theatre = '${thea}'`;
  let zcql = capp.zcql();
  let zcqlPromise = zcql.executeZCQLQuery(query);
  zcqlPromise
    .then((queryResult) => {
      console.log(queryResult);
      const locations = queryResult.map((item) => item.Event.event);

      res.status(200).json(locations);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error occured");
    });
});

app.post("/user", async (req, res) => {
  var locationJson = req.body;
  var theatreJson = req.body;
  var eventJson = req.body;
  var showJson = req.body;
  var dateJson = req.body;
  var noJson = req.body;
  var paymentJson = req.body;
  var phoneJson = req.body;

  let rowData = {
    location: locationJson.location_name,
    theatre: theatreJson.theatre_name,
    movie: eventJson.movie_name,
    showtime: showJson.show_time,
    show_date: dateJson.date_name,
    tickets: noJson.ticket_no,
    payment: paymentJson.payment,
    phone: phoneJson.phone,
  };

  console.log(rowData);
  var capp = catalyst.initialize(req);

  let datastore = capp.datastore();
  let table = datastore.table("Movie");
  let insertPromise = table.insertRow(rowData);

  await insertPromise.then((row) => {
    console.log("Ticket booked", row);
  });
  res
    .status(200)
    .send("Ticket booked successfully, Enjoy your movie with zohoTicket.com");
});

app.get("/view", (req, res) => {
  var phNum = req.query.phNum;

  var capp = catalyst.initialize(req);

  //Execute the query by passing it
  let query = `select location, movie, theatre, showtime, show_date, tickets, payment, phone from Movie where phone = '${phNum}'`;
  let zcql = capp.zcql();
  let zcqlPromise = zcql.executeZCQLQuery(query);
  zcqlPromise
    .then((queryResult) => {
      console.log(queryResult);
      res.status(200).json(queryResult);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error occured");
    });
});



module.exports = app;
