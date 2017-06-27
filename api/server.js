// server/app.js
const express = require('express');
const path = require('path');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
var app = express();
const dburl             = require('./config/db');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

MongoClient.connect(dburl.url, (err, db) => {
  if (err) return console.log(err)
  // API routes
  //
  //
  app.get('/mentors/',(req,res)=>{
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

  app.post('/new_query/',(req,res)=>{
    // {
    //   "mentor": "594a3089734d1d4955bd0c41",
    //   "askedBy": "594a3311734d1d4955bd0daf",
    //   "content": "lets go"
    // }
    var query = req.body
    // query.mentor = new ObjectID(query.mentor)
    // query.askedBy = new ObjectID(query.askedBy)
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

  app.get('/queries/:mentorid',(req,res)=>{
    var obj=[];
    console.log(req.params.userid)
    db.collection('queries').find({mentor:{"$in":[req.params.mentorid]}}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);

            if (docs == null){
                res.send(obj);
            }
            obj.push(docs);

        });

      }
    });
  })

  app.post('/new_thread/',(req,res)=>{
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
    db.collection('threads').insert(query, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log(result);
        db.collection('queries').remove({"_id": new ObjectID(query.query._id)}, (err, result) => {
          if (err) {
            res.send({ 'error': 'An error has occurred' });
          } else {
            res.send({'remove': 'successful'});
            console.log(result);
          }
        });


      }
    });

  })

  app.get('/threads/:mentorid',(req,res)=>{
    var obj=[];
    db.collection('threads').find({mentors:{"$in":[req.params.mentorid]}}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);

            if (docs == null){
                res.send(obj);
            }
            obj.push(docs);
        });

      }
    });
  })

  app.post('/respond/:threadid',(req,res)=>{
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

  app.post('/followup/',(req,res)=>{
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

  app.post('/respondfollowup/:threadid',(req,res)=>{
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

  app.get('/followups/:mentorid',(req,res)=>{
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
  app.post('/users', (req, res) => {
    const user = req.body;

    db.collection('users').findOne({id: req.body.id}, (err, result) => {
      if (err) {

      } else {
        if (result==null){
          db.collection('users').insert(user, (err, result) => {
            if (err) {
              res.send({ 'error': 'insert error' });
            } else {
              res.send(result.ops[0]);
              console.log(result);
            }
          });

        }
        else{
          res.send({ 'error': 'user exists' });
        }

      }
    });
  });


    app.post('/mentorLogin', (req, res) => {
      db.collection('mentors').findOne({username: req.body.username,password: req.body.password}, (err, result) => {
        if (err) {
          res.send({'failed': 'login'})
        } else {
          if(result===null){
            res.send({'failed': 'login'})
          }
          else{
            console.log(result)
            res.send(result)
          }


        }
      });



    });

})
// const PORT = process.env.PORT || 9000;
//
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });


exports.app = app
