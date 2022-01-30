const express = require("express");
const {checkAddress} = require("../utils/aiOutputParser")

const fileRouter = express.Router();
const databaseObject = require("../connection");
const ObjectId = require("mongodb").ObjectId;

fileRouter.route("/files").get(function(request,result) {
    let dbConnectToCollection = databaseObject.getDb();
    dbConnectToCollection.collection("Files")
    .find({})
    .toArray(function (error, res) {
        if (error) console.log(error);
        console.log(res);
        result.json(res);
    })
});

module.exports = fileRouter;