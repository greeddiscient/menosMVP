// server/app.js
const express = require('express');
const path = require('path');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const app = express();
const dburl             = require('../config/db');
var axios = require('axios');

app.use(bodyParser.json());

MongoClient.connect(dburl.url, (err, db) => {
  if (err) return console.log(err)
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '..', 'build')));


  // API routes
  //
  //
  app.get('/api/mentors/',(req,res)=>{
    var obj=[];
    db.collection('mentors').find({}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);
            obj.push(docs);
            if (docs == null){
                res.send(obj);
            }

        });

      }
    });
  })

  app.post('/api/new_query/',(req,res)=>{
    // {
    //   "mentor": "594a3089734d1d4955bd0c41",
    //   "askedBy": "594a3311734d1d4955bd0daf",
    //   "content": "lets go"
    // }
    var query = req.body
    query.mentor = new ObjectID(query.mentor)
    query.askedBy = new ObjectID(query.askedBy)
    console.log(req.body);

    db.collection('queries').insert(query, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        console.log(result);
      }
    });
  })

  app.get('/api/queries/:mentorid',(req,res)=>{
    var obj=[];
    console.log(req.params.userid)
    db.collection('queries').find({mentor:{"$in":[new ObjectID(req.params.mentorid)]}}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);
            obj.push(docs);
            if (docs == null){
                res.send(obj);
            }

        });

      }
    });
  })

  app.post('/api/new_thread/',(req,res)=>{
    // {
    // 	"mentors":["594a3089734d1d4955bd0c41"],
    // 	"query": {
    //    "id": "594a3311734d1d4955bd0daf",
    // 		"askedBy":"594a3311734d1d4955bd0daf",
    // 		"content": "hello"
    // 	},
    // 	"responses":[
    // 		{
    // 			"mentor":"594a3089734d1d4955bd0c41",
    // 			"content": "hello you too!",
    //      "followUp":{}
    //
    // 		}]
    //
    //
    //
    // }
    var query = req.body
    console.log(req.body);
    query.mentors=[new ObjectID(query.mentors[0])]
    query.query.askedBy= new ObjectID(query.query.askedBy)
    query.responses=[{"mentor": new ObjectID(query.responses[0].mentor), "content": query.responses[0].content }]
    db.collection('threads').insert(query, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        console.log(result);
      }
    });
    db.collection('queries').remove({"_id": new ObjectID(query.query.id)}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send({'remove': 'successful'});
        console.log(result);
      }
    });
  })
  app.get('/api/threads/:mentorid',(req,res)=>{
    var obj=[];
    db.collection('threads').find({mentors:{"$in":[new ObjectID(req.params.mentorid)]}}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);
            obj.push(docs);
            if (docs == null){
                res.send(obj);
            }

        });

      }
    });
  })

  app.post('/api/respond/:threadid',(req,res)=>{
    //{
    // 		"mentor":"594a3089734d1d4955bd0c41",
    // 		"content": "yo this is my response",
    //    "followUp":{
    // 		   "askedBy":"594a3311734d1d4955bd0daf",
    // 		   "content": "hello"
    // 	  }
    //
    // }
    const query = {_id: new ObjectID(req.params.threadid)}
    var update =req.body
    update.mentor = new ObjectID(update.mentor)
    db.collection('threads').update(query,{$push:{responses: req.body}}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);

      }
    });
  })

  app.post('/api/followup/',(req,res)=>{
    // {
    //   "threadid": "594a421e8473c84fa06677b4",
    //   "mentors":["594a3089734d1d4955bd0c41","594a3311734d1d4955bd0daf"]
    //   "askedBy": "594a3311734d1d4955bd0daf",
    //   "content": "lets go"
    // }
    var query = req.body
    query.threadid = new ObjectID(query.threadid)
    query.askedBy = new ObjectID(query.askedBy)
    for (var i = 0 ; i < query.mentors.length; i++){
      query.mentors[i] = new ObjectID(query.mentors[i]);
    }
    console.log(req.body);

    db.collection('followups').insert(query, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        console.log(result);
      }
    });
  })

  app.post('/api/respondfollowup/:threadid',(req,res)=>{
    //{
    	// 	"mentor":"594a3089734d1d4955bd0c41",
    	// 	"content": "yo this is my response",
      //  "followUp":{
      //     "id":"594a3311734d1d4955bd0daf",
    	// 	   "askedBy":"594a3311734d1d4955bd0daf",
    	// 	   "content": "hello"
    	//   }
    //
    // }
    const query = {_id: new ObjectID(req.params.threadid)}
    var update =req.body
    update.mentor = new ObjectID(update.mentor)
    db.collection('threads').update(query,{$push:{responses: req.body}}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);

      }
    });
    db.collection('followups').remove({"_id": new ObjectID(update.followUp.id)}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        console.log(result);
      }
    });
  })

  app.get('/api/followups/:mentorid',(req,res)=>{
    var obj=[];
    db.collection('followups').find({mentors:{"$in":[new ObjectID(req.params.mentorid)]}}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);
            obj.push(docs);
            if (docs == null){
                res.send(obj);
            }

        });

      }
    });
  })
  app.get('/test',(req,res)=>{
    axios.get('https://api.linkedin.com/v1/people/~?oauth2_access_token=AQVpy6A6N7zWhmUJ6eC8ojSCvPiy4X8NY0DKZaZGSlFHo27zpiO5b771I4ERo123bbEHj1GS0QLaxmQ0GmSMItfU61mErHeueicsJhasHgkhSMsWKCHwfVn9Pxb7o87Zxozd5n1VcXjFRR6WmmpXJKjU9d5-1U-OjYrx6k4z59Atx3kd7jA')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    res.send('success')
  })


  // Always return the main index.html, so react-router render the route in the client
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });



})


module.exports = app;
