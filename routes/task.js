const express = require("express");
const {checkAddress} = require("../utils/aiOutputParser")

const customerRouter = express.Router();
const databaseObject = require("../connection");
const ObjectId = require("mongodb").ObjectId;

customerRouter.route("/tasks").get(function(request,result) {
    let dbConnectToCollection = databaseObject.getDb();
    dbConnectToCollection.collection("Tasks")
    .find({})
    .toArray(function (error, res) {
        if (error) console.log(error);
        console.log(res);
        result.json(res);
    })
});

customerRouter.route("/tasks/update/:id").post(async function(req,response) {
    console.log("hello?");
    let dbConnectToCollection = databaseObject.getDb();
    let idQuery = { _id: ObjectId( req.params.id )};
    dbConnectToCollection.collection("Tasks")
    .findOneAndUpdate(idQuery,
    [
        { $set: {done: { $not: "$done"}}}
    ])
});


module.exports = customerRouter;