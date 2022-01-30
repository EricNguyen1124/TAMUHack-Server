const express = require("express");

const customerRouter = express.Router();
const databaseObject = require("../connection");
const ObjectId = require("mongodb").ObjectId;

customerRouter.route("/customers").get(function (request, result) {
  console.log("yessir");
  let dbConnectToCollection = databaseObject.getDb();
  dbConnectToCollection
    .collection("Customers")
    .find({})
    .toArray(function (error, res) {
      if (error) console.log(error);
      console.log(res);
      result.json(res);
    });
});

customerRouter.route("/customers/add").post(function (request, result) {
  console.log("greetings");
  let dbConnectToCollection = databaseObject.getDb();
  let myObj = {
    name: "boba",
    points: 5,
  };
  dbConnectToCollection
    .collection("Customers")
    .insertOne(myObj, function (error, res) {
      if (error) error;
      result.json(res);
    });
});

module.exports = customerRouter;
