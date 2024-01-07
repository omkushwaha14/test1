// const ip = require('ip');
// const Address = require("../models/address");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
 

// const uselocation = catchAsyncErrors(async (req, res, next) => {

//   const apiip = require("apiip.net")("98f77591-85b2-47ab-b010-b8d9af8023f9");

//   apiip.getLocation({ results: ip.address()})

//   .then((results) => {
//     //console.log(results);
//       const address = Address.create({
//       ip: results.ip,
//       city: results.city,
//       countryName: results.countryName,
//       capital: results.capital
//     });

//     res.status(201).json({
//       success: true,
//       address
//     });

//   });
// });
// module.exports = { uselocation };
