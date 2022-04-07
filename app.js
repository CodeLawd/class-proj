const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

// const tours = require("./dev-data/tours-simple.json");
app.use(express.json());

// GET ALL TOURS
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    toursLength: tours.length,
    data: tours,
  });
});

// GET A SINGLE TOUR
app.get("/api/v1/tours/:id", (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((el) => el.id === id);

  !tour &&
    res.status(404).json({
      status: "failed",
      message: `Tour with id ${id} does not exist`,
    });

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

// CREATE A NEW TOUR
app.post("/api/v1/tours", (req, res) => {
  const id = tours.length - 1 + 1;
  const tour = { id, ...req.body };
  tours.push(tour);

  fs.writeFile("./dev-data/tours-simple.json", JSON.stringify(tours), (err) => {
    if (err) {
      res.status(500).json({
        status: "failed",
        message: `Something went wrong`,
      });
    } else {
      res.status(201).json({
        status: "success",
        data: tours,
      });
    }
  });
});

// UPDATE EXISTING TOURS
// app.patch("/api/v1/tours/:id", (req, res) => {
//   const id = +req.params.id;
//   const data = { ...req.body };

//   const tour = tours.filter((tour) => {
//     if (tour.id === id) {
//       fs.writeFile(
//         "./dev-data/tours-simple.json",
//         JSON.stringify(data),
//         (err) => {
//           if (err) {
//             res.status(500).json({
//               status: "failed",
//               message: `Something went wrong`,
//             });
//           } else {
//             res.status(201).json({
//               status: "success",
//               data: tour,
//             });
//           }
//         }
//       );
//     }
//   });
//   res.send("Success");
// });

app.listen(3000, () => console.log("Server started on port 3000"));
